import { writeFile } from "fs";

import { LogMessage } from "./logger";

export const fileTransport = (log: LogMessage): void => {
  writeFile(`${log.level}.log`, log.format(), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
    console.log("Content has been written to");
  });
};
