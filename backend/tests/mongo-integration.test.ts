import { MongoClient } from 'mongodb'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { seedInvoices } from '../src/data/invoices.js'
import {
  createMongoInvoiceRepository,
  type MongoInvoiceRepository,
} from '../src/repositories/mongoInvoiceRepository.js'

const mongoUri = process.env.MONGODB_URI
const describeIfMongo = mongoUri ? describe : describe.skip
const dbName = process.env.MONGODB_DB_NAME ?? `invoice_api_test_${Date.now()}`

let client: MongoClient
let repository: MongoInvoiceRepository

describeIfMongo('MongoInvoiceRepository', () => {
  beforeAll(async () => {
    const cleanupClient = new MongoClient(mongoUri as string)
    await cleanupClient.connect()
    await cleanupClient.db(dbName).dropDatabase()
    await cleanupClient.close()

    const setup = await createMongoInvoiceRepository({
      uri: mongoUri as string,
      dbName,
    })

    client = setup.client
    repository = setup.repository
  })

  afterAll(async () => {
    await client.db(dbName).dropDatabase()
    await client.close()
  })

  it('seeds and lists invoices from MongoDB', async () => {
    await expect(repository.list()).resolves.toEqual(seedInvoices)
  })

  it('persists invoice create, update, and delete operations', async () => {
    const created = await repository.create({
      client: 'Contoso Finance',
      amount: 7300,
      status: 'pending',
      dueDate: '2026-06-30',
    })

    expect(created.id).toBe(seedInvoices.length + 1)
    await expect(repository.findById(created.id)).resolves.toEqual(created)

    const updated = await repository.update(created.id, { status: 'paid' })
    expect(updated).toEqual({ ...created, status: 'paid' })

    await expect(repository.delete(created.id)).resolves.toBe(true)
    await expect(repository.findById(created.id)).resolves.toBeNull()
  })
})
