import { Client, Collection} from 'discord.js';
import config from '../config.js';
import commandHandler from "../handlers/commandHandler.js";
import eventHandler from "../handlers/eventHandler.js";

export default class Start extends Client {
    constructor() {
        super({ 
            intents: 32767, //Tüm intentleri import ettik
            restTimeOffset: 100, // Bunu düşürmeyin (eğer bilgisayarınız kasıyorsa arttırabilirsiniz) default: 1000
            partials: ['MESSAGE', 'CHANNEL', 'REACTION'] //Bu ise bot reset yediğinde mesaj verilerini sildirtmiyor cacheyi devam ettiriyor (ellemeyin kalsın bu)
         });
         this.commands = new Collection();
         this.aliases = new Collection();
    }

    async loader() {
      new commandHandler(this).load();
      new eventHandler(this).load();

      await this.login(config.token)
  }
}