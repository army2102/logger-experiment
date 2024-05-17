import { LogMessage } from "./logger";

export const myFormatter = (log: LogMessage): string => {
  const meta = JSON.stringify(log.meta);

  return `${log.level}: ${log.createdAt}, ${log.message}, ${meta}`;
};
