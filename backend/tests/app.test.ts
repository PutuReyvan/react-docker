import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { createApp } from '../src/app.js'
import { MemoryInvoiceRepository } from '../src/repositories/memoryInvoiceRepository.js'

function buildApp() {
  return createApp({
    invoiceRepository: new MemoryInvoiceRepository([]),
    corsOrigin: 'http://localhost:5173',
  })
}

describe('invoice API', () => {
  it('returns the health check response', async () => {
    await request(buildApp()).get('/health').expect(200).expect('Content-Type', /text\/plain/).expect('ok\n')
  })

  it('creates and lists invoices', async () => {
    const app = buildApp()
    const invoice = {
      client: 'Acme Manufacturing',
      amount: 5400,
      status: 'paid',
      dueDate: '2026-04-18',
    }

    const createResponse = await request(app).post('/api/invoices').send(invoice).expect(201)

    expect(createResponse.body).toEqual({ id: 1, ...invoice })

    const listResponse = await request(app).get('/api/invoices').expect(200)
    expect(listResponse.body).toEqual([{ id: 1, ...invoice }])
  })

  it('rejects invalid invoice payloads', async () => {
    const response = await request(buildApp())
      .post('/api/invoices')
      .send({ client: '', amount: -10, status: 'draft', dueDate: 'tomorrow' })
      .expect(400)

    expect(response.body.message).toBe('Invalid invoice payload.')
    expect(response.body.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'client' }),
        expect.objectContaining({ path: 'amount' }),
        expect.objectContaining({ path: 'status' }),
        expect.objectContaining({ path: 'dueDate' }),
      ]),
    )
  })

  it('sets CORS only for configured origins', async () => {
    await request(buildApp())
      .get('/health')
      .set('Origin', 'http://localhost:5173')
      .expect('Access-Control-Allow-Origin', 'http://localhost:5173')

    const response = await request(buildApp()).get('/health').set('Origin', 'https://example.com').expect(200)

    expect(response.headers['access-control-allow-origin']).toBeUndefined()
  })
})
