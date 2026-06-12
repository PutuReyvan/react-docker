import { createApp } from './app.js'
import { createMongoInvoiceRepository } from './repositories/mongoInvoiceRepository.js'

const port = Number(process.env.PORT ?? 3001)
const mongoUri = process.env.MONGODB_URI
const mongoDbName = process.env.MONGODB_DB_NAME ?? 'invoice_api'

if (!mongoUri) {
  throw new Error('MONGODB_URI is required.')
}

const { client, repository } = await createMongoInvoiceRepository({
  uri: mongoUri,
  dbName: mongoDbName,
})

const app = createApp({ invoiceRepository: repository })

const server = app.listen(port, () => {
  console.log(`Invoice API listening on port ${port}`)
})

async function shutdown(): Promise<void> {
  server.close(async () => {
    await client.close()
    process.exit(0)
  })
}

process.on('SIGINT', () => {
  void shutdown()
})

process.on('SIGTERM', () => {
  void shutdown()
})
