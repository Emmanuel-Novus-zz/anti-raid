'use strict';

module.exports = (client, member) => {
    try {
        client.bdd.query("SELECT * FROM user_blacklist WHERE user_id = ?", [member.id], function (err, result) {
            if (err) throw err;
            if (result.length !== 0) {
                member.send(`You've been banned from the server you tried to join because you've been blacklisted by our robot for the following reason: **${result[0].reason}** !`)
                member.ban({ reason: `Automatic anti-raid system | Reason for blacklist : ${result[0].reason}` })
                    .then(console.log)
                    .catch(console.error);
            }
        });

    } catch (err) {
        console.log(err)
    }
}