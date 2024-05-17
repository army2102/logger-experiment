import { LogMessage } from "./logger";

export const addSource = (log: LogMessage): void => {
  log.addField("source", "API");
};

export const addAction = (log: LogMessage): void => {
  log.addField("action", "Check API source code at <link>");
};
