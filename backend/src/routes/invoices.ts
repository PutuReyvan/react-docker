import { Router } from 'express'
import { z } from 'zod'
import type { InvoiceRepository } from '../repositories/invoiceRepository.js'

const invoiceSchema = z.object({
  client: z.string().trim().min(1).max(120),
  amount: z.number().positive(),
  status: z.enum(['paid', 'pending', 'overdue']),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
})

const updateInvoiceSchema = invoiceSchema.partial().refine((value) => Object.keys(value).length > 0, {
  message: 'At least one invoice field is required.',
})

export function createInvoiceRouter(repository: InvoiceRepository): Router {
  const router = Router()

  router.get('/', async (_request, response) => {
    response.json(await repository.list())
  })

  router.get('/:id', async (request, response) => {
    const id = parseInvoiceId(request.params.id)

    if (!id) {
      response.status(400).json({ message: 'Invalid invoice id.' })
      return
    }

    const invoice = await repository.findById(id)

    if (!invoice) {
      response.status(404).json({ message: 'Invoice not found.' })
      return
    }

    response.json(invoice)
  })

  router.post('/', async (request, response) => {
    const result = invoiceSchema.safeParse(request.body)

    if (!result.success) {
      response.status(400).json(formatValidationError(result.error))
      return
    }

    response.status(201).json(await repository.create(result.data))
  })

  router.put('/:id', async (request, response) => {
    const id = parseInvoiceId(request.params.id)

    if (!id) {
      response.status(400).json({ message: 'Invalid invoice id.' })
      return
    }

    const result = updateInvoiceSchema.safeParse(request.body)

    if (!result.success) {
      response.status(400).json(formatValidationError(result.error))
      return
    }

    const invoice = await repository.update(id, result.data)

    if (!invoice) {
      response.status(404).json({ message: 'Invoice not found.' })
      return
    }

    response.json(invoice)
  })

  router.delete('/:id', async (request, response) => {
    const id = parseInvoiceId(request.params.id)

    if (!id) {
      response.status(400).json({ message: 'Invalid invoice id.' })
      return
    }

    const deleted = await repository.delete(id)

    if (!deleted) {
      response.status(404).json({ message: 'Invoice not found.' })
      return
    }

    response.status(204).send()
  })

  return router
}

function parseInvoiceId(value: string | undefined): number | null {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}

function formatValidationError(error: z.ZodError): {
  message: string
  issues: Array<{ path: string; message: string }>
} {
  return {
    message: 'Invalid invoice payload.',
    issues: error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    })),
  }
}
