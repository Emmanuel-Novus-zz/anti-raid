'use strict';

module.exports = (client, message) => {
    if (message.author.bot || !message.channel.guild) {
        return ;
    }

    let author = message.author;
    try {
        client.bdd.query("SELECT * FROM user_blacklist WHERE user_id = ?", [author.id], function (err, result) {
            if (err) throw err;
            if (result.length !== 0) {
                message.author.send(`You've been banned from the server **${message.guild.name}** because you've been blacklisted by our robot for the following reason: **${result[0].reason}** !`)
                message.guild.members.cache.get(message.author.id).ban({ reason: `Automatic anti-raid system | Reason for blacklist : ${result[0].reason}` })
                    .then(console.log)
                    .catch(console.error);
            }
        });

    } catch (err) {
        console.log(err)
    }

    const data = message.content;

    const args = data.slice(client.prefix.length).trim().split(/ +/g);


    if (!data.startsWith(client.prefix)) {
        return;
    }

    const command = client.commands.find(cmd => cmd.aliases.includes(args[0])) || client.commands.get(args[0]);
    if (!command) {
        return ;
    }
    if(command.perms !== 'everyone') {
        if(!message.member.permission.has(command.perms)) {
            return message.channel.send('You don\'t have required permission to use that command!')
        }
    }

    try {
        command.run(client, message, args)
    } catch (err) {
        client.emit('error',err);
    }
};