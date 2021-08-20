import config from "../config.js";
import qdb from 'quick.db';
import fs from "fs";
import { MessageActionRow, Message, MessageAttachment, MessageButton } from "discord.js"
import Start from "../handlers/BaseClient.js";
import permLevel from "./permLevel.js";

export default class MultiFunction {

    /**
     * @param {Message} message
     * @param { Start } client
     * @memberof MultiFunction
     */
    constructor(message, client) {
        this.message = message;
        this.guild = message.guild;
        this.client = client
        this.user = message.member;
        this.permLevel = new permLevel(message.member, message.guild);
        this.config = config;
        this.date = new Date().toLocaleString("tr-TR", { timeZone: "Asia/Istanbul"});
        /* -- Prefix -- */
         this.originalPrefix = config.prefix;
         if (qdb.has(`prefix_${message.guild.id}`) === false) this.prefix = config.prefix;
          else this.prefix = qdb.fetch(`prefix_${message.guild.id}`);

        /* -- Argumans -- */
        if (message.content.startsWith(this.prefix)) {
            this.args = message.content.split(' ').slice(1)
            this.command = message.content.split(' ')[0].slice(this.prefix.length);    
          } else if (message.content.startsWith(this.originalPrefix)) {
            this.args = message.content.split(' ').slice(1)
            this.command = message.content.split(' ')[0].slice(this.originalPrefix.length);
          } else {
            this.args = message.content.split(' ').slice(2)
            this.command = message.content.split(' ')[1]
          }
          this.cmd = this.client.commands.has(this.command) ? this.client.commands.get(this.command) : this.client.commands.get(this.client.aliases.get(this.command))
          /* -- THIS -- */
          global.brain = this;
          this.brainList = Object.getOwnPropertyNames(this);
    }


    /**
     *
     *
     * @param {*} channel
     * @param {*} title
     * @param {*} content
     * @param {*} deleteTXT
     * @param {*} type
     * @return {*} 
     * @memberof MultiFunction
     */
    async TXTSend(channel, title, content, deleteTXT, type) {
      var kanal = this.message.client.channels.cache.get(channel);
      var FileNames = `${kanal.id}_${this.message.id}`;
      var fileName;

      if(type === "lyrics") fileName = './TXT/lyrics/'+ FileNames + '.txt';
         else if(type === "eval") fileName = './TXT/eval/'+ FileNames + '.txt';
            else if(type === "normal") fileName = './TXT/TXTSend/'+ FileNames + '.txt';
           await fs.promises.appendFile(fileName, `${title}\n\n${content}`);
          const attachment = new MessageAttachment(fileName, `${title}.txt`);

          if(deleteTXT === true) {
           return kanal.send({files: [attachment]}).then(() => {
                 fs.unlinkSync(fileName);
            }).catch(err => {
              console.error(err);
            })
          } else { 
           return kanal.send({files: [attachment]});
          }
  }

  /**
   *
   *
   * @param {*} channel
   * @param {*} content
   * @return {*} 
   * @memberof MultiFunction
   */
  templateButtonMessage(channel, content) {
    if(!channel) throw new Error('Channel value is required.');
    if(!content) throw new Error("Content values are required.");
    if(typeof content !== "object") throw new TypeError('Content must be an object');
    const kanal = this.message.client.channels.cache.get(channel);
    const rowMenu  = new MessageActionRow();
    const row = new MessageActionRow();
    row.addComponents(
          new MessageButton()
            .setCustomId('deleteCommandMessage')
            .setEmoji('🗑️')
            .setStyle('DANGER'),
        );
        if(!content.components) content.components = []
        var arryRow = [];
        if(content.components.length > 1) {
          var buttonSayi = 0;
          var menuSayi = 0;
            content.components.map(components => {
              components.components.map(com => {
                if(com.type === 'BUTTON') {
                  if(buttonSayi < 1) {
                    if(components.components.length > 4) throw new Error('First components MAX 4 add component');
                     row.components.push(com)
                     arryRow.push(row)
                     buttonSayi += 1
                    } else {
                      if(components.components.length > 5) throw new Error('Other components MAX 5 add component');
                      row[buttonSayi] = new MessageActionRow()
                .addComponents();
                      row[buttonSayi].components.push(com);     
                      arryRow.push(row[buttonSayi])
                      buttonSayi += 1
                    }
                } else if (com.type === "SELECT_MENU") {
                   // rowMenu[menuSayi] = new MessageActionRow()
                   // .addComponents();
                    rowMenu.components.push(com);    
                    arryRow.push(rowMenu)
                }
        
              })
            });
        } else {
          content.components.map(components => {
            components.components.map(com => {
              if(com.type === 'BUTTON') {
                if(components.components.length > 4) return;
                 row.components.push(com);
              } else if(com.type === "SELECT_MENU") {
  
                rowMenu.components.push(com);    
                arryRow.push(rowMenu, row)
              }
            })
  
  
            })
         
        }
        var row2 = arryRow[0] ? arryRow : Array(row);
  
        const componentFilter = i => i.customId === "deleteCommandMessage" && i.user.id === this.message.member.id;
  
      const componentCollector = this.message.channel.createMessageComponentCollector({ componentFilter, max: 1});
  
      componentCollector.on('collect', async c => {
       if (c.customId === 'deleteCommandMessage') {
        await c.message.delete({timeout: 2000}).catch(err => { 
          if (err.code !== 10008) console.error(err)
        });
         if(this.message) return this.message.delete({timeout: 3000}).catch(err => { 
           if (err.code !== 10008) console.error(err)
         });
    }
  });
        return kanal.send({...content, components: [...row2]})     
  };
}
