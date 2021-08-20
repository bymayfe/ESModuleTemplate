import chalk from 'chalk';
import moment from 'moment';
import config from '../config.js'

export default class {
    constructor(client) {
        this.client = client
    };
    async execute(client) {

var game = [
     "Thans for ByMayFe",
     "Thans for Seyfettin Budak",
     "This Template is V13"
    ];

    setInterval(function() {
        var random = Math.floor(Math.random()*(game.length-0+1)+0);
        client.user.setActivity(game[random], { type: 'STREAMING', url: "https://twitch.tv/bymayfe", name: "ByMayFe"});
        }, 2 * 30000);
    
  console.log(chalk.red(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${client.user.tag}: Aktif, Komutlar yüklendi!`));
  console.log(chalk.red(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${client.user.tag}: ${client.user.username} ismi ile giriş yapıldı!`));
  client.user.setStatus("online");
  client.user.setActivity(`${config.prefix}yardım + ${client.guilds.cache.size} sunucu + ${client.users.cache.size} kullanıcı`, { type: 'STREAMING', url: "https://www.twitch.tv/bymayfe", name: "ByMayFe"});
  console.log(chalk.red(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${client.user.tag}: Status Ayarlandı!`));
  console.log(chalk.red(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${client.user.tag}: Şu an ${client.channels.cache.size} adet kanala, ${client.guilds.cache.size} adet sunucuya ve ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} kullanıcıya hizmet veriliyor`));
    };
};