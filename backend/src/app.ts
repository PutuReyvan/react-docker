import cors from 'cors'
import express, { type ErrorRequestHandler } from 'express'
import helmet from 'helmet'
import type { InvoiceRepository } from './repositories/invoiceRepository.js'
import { createInvoiceRouter } from './routes/invoices.js'

interface CreateAppOptions {
  invoiceRepository: InvoiceRepository
  corsOrigin?: string
}

export function createApp(options: CreateAppOptions) {
  const app = express()

  app.use(helmet())
  app.use(
    cors({
      origin: parseCorsOrigin(options.corsOrigin ?? process.env.CORS_ORIGIN),
    }),
  )
  app.use(express.json({ limit: '10kb' }))

  app.get('/health', (_request, response) => {
    response.type('text/plain').send('ok\n')
  })

  app.use('/api/invoices', createInvoiceRouter(options.invoiceRepository))

  app.use((_request, response) => {
    response.status(404).json({ message: 'Route not found.' })
  })

  app.use(errorHandler)

  return app
}

function parseCorsOrigin(value: string | undefined): boolean | string[] {
  if (!value) return true
  return value.split(',').map((origin) => origin.trim()).filter(Boolean)
}

const errorHandler: ErrorRequestHandler = (error, _request, response, next) => {
  void next

  if (error instanceof SyntaxError) {
    response.status(400).json({ message: 'Invalid JSON body.' })
    return
  }

  response.status(500).json({ message: 'Internal server error.' })
}
