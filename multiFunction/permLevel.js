import config from "../config.js";
import { Permissions } from "discord.js";

export default class permLevel {
    constructor (user, guild) {          
        this.botOwner = config.owners.includes(user.user.id)
        this.botDeveloper = config.developers.includes(user.user.id) || this.botOwner;
        
     
    }

}