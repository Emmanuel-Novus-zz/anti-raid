'use strict';

const Command = require("../../structure/Command.js");

class CheckID extends Command {
    constructor() {
        super({
            name: 'checkid',
            category: 'utils',
            description: 'Allows you to see whether or not a user is on the blacklist.',
            usage: 'checkid',
            example: ['checkid <@user/id>'],
            aliases: ['checkuser']
        });
    }

    async run(client, message, args) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (!member) return message.channel.send("Please specify a correct ID or mention correctly.");
        try {
            client.bdd.query("SELECT * FROM user_blacklist WHERE user_id = ?", [member.id], function (err, result) {
                if (err) throw err;
                if (result.length !== 0) {
                    message.channel.send(`The user with the ID **${member.id}** has been blacklisted for the following reason: **${result[0].reason}**`);
                } else
                    message.channel.send(`The user with the ID number **${member.id}** is not in our blacklist!`);
            })
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new CheckID;