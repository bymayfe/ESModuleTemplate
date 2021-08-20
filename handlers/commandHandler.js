import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import chalk from 'chalk';
//import AsciiTable from 'ascii-table';
//const commandtable = new AsciiTable('MayFe Command Table');

export default class commandHandler {
    constructor(client) {
        this.client = client
    }

     load() {
       //commandtable.setHeading("Language","Command", 'Status', "Maintenance", "Perm LVL", "Category", "Aliases")
      readdirSync('./commands').forEach(dir => {
        const commandFiles = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        commandFiles.forEach(async file => {
          const command = new (await import(`../commands/${dir}/${file}`)).default();
          /*const Import = await import(`../commands/${dir}/${file}`);
          const command = await new Import.default();*/                       // kafanıza göre kullanın işte 
          this.client.commands.set(command.help.name, command);
          console.log(chalk.magenta(`${command.help.name} => ${command.help.aliases} ✔️`));
          //commandtable.addRow("languages", command.help.name, command.conf.enabled, command.conf.maintenance, "permLvl", dir, command.conf.aliases)
          command.help.aliases.forEach(aliase => this.client.aliases.set(aliase, command.help.name));
        });
      });
      //console.log(chalk.magenta(commandtable.toString()));
    }

  }