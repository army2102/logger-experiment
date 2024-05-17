import { Logger } from "./logger";
import { addAction, addSource } from "./preHooks";
import { myFormatter } from "./formatter";
import { fileTransport } from "./transports";

// Setup
const logger = new Logger({
  level: "debug",
  preHooks: [addSource, addAction],
  format: myFormatter,
  transports: [fileTransport],
});

// Using
logger.info("Hello World");
