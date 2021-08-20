"use strict";
import Command from "../../schemas/commandSchema.js";
export default class PingCommand extends Command {
  constructor() {
    super({
      name: "ping",
      aliases: ["ms", "delay", "timeout"],
      usage: "ping",
      category: "information",
      description: "Show ping bot.",

      async execute(MultiFunction) {
        const ping = MultiFunction.client.ws.ping;

        return MultiFunction.message.channel.send(`Pong! **${ping}**`);
      },
    });
  }
}
