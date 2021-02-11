# Anti-Raid
The latest version of my Anti-Raid discord bot with new features, new structures and all the latest news.
Here are the features contained in this version:

- Installation of a new command handler developed by ArviX#8843 [epic handler]([https://github.com/LordAlex2015/handler-discord.js)
- Changing the database service (lowdb => MySQL)
- Added the possibility to specify a reason when blacklisting
- Added blacklist reason when banning on different servers
- When the blacklisted user joins or sends a message to the server where the bot is present, it is automatically banned if the bot has permission.

## » Requirements :

 - Git
 - Node
 - MySQL
 - NPM / Yarn (Yarn recommended)

## » Downloading :

Clone the repo using command ` git clone https://github.com/Emmanuel-Novus/anti-raid.zip ` or download the .rar with https://github.com/Emmanuel-Novus/anti-raid/archive/master.zip

## » Setup :

Open the config.json file and replace fields by your values. Install nessesary package with the command `npm install` in the bot root folder.
Indicate your database accesses in the main.js file (and import db.sql into it)

## » Start :

To start the bot and get it running, run this command `node index.js` inside the bot root folder. 

## » Contributors

- Emmanuel (Global development of the new version)
- Matthieu (Optimization)
- ArviX (Handler)
