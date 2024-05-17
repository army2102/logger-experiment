type LogInput =
  | string
  | number
  | Error
  | Record<"string | number | symbol", unknown>;
type LogLevel = "error" | "warn" | "info" | "debug";

type LoggerInput = {
  level: LogLevel;
  preHooks: ((log: LogMessage) => void)[];
  format: (log: LogMessage) => string;
  transports: ((log: LogMessage) => void)[];
};
export class Logger {
  // Log Level => Log only this level or above
  private level: LogLevel;

  // PreHook => Add or filter data
  private preHooks: ((log: LogMessage) => void)[];

  // Formatter (default) => Format message into a shape that compatible with the transport
  private format: (log: LogMessage) => string;

  // PostHook => where to send the log to (default is a terminal)
  private transports: ((log: LogMessage) => void)[];

  constructor(input: LoggerInput) {
    this.level = input.level;
    this.preHooks = input.preHooks;
    this.format = input.format;
    this.transports = input.transports;
  }

  // ควรใส่ Argument ได้เรื่อยๆ แบบ Console.log
  private log(message: LogInput): void {
    // Create log message
    const log = new LogMessage({
      level: this.level,
      message: message,
      format: this.format,
    });

    // Check logger level to determine operation continuity
    if (!log.shouldOperate) {
      return;
    }

    // Modify the message for filter or add additional information
    this.preHooks.forEach((prehook) => {
      prehook(log);
    });

    // Send message to each transport with terminal as a default
    this.transports.push((log) => {
      console.log(log);
    });

    // Should start at the same time
    try {
      this.transports.forEach((prehook) => {
        prehook(log);
      });
    } catch (error) {}
  }

  public error(message: LogInput): void {
    this.log(message);
  }

  public warn(message: LogInput): void {
    this.log(message);
  }

  public info(message: LogInput): void {
    this.log(message);
  }

  public debug(message: LogInput): void {
    this.log(message);
  }
}

type LogMessageInput = {
  level: LogLevel;
  message: LogInput;
  format: (log: LogMessage) => string;
};
export class LogMessage {
  // เกิดที่ไหน, เกิดเมื่อไหร่, ร้ายแรงแค่ไหน, มีข้อมูลอะไรให้ทราบบ้าง, ควรทำอย่างไรต่อ (Optional)
  public readonly level: LogLevel;
  public readonly message: LogInput;
  public readonly meta: Record<string, unknown>;
  public readonly createdAt: Date;
  public readonly format: () => string;

  constructor(input: LogMessageInput) {
    this.level = input.level;
    this.message = input.message;
    this.meta = {};
    this.createdAt = new Date(); // What is the format. What is the time zone

    // Kinda werid, help!!
    this.format = () => {
      return input.format(this);
    };
  }

  public shouldOperate(): boolean {
    // Base on level of log
    return true;
  }

  public addField(name: string, value: unknown) {
    this.meta[name] = value;
  }
}
