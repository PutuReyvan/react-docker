import { type Collection, type Db, MongoClient } from 'mongodb'
import { seedInvoices } from '../data/invoices.js'
import type { CreateInvoiceInput, Invoice, UpdateInvoiceInput } from '../types/invoice.js'
import type { InvoiceRepository } from './invoiceRepository.js'

type InvoiceDocument = Invoice

export class MongoInvoiceRepository implements InvoiceRepository {
  private readonly collection: Collection<InvoiceDocument>

  constructor(db: Db) {
    this.collection = db.collection<InvoiceDocument>('invoices')
  }

  async initialize(): Promise<void> {
    await this.collection.createIndex({ id: 1 }, { unique: true })

    const invoiceCount = await this.collection.countDocuments()
    if (invoiceCount === 0) {
      await this.collection.insertMany(seedInvoices.map((invoice) => ({ ...invoice })))
    }
  }

  async list(): Promise<Invoice[]> {
    return this.collection.find({}, { projection: { _id: 0 } }).sort({ id: 1 }).toArray()
  }

  async findById(id: number): Promise<Invoice | null> {
    return this.collection.findOne({ id }, { projection: { _id: 0 } })
  }

  async create(input: CreateInvoiceInput): Promise<Invoice> {
    const latestInvoice = await this.collection.find({}, { projection: { id: 1 } }).sort({ id: -1 }).limit(1).next()
    const invoice = { id: (latestInvoice?.id ?? 0) + 1, ...input }
    await this.collection.insertOne(invoice)
    return invoice
  }

  async update(id: number, input: UpdateInvoiceInput): Promise<Invoice | null> {
    const result = await this.collection.findOneAndUpdate(
      { id },
      { $set: input },
      { projection: { _id: 0 }, returnDocument: 'after' },
    )

    return result
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.collection.deleteOne({ id })
    return result.deletedCount === 1
  }
}

export async function createMongoInvoiceRepository(options: {
  uri: string
  dbName: string
}): Promise<{ client: MongoClient; repository: MongoInvoiceRepository }> {
  const client = new MongoClient(options.uri)
  await client.connect()

  const repository = new MongoInvoiceRepository(client.db(options.dbName))
  await repository.initialize()

  return { client, repository }
}
