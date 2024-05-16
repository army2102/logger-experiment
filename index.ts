import { writeFile } from 'fs'
import { LogMessage, Logger } from './logger'

// V1
// Fix behavior

// V2 Provide more flexibility
// Custom log level
// Custom format and log level for each transport
// Additionl data for each code module

// Setup
const addSource = (log: LogMessage): void => {
  log.addField('source', 'API')
}
const addAction = (log: LogMessage): void => {
  log.addField('action', 'Check API source code at <link>')
}

const myFormatter = (log: LogMessage): string => {
  const meta = JSON.stringify(log.meta)

  return `${log.level}: ${log.createdAt}, ${log.message}, ${meta}`
}

const fileTransport = (log: LogMessage): void => {
  writeFile(`${log.level}.log`, log.format(), err => {
    if (err) {
      console.error('Error writing to file:', err)
      return
    }
    console.log('Content has been written to')
  })
}

const logger = new Logger({
  level: 'debug',
  preHooks: [addSource, addAction],
  format: myFormatter,
  transports: [fileTransport]
})

logger.info('Hello World')
