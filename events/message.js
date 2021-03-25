const client = require('../index');
const config = require('../config.json'); // retreive config
const token = config.token; // retrieve token
const prefix = config.prefix; // retrieve prefix
const { Database } = require('quickmongo');
const mongoDBURL = require('../config.json').mongoDBURL;
const quickmongo = new Database(mongoDBURL);
const { badwords } = require('../badwords.json');

// message event (for commands)
client.on('message', async message => {
    if (message.author.bot) return;

    if (await quickmongo.fetch(`swear-${message.guild.id}`) === true) {
        for (let i = 0; i < badwords.length; i++) {
            if (message.content.toLowerCase().includes(badwords[i].toLowerCase())) {
                message.delete();

                message.reply('Please do not swear in this server.').then(msg => {
                    msg.delete({ timeout : 5000 });
                })
            }
        }
    }

    //check for AFK message
    if (await quickmongo.fetch(`afk-${message.author.id}+${message.guild.id}`)) {
        const info = await quickmongo.get(`afk-${message.author.id}+${message.guild.id}`);
        const user = message.member;
        await quickmongo.delete(`afk-${message.author.id}+${message.guild.id}`);

        try {
            await user.setNickname(null)
        } catch {
            message.channel.send('Cannot reset nickname.')
        }

        message.reply(`Removed AFK Status, you were AFK with reason : ${info}`)
    }

    // check for mention
    const mentionedMember = message.mentions.members.first();
    if (mentionedMember) {
        if (await quickmongo.fetch(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
            message.reply(
                (`${mentionedMember.user.tag} is AFK with reason : ` + await quickmongo.get(`${message.mentions.members.first().id}+${message.guild.id}`))
            );
        } else return;
    }

    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args);
});