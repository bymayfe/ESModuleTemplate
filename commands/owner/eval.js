"use strict";
import util from "util";

import Command from "../../schemas/commandSchema.js";
export default class EvalCommand extends Command {
  constructor() {
    super({
      name: "eval",
      usage: "eval code",
      category: "owner",
      description: "Trying code to be executed.",
      ownerOnly: true,

      async execute(MultiFunction) {
        try {
          var code = MultiFunction.args.join(" ");
          var evaled = eval(code);

          if (typeof evaled !== "string") evaled = util.inspect(evaled);

          return MultiFunction.message.channel
            .send("```\n" + (await clean(evaled)) + "```")
            .catch((error) => {
              if (error.code === 50035) {
                return brain.TXTSend(
                  MultiFunction.message.channel.id,
                  "EVAL 2000",
                  `${clean(evaled)}`,
                  true,
                  "eval",
                );
              } else {
                console.log(error);
              }
            });
        } catch (err) {
          return MultiFunction.message.channel
            .send(`\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``)
            .catch((error) => {
              if (error.code === 50035) {
                return brain.TXTSend(
                  MultiFunction.message.channel.id,
                  "HATA EVAL 2000",
                  `\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``,
                  true,
                  "eval",
                );
              } else {
                console.log(error);
              }
            });
        }
        function clean(text) {
          if (typeof text === "string") {
            return text
              .replace(/`/g, "`" + String.fromCharCode(8203))
              .replace(/@/g, "@" + String.fromCharCode(8203)); //.replace(ayarlar.token, "TOKEN(SECRET)").replace(ayarlar.token2, "TOKEN(SECRET)");
          } else {
            return text;
          }
        }
      },
    });
  }
}
