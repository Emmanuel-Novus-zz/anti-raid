const Discord = require('discord.js');

exports.run = (client, message, args) => {
    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')
    const adapter = new FileSync('./db.json')
    const db = low(adapter)
    let author = message.author.id;
    if (!db.get("staffs").find({ user_id: author }).value()) {
        message.channel.send("**:x: | Vous ne disposez pas des permissions nécessaires.**")
    } else {
        let args = message.content.split(" ").slice(1, 2);
        let id = args.join(" ")
        let args_motif = message.content.split(" ").slice(2);
        let motif = args_motif.join(" ")
        if (!args[0]) return message.channel.send("**:false: | Merci d'entrer un numéro d'identification correcte (ID).**")
        if (!db.get("blacklist_users").find({ user_id: id }).value()) {
            db.get("blacklist_users").push({ user_id: id, motif: motif }).write()
            message.channel.send("**:white_check_mark: L'ID " + id + " viens d'être blacklist pour la raison suivante : __" + motif + "__ par " + message.author.tag + " !**")
        } else {
            const get_motif = db.get("blacklist_users").find({ user_id: id }).value()
            let motif_msg = ''
            if (!get_motif) motif_msg = ":x: Aucune raison définie."
            else {
                let motif_message = Object.values(get_motif)
                motif_msg = motif_message[1]
            }
            message.channel.send("**:x: L'ID " + id + " est déja dans notre blacklist pour la raison suivante : __" + motif_msg + "__ !**")
        }
    }
}
