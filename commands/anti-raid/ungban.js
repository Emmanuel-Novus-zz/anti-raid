const Discord = require('discord.js');

exports.run = (client, message, args) => {
    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')
    const adapter = new FileSync('./db.json')
    const db = low(adapter)
    let author = message.author.id;
    if(!db.get("staffs").find({ user_id: author }).value()) {
        message.channel.send("**:x: | Vous ne disposez pas des permissions nécessaires.**")
    }else {
        let args = message.content.split(" ").slice(1);
        let id = args.join(" ")
        if(!args[0]) return message.channel.send("**:x: | Merci d'entrer un ID correcte.**")
        if(!db.get("blacklist_users").find({ user_id: id }).value()) {
            message.channel.send("**:x: L'ID " + id + " ne figure pas dans notre blacklist.**")
        }else {
            db.get("blacklist_users").remove({ user_id: id }).write()
            message.channel.send("**:white_check_mark: L'ID " + id + " a bien été retiré de la blacklist.**")
        }
    }
}
