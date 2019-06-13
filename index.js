const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./db.json')
const db = low(adapter)

db.defaults({
    staffs: [],
    blacklist_users: [],
}).write()

const config = require("./config.json");
client.config = config;

var now = new Date();
var hour = now.getHours();
var minute = now.getMinutes();
var second = now.getSeconds();
var times = (`[${hour}:${minute}:${second}]/`);

client.on('ready', () => {
    console.log(times + `\x1b[33m%s\x1b[0m`, '[WARN]', '\x1b[0m', 'Connexion en cours...');
    console.log(times + `\x1b[33m%s\x1b[0m`, '[WARN]', '\x1b[0m', 'Connexion à l\'API Discord.js en cours...');
    console.log(times + `\x1b[32m%s\x1b[0m`, '[OK]', '\x1b[0m', 'Connexion à l\'API Discord.js effectuée');
    console.log(times + `\x1b[36m%s\x1b[0m`, '[INFO]', '\x1b[0m', 'Connecté sur ' + client.user.username + '#' + client.user.discriminator);
    console.log(times + `\x1b[32m%s\x1b[0m`, '[OK]', '\x1b[0m', 'Chargement terminé');
    console.log(times + `\x1b[32m%s\x1b[0m`, '[OK]', '\x1b[0m', 'Prêt et connecté');
});

client.login(config.token);

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Discord.Collection();

// Recherche de toutes les commandes

fs.readdir("./commands/", (err, content) => {
    if (err) console.log(err);
    if (content.length < 1) return console.log('Veuillez créer des dossiers dans le dossier commands !');
    var groups = [];
    content.forEach(element => {
        if (!element.includes('.')) groups.push(element); // Si c'est un dossier
    });
    groups.forEach(folder => {
        fs.readdir("./commands/" + folder, (e, files) => {
            let js_files = files.filter(f => f.split(".").pop() === "js");
            if (js_files.length < 1) return console.log('Veuillez créer des fichiers dans le dossier "' + folder + '" !');
            if (e) console.log(e);
            js_files.forEach(element => {
                let props = require('./commands/' + folder + '/' + element);
                client.commands.set(element.split('.')[0], props);
            });
        });
    });
});

client.on("guildMemberAdd", member => {
    if (!db.get("blacklist_users").find({ user_id: member.id }).value()) {
        return;
    } else {
        member.ban();
        member.send("**Vous êtes blacklist du bot.**")
    }
})

client.on('message', message => {
    let member = message.author;
    if(!db.get("blacklist_users").find({ user_id: member.id }).value()) {
        return;
    }else {
        member.ban();
        member.send("**Vous êtes blacklist du bot.**")
    }
});
