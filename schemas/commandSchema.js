"use strict";
import Discord from "discord.js";
import Context from "../multiFunction/multiFunction.js";
export default class Schema {
  /**
   * @param {{
   *   execute: (ctx: Context) => Promise<unknown> | unknown,
   *   name: string;
   *   aliases?: string[]
   *   usage?: string,
   *   category?: string,
   *   enabled?: boolean;,
   *   maintenance?: boolean,
   *   ownerOnly?: boolean,
   *   developerOnly?: boolean,
   *   nsfw?: boolean,
   *   requiredUserPermissions?: Discord.PermissionResolvable[]
   *   requiredClientPermissions?: Discord.PermissionResolvable[]
   *   cooldown: number;
   * }}
   */
  constructor({
    name = null,
    aliases = [],
    usage = null,
    category = null,
    description = null,
    enabled = true,
    maintenance = false,
    ownerOnly = false,
    developerOnly = false,
    nsfw = false,
    requiredUserPermissions = [],
    requiredClientPermissions = [],
    cooldown = 3000,
    execute,
  }) {
    this.conf = {
      enabled,
      maintenance,
      cooldown,
      nsfw,
      requiredUserPermissions,
      requiredClientPermissions,
      ownerOnly,
      developerOnly
    };

    this.help = { name, aliases, usage, category, description };
    this.execute = execute;
  }
}
