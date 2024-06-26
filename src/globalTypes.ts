type DefaultLogLevel = {
  error: 0
  warning: 1
  info: 2
  debug: 3
  verbose: 4
}
export type DefaultLogLevelInput = keyof DefaultLogLevel

export type Message = string | number | Error | Record<any, unknown>

export type LoggerGlobalOptions = { level: DefaultLogLevelInput }
