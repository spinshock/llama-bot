import "./config";
// CONFIG
import createBot from "./bot";
import "./database/database";
import ALL_LISTENERS from "./listeners/index";

const llamaBot = createBot();
llamaBot.registerListeners(...ALL_LISTENERS);
llamaBot.start();

const exit = (code = 0) => {
  console.log("Gracefully exiting...");

  llamaBot.destroy();
  process.exit(code);
};

process.once("SIGTERM", () => exit());
process.once("SIGINT", () => exit());
