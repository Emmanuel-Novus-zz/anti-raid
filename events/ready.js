'use strict';

const {blue} = require('colors');

module.exports = (client) => {

    console.log(`Logged in as ${blue(`${client.user.tag}`)}`);
};