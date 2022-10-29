## freeBrunch's Discord Bot

A fun [Discord](https://discord.com/) Bot for Discord server with friends.

**Resources used:**
- https://discordjs.guide/

**Prerequisites**
1. Obtain dedicated self hosted server. In my case a [Raspberry Pi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/)
2. [Setup SSH auth](https://pimylifeup.com/raspberry-pi-ssh-keys/) to server and [ensure server is accessable via internet](https://jimsparkle.medium.com/raspberry-pi-dummy-tutorial-on-port-forwarding-and-ssh-to-pi-remotely-d4fbc2ed3bdf)
3. `git clone` [freeBrunch-discord-bot](https://github.com/bthomas2622/freeBrunch-discord-bot) to home directory (or directory specified in .github/workflows/deploy-bot.yml)
4. `cd` to directory and run:
  - `export DISCORD_TOKEN=discord_app_token123`
  - `npm install`
  - `npm install pm2@latest -g`
  - `pm2 start index.js --name freeBrunch-bot` (or name specified in .github/workflows/deploy.bot.yml)


**Commands**
- `/commands` -> List bot commands
- `/nmm` -> "Not My Main", generates a random Apex Legends champion
- `/coinflip` -> Flip a coin
- `/d6` -> Roll a d6
- `/d20` -> Roll a d20

