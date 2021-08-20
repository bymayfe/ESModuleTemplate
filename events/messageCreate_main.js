"use strict";
import ctx from '../multiFunction/multiFunction.js';
import ms from 'ms';
import { MessageEmbed } from "discord.js";
const CooldownArry = new Set();

export default class {
    constructor(){
    }

    async execute(message) {
        const MultiFunction = new ctx(message, message.client);
        
        const prefix = MultiFunction.prefix
        const originalPrefix = MultiFunction.originalPrefix;
        const language = MultiFunction.lang;
        const args = MultiFunction.args;
        const command = MultiFunction.command;
        const permLevel = MultiFunction.permLevel;
        const client = MultiFunction.client;
        const userPermErrorArry = [], clientPermErrorArry = [];
        
        const mention = [`<@${client.user.id}>`, `<@!${client.user.id}>`];
        if (!mention.some(word => message.content.startsWith(word) || message.content.startsWith(prefix) || message.content.startsWith(originalPrefix))) return;

        if(client.commands.has(command) || client.aliases.has(command)) {
                if(CooldownArry.has(message.author.id)) return message.reply(`You must wait ${ms(MultiFunction.cmd.conf.cooldown)} second.`);
                 else Cooldown(message.author.id, CooldownArry, MultiFunction.cmd.conf.cooldown, false)
                var cmd = MultiFunction.cmd;
        } else return //message.reply(`Botta **\`${command}\`** komutu bulunmamaktadır.`)

              if (cmd.conf.maintenance === true) return message.reply(`This command has maintenance`);
              if (cmd.conf.enabled === false) return message.reply(`This command has disable from Bot Developers`);
              if (cmd.conf.developerOnly === true) if(!permLevel.botDeveloper) return message.reply(`To use this command, You must be "**Bot Developer**".`);
              if (cmd.conf.ownerOnly === true) if(!permLevel.botOwner) return message.reply(`To use this command, You must be "**Bot Owner**".`);

              if (cmd.conf.requiredUserPermissions[0]) {
                  cmd.conf.requiredUserPermissions.forEach(perm => {
                    if(!message.member.permissionsIn(message.channel).has(perm)) {
                      userPermErrorArry.push(perm);
                    };
                  });
              };

              if (cmd.conf.requiredClientPermissions[0]) {
                cmd.conf.requiredClientPermissions.forEach(perm => {
                  if(!message.guild.me.permissionsIn(message.channel).has(perm)) {
                    clientPermErrorArry.push(perm);
                  };
                });
            };


          if(userPermErrorArry[0] || clientPermErrorArry[0]) {
            let permErrorEmbed = new MessageEmbed()
            .setAuthor("Missing Permission/s", message.author.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
            .setColor("RED")
            .setTimestamp()
            if(userPermErrorArry[0]) permErrorEmbed.addField(`User Permissions`, `\`\`\`diff\n${userPermErrorArry.map((p) => `- ${p}`).join("\n")}\`\`\``)
            if(clientPermErrorArry[0]) permErrorEmbed.addField(`Client Permissions`, `\`\`\`diff\n${clientPermErrorArry.map((p) => `- ${p}`).join("\n")}\`\`\``)
            return MultiFunction.templateButtonMessage(message.channel.id,{ embeds: [permErrorEmbed]})
          }
  
            cmd.execute(MultiFunction);

          function Cooldown(author, arry, time, owner) {
                  if(owner === true) arry.add(author);
                   else if(!permLevel.botOwner) arry.add(author);
          
                  setTimeout(() => {
                      if(arry.has(author)) {
                        arry.delete(author);
                      }
                    }, time);
            };
    }
};

