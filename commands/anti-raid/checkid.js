const Discord = require('discord.js');

exports.run = (client, message, args) => {
    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')
    const adapter = new FileSync('./db.json')
    const db = low(adapter)
    let arg = message.content.split(" ").slice(1);
    let id = arg.join(" ")
    if (!db.get("blacklist_users").find({ user_id: id }).value()) {
        message.channel.send("**:x: L'ID " + id + " ne figure pas dans la blacklist.**")
    } else {
        const get_motif = db.get("blacklist_users").find({ user_id: id }).value()
        let motif_msg = ''
        if (!get_motif) motif_msg = ":x: Aucune raison définie."
        else {
            let motif_message = Object.values(get_motif)
            motif_msg = motif_message[1]
        }
        message.channel.send("**:white_check_mark: L'ID " + id + " est dans la blacklist pour la raison suivante : __" + motif_msg + "__ !**")
    }
}
