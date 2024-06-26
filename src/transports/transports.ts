import { LoggerGlobalOptions, Message } from '../globalTypes'

export type TransportOptions = LoggerGlobalOptions
export interface Transport {
  options: TransportOptions
  log(globalOptions: LoggerGlobalOptions, message: Message): Promise<void>
}

export class TerminalTransport implements Transport {
  options: TransportOptions

  constructor(options: TransportOptions) {
    this.options = options
  }

  log(globalOptions: LoggerGlobalOptions, message: Message): Promise<void> {
    // Use the transport options first, if not found, use the global options instead.
    // Map level with NodeJS console or use third-party lib.
    throw new Error('Not implement')
  }
}

export class FileTransport implements Transport {
  options: TransportOptions

  constructor(options: TransportOptions) {
    this.options = options
  }

  log(globalOptions: LoggerGlobalOptions, message: Message): Promise<void> {
    // Use the transport options first, if not found, use the global options instead.
    // Write your own or use third-party lib.
    throw new Error('Not implement')
  }
}
