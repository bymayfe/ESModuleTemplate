import { readdirSync } from 'fs';

export default class eventHandler {
    constructor(client) {
      this.client = client;
    }

     load() {
      readdirSync('./events/').forEach(async dir => {
        //console.log(dir)
        const eventName = dir.split("_")[0];
          const event = new (await import(`../events/${dir}`)).default();
          /*const Import = await import(`../events/${dir}`);
          const event = await new Import.default();*/            // kafanıza göre kullanın işte 
          this.client.on(eventName, (...args) => event.execute(...args));
      });
    }

  }