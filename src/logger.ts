// Features
// Log means to receive information and send it to somewhere
// Transport means a place that a log will be send to ex. terminal, third-party API, database, ...

import { TerminalTransport, Transport } from './transports/transports'
import {
  DefaultLogLevelInput,
  LoggerGlobalOptions,
  Message
} from './globalTypes'

// Feat 1: Can log to a user's terminal

// Feat 2: Can log at difference level of severity
// => Derive from Winston
// => RFC5424 severity of all levels is assumed to be numerically ascending from most important to least important.

// Feat 3: Can log to multiple transports
// => User's terminal count as one type of transport
// => Each transport have to work in parallel
// => Each transport can have its own settings (level, etc)

// Feat 4: Can format log message before logging
// => Format means to add or to filter out data from the message
// => Each transport can have its own format

// TODO: Implement formatter module
// https://github.com/winstonjs/logform?tab=readme-ov-file#understanding-formats
// Format => define a single method: transform(info, opts) and return the mutated info

export type LoggerInput = {
  globalOptions: LoggerGlobalOptions
  transports?: Transport[]
}
export class Logger {
  private globalOptions: LoggerGlobalOptions
  private transports: Transport[]

  constructor({ globalOptions, transports }: LoggerInput) {
    this.globalOptions = globalOptions

    // Inject terminal transport
    if (typeof transports === 'undefined' || transports.length === 0) {
      this.transports = [new TerminalTransport(this.globalOptions)]
      return
    }

    this.transports = transports

    // Handle case user want to overwrite Terminal transport
    const haveTerminalTransport = this.transports.find(
      transport => transport instanceof TerminalTransport
    )

    if (!haveTerminalTransport) {
      this.transports.push(new TerminalTransport(this.globalOptions))
    }
  }

  public log(level: DefaultLogLevelInput, message: Message): void {
    // send message and global settings to each transport
    const sendLogs = this.transports.map(transport =>
      transport.log(this.globalOptions, message)
    )

    try {
      Promise.allSettled(sendLogs) // To start
    } catch (error) {
      // Send log to user's terminal
      return
    }
  }

  public error(message: Message): void {
    this.log('error', message)
  }

  public warning(message: Message): void {
    this.log('warning', message)
  }

  public info(message: Message): void {
    this.log('info', message)
  }

  public debug(message: Message): void {
    this.log('debug', message)
  }

  public verbose(message: Message): void {
    this.log('verbose', message)
  }
}

const logger = new Logger({
  globalOptions: { level: 'verbose' },
  transports: []
})
