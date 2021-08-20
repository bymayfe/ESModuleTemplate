import Discord from "discord.js";
import os from "os";
import { getMilliseconds, getReadableTime } from "quick-ms";

import Command from "../../schemas/commandSchema.js";
export default class InformationCommand extends Command {
  constructor() {
    super({
      name: "istatistic",
      aliases: ["i", "istatistik"],
      usage: "ping",
      category: "information",
      description: "Show ping bot.",
      enabled: true,
      nsfw: false,
      permLevel: 0,

      async execute(MultiFunction) {
        const uptimeTime = getReadableTime(MultiFunction.client.uptime, {
          compact: true,
        })
          .replace("d", "Gün")
          .replace("sec", "Saniye")
          .replace("min", "Dakika")
          .replace("hrs", "Saat")
          .replace("mo", "Ay")
          .replace("yrs", "Yıl");

        const FREEmemoriesKB = os.freemem / 1024;
        const TOTALmemoriesKB = os.totalmem / 1024;
        const FREEmemoriesMB = FREEmemoriesKB / 1024;
        const TOTALmemoriesMB = TOTALmemoriesKB / 1024;
        const FREEmemoriesGB = FREEmemoriesMB / 1024;
        const TOTALmemoriesGB = TOTALmemoriesMB / 1024;
        const userMemories = process.memoryUsage().heapUsed / 1024 / 1024 / 1024;
        const memories = `Used => ${userMemories
          .toString()
          .slice(0, 4)} / Free => ${FREEmemoriesGB.toString().slice(
          0,
          4,
        )} / Total => ${TOTALmemoriesGB.toString().slice(0, 5)}`;

        let bymayfe = await MultiFunction.client.users.fetch(
          "402047297963294730",
        );
        let seyfttn = await MultiFunction.client.users.fetch(
          "373493092881530887",
        );

        const annencilermaldır = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setFooter(
            "GuardMayFe  'Buyur benim istatistiklerim",
            MultiFunction.client.user.avatarURL({
              format: "png",
              dynamic: true,
              size: 1024,
            }),
          )
          .addField(
            "<:ovner:742898481127096351> <:mayfe:742898571505827990> **Botun Sahibi**",
            bymayfe.tag,
            true,
          )
          .addField(
            "<:botdev:715178721816084540> **Geliştirici** ",
            seyfttn.tag,
            true,
          )
          .addField(
            "<:3028_discord_outage:742904729545343056> Botun Genel Özellikleri",
            `\`\`\`|Memories: ${memories}\n|Uptime: ${uptimeTime}\n|Users: ${MultiFunction.client.guilds.cache.reduce(
              (a, b) => a + b.memberCount,
              0,
            )} |Servers: ${MultiFunction.client.guilds.cache.size.toLocaleString()} |Channels: ${MultiFunction.client.channels.cache.size.toLocaleString()}\`\`\``,
          )
          .addField(
            "<:3434_Discord_js_logo:742904728098439230> **Discord.JS sürüm**",
            "v" + Discord.version,
            true,
          )
          .addField(
            "<:node_js:742904730291929119> **Node.JS sürüm**",
            `${process.version}`,
            true,
          )
          .addField(
            "<a:3774_Ping999:742904731088846958> **Ping**",
            MultiFunction.client.ws.ping + " ms",
            true,
          )
          .addField(
            "<:1604_certified_green:742904728979112057> **CPU**",
            `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]} => ${
              os.cpus().map((i) => `${i.speed}`)[0]
            }\`\`\``,
          )
          .addField(
            "<:3334_windows10:742902593738637423> **Bit**",
            `\`${os.arch()}\``,
            true,
          )
          .addField(
            "<:3334_windows10:742902593738637423> **İşletim Sistemi**",
            `\`\`${os.platform().replace("win32", "Windows")}\`\``,
            true,
          )
          .addField(
            "**<:9195_upvote:742900154381893672>  Voteleme sayfası**",
            " [OYLAR MISIN?](https://top.gg/bot/596071936799277116/vote)",
          )
          .addField(
            "** <a:7356_trophy:742901720597790740>  Bot Davet**",
            " [Davet Et](https://discordapp.com/oauth2/authorize?client_id=596071936799277116&scope=bot&permissions=2146958847)",
            true,
          )
          .addField(
            "** <:Support:742900531579584572>  Destek Sunucusu**",
            " [Sunucumuza Katıl](https://discord.gg/DSc8uFp)",
            true,
          );

        return MultiFunction.message.channel.send({
          embeds: [annencilermaldır],
        });
      },
    });
  }
}
