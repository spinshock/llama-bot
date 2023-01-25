import "./config";
// CONFIG
import createBot from "./bot";
import { ALL_COMMANDS } from "./commands/command";
import "./database/database";
import ALL_LISTENERS from "./listeners/index";

const llamaBot = createBot();
llamaBot.registerListeners(...ALL_LISTENERS);
llamaBot.registerCommands(ALL_COMMANDS);
llamaBot.start();

const exit = (code = 0) => {
  console.log("Gracefully exiting...");

  llamaBot.destroy();
  process.exit(code);
};

process.once("SIGTERM", () => exit());
process.once("SIGINT", () => exit());
