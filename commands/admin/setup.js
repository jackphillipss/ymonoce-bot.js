const Discord = require('discord.js');
const prefix = require('../../config.json').prefix;
const { Database } = require('quickmongo');
const mongoDBURL = require('../../config.json').mongoDBURL;
const quickmongo = new Database(mongoDBURL);

module.exports = {
    name: 'setup',
    category: 'admin',
    description: 'Set up the server',

    run: async (client, message, args) => {
        let choice = args[0];

        const noCoiceEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('❗ NO CHOICE SELECTED')
            .setDescription('Please select which section you want to setup.')
            .addField('Usage', `${prefix}setup <section-name> [value]`)
            .addField('\u200B', '__General__')
            .addField('👋 Welcome Channel', 'Section name : **welcomeChannel**')
            .addField('👋 Goodye Channel', 'Section name : **goodbyeChannel**')
            .addField('🌐 Autorole', 'Section name : **autoRole**')
            .addField('\u200B', '__Moderations__')
            .addField('🔨 Logs Channel', 'Section name : **logsChannel**')
            .addField('👤 Member Role', 'Section name : **memberRole**')
            .addField('🐵 Mute Role', 'Section name : **muteRole**')
            .addField('\u200B', '__Features__')
            .addField('🚫 Anticurse', 'Section name : **anticurse-enable/disable**')

        if (!choice) return message.channel.send(noCoiceEmbed);

        // checking for status and return value
        const anticurseCheck = await quickmongo.fetch(`swear-${message.guild.id}`);
        let anticurseStaus;

        //check for anticurse status
        if (anticurseCheck === true) {
            anticurseStaus = '🟢 (ON)'
        } else anticurseStaus = '🔴 (OFF)';

        if (choice === 'config') {
            const configEmbed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`⚙️ ${message.guild.name}'s Server Configuration`)
                .addField('Usage', `${prefix}setup <section> [value]`)
                .addField('\u200B', '__General__')
                .addField('👋 Welcome Channel', '`COMING SOON!`')
                .addField('👋 Goodye Channel', '`COMING SOON!`')
                .addField('🌐 Autorole', '`COMING SOON!`')
                .addField('\u200B', '__Moderations__')
                .addField('🔨 Logs Channel', '`COMING SOON!`')
                .addField('👤 Member Role', '`COMING SOON!`')
                .addField('🐵 Mute Role', '`COMING SOON!`')
                .addField('\u200B', '__Features__')
                .addField('🤬 Anticurse', `\`${anticurseStaus}\``);

            message.channel.send(configEmbed);
        }
    },
};