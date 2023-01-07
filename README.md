# freeBrunch's Discord Bot

A simply fun [Discord](https://discord.com/) bot for your Discord server.

### Bot Commands
- `/help` -> List bot commands
- `/apex-not-my-main` -> "Not My Main", generates a random Apex Legends champion
- `/pick-one`-> Input a comma separated list of options and pick one randomly
- `/coin-flip` -> Flip a coin
- `/d6` -> Roll a d6
- `/d20` -> Roll a d20
- `/d-num` -> Roll a die with input number of sides
- `/get-rankings` -> Get various game rankings of server members

### Bot Scheduled Messages
- Post weekly free Epic Games Store games every Thursday to `#general` channel

# Setup Guide

### **Resources**

NPM Packages:
- [discordjs](https://discordjs.guide/)
- [LowDB local JSON database](https://www.npmjs.com/package/lowdb)

APIs:
- [Apex Legends API](https://apexlegendsapi.com/)
- [Riot Games API](https://developer.riotgames.com/)


### **Prerequisites**
1. [Create your bot](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) and [invite to your discord server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links) (this bot will be what is running "freeBrunch-discord-bot", will be source of tokens, clientids, etc.)

### **Self Host** 

Deployment and bot slash command update automated through [GitHub Actions](https://github.com/bthomas2622/freeBrunch-discord-bot/blob/main/.github/workflows) stored in this repo for Prod/Dev Discord servers.

2. Obtain dedicated self hosted server. In my case a [Raspberry Pi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/).
3. [Setup SSH auth](https://pimylifeup.com/raspberry-pi-ssh-keys/) to self hosted server and [ensure server is accessable via internet](https://jimsparkle.medium.com/raspberry-pi-dummy-tutorial-on-port-forwarding-and-ssh-to-pi-remotely-d4fbc2ed3bdf).
4. `git clone` [freeBrunch-discord-bot](https://github.com/bthomas2622/freeBrunch-discord-bot) to home directory (or directory you will cd into in [.github/workflows/deploy-bot.yml](https://github.com/bthomas2622/freeBrunch-discord-bot/blob/main/.github/workflows/deploy_bot.yml#L39)).
5. `cd` to directory and run:
  - `npm install`
  - `npm install pm2@latest -g`
  - `pm2 start index.js --name freeBrunch-bot` (or chosen name you will specify in [.github/workflows/deploy.bot.yml](https://github.com/bthomas2622/freeBrunch-discord-bot/blob/main/.github/workflows/deploy_bot.yml#L42))

Now the self hosted server is ready for the `deploy-bot.yml` github action to pull latest changes and restart the bot.

### **Cloud Host**
  
 2. [Many options](https://www.google.com/search?q=where+to+cloud+host+discord+bot)


