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
            db.get("staffs").push({ user_id: member.id }).write()
            message.channel.send("**:white_check_mark: L'utilisateur <@" + member.id + "> est désormais ajouté en tant que staff.**")
        } else {
            message.channel.send("**:x: | L'utilisateur <@" + member.id + "> est déja staff.**")
        }
    } else {
        message.channel.send("**:x: | Vous ne disposez pas des permissions nécessaires.**")
    }
}
