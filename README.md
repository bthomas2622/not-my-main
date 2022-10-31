## freeBrunch's Discord Bot

A simply fun [Discord](https://discord.com/) bot for your Discord server.

### Bot Commands
- `/help` -> List bot commands
- `/apexNotMyMain` -> "Not My Main", generates a random Apex Legends champion
- `/coinflip` -> Flip a coin
- `/d6` -> Roll a d6
- `/d20` -> Roll a d20

### Dev

**Core Docs**
- https://discordjs.guide/

**Prerequisites**
1. [Create your bot](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) and [invite to your discord server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links) (this bot will be what is running "freeBrunch-discord-bot", will be source of tokens, clientids, etc.)

**Self Host** (to use [GitHub Actions](https://github.com/bthomas2622/freeBrunch-discord-bot/blob/main/.github/workflows) in this repo)

2. Obtain dedicated self hosted server. In my case a [Raspberry Pi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/).
3. [Setup SSH auth](https://pimylifeup.com/raspberry-pi-ssh-keys/) to self hosted server and [ensure server is accessable via internet](https://jimsparkle.medium.com/raspberry-pi-dummy-tutorial-on-port-forwarding-and-ssh-to-pi-remotely-d4fbc2ed3bdf).
4. `git clone` [freeBrunch-discord-bot](https://github.com/bthomas2622/freeBrunch-discord-bot) to home directory (or directory you will cd into in [.github/workflows/deploy-bot.yml](https://github.com/bthomas2622/freeBrunch-discord-bot/blob/main/.github/workflows/deploy_bot.yml#L24)).
5. `cd` to directory and run:
  - `npm install`
  - `npm install pm2@latest -g`
  - `pm2 start index.js --name freeBrunch-bot` (or chosen name you will specify in [.github/workflows/deploy.bot.yml](https://github.com/bthomas2622/freeBrunch-discord-bot/blob/main/.github/workflows/deploy_bot.yml#L27))

Now the self hosted server is ready for the `deploy-bot.yml` github action to pull latest changes and restart the bot.

**Cloud Host**
  
 2. [Google](https://www.google.com/search?q=where+to+cloud+host+discord+bot)


