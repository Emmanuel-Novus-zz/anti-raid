const Discord = require('discord.js');

exports.run = (client, message, args) => {
    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')
    const adapter = new FileSync('./db.json')
    const db = low(adapter)
    var founder = [
        "AJOUTEZ VOTRE ID"
    ]
    if (founder.includes(message.author.id)) {
        const member = message.mentions.members.first();
        if (!member) return message.channel.send("**:x: | Merci de mentionner un utilisateur.**")
        if (!db.get("staffs").find({ user_id: member.id }).value()) {
            message.channel.send("**:x: | L'utilisateur <@" + member.id + "> ne fait pas partie du staff.**")
        } else {
            db.get("staffs").remove({ user_id: member.id }).write()
            message.channel.send("**:white_check_mark: L'utilisateur <@" + member.id + "> est retiré du staff.**")
        }
    } else {
        message.channel.send("**:x: | Vous ne disposez pas des permissions nécessaires.**")
    }
}
