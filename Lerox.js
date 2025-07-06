const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const config = require('./config.js');

const index = process.env.BOT_INDEX;

if (index === undefined || !config[index]) {
  console.error("Geçerli bir BOT_INDEX girilmedi!");
  process.exit(1);
}

const { token, voiceChannel } = config[index];

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

const statusMessages = [
  "Coded By Lerox",
  "Coded By Lerox",
  "Coded By Lerox",
  "Powered By Lerox",
  "Powered By Lerox",
  "Powered By Lerox"
];

client.once('ready', async () => {
  console.log(`${client.user.tag} olarak giriş yapıldı.`);

  const randomStatus = statusMessages[Math.floor(Math.random() * statusMessages.length)];

  client.user.setPresence({
    status: "dnd",
    activities: [{
      name: randomStatus,
      type: ActivityType.Custom
    }]
  });

  const channel = await client.channels.fetch(voiceChannel).catch(console.error);
  if (!channel || channel.type !== 2) {
    console.error("Geçerli bir ses kanalı bulunamadı!");
    return;
  }

  try {
    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: true,
      selfMute: false
    });
    console.log("Kanala başarıyla giriş yapıldı!");
  } catch (err) {
    console.error("Kanala girilemedi:", err);
  }
});

client.login(token);