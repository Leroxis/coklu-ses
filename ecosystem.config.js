const bots = require('./config.js');

module.exports = {
  apps: bots.map((bot, index) => ({
    name: `bot${index + 1}`,
    script: './Lerox.js',
    env: {
      BOT_INDEX: index
    }
  }))
};
