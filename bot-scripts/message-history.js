import emojiList from "../bot-utils/emojiList.js";

/**
 * Method that returns server messages since given time
 * @param {Object} client discord client
 * @param {Date} snowflakeTime snowflake time of one month ago
 * @returns {Promise<Array>} total number of messages
 */
async function fetchMessageHistory(client, snowflakeTime) {
  const messagesArray = [];

  try {
    const channels = Array.from(client.channels.cache.values());

    for (const channel of channels) {
      if (channel.isTextBased()) {
        try {
          const channelMessages = await channel.messages.fetch({ after: snowflakeTime });

          for (const message of channelMessages.values()) {
            messagesArray.push(message);
          }
        } catch (error) {
          console.error(`Error fetching messages for channel ${channel.name}`);
          console.error(error);
        }
      }
    }
  } catch (error) {
    console.error(error);
    return [];
  }
  return messagesArray;
}

/**
 * Method that processes the message history and creates string summary to post to server
 * @param {Array} messagesArray list of message objects
 * @returns {Promise<string>} string summary of message history
 */
function processMessageHistory(messagesArray) {
  try {
    let messageCount = 0;
    let emojiCount = 0;
    const authorList = [];
    let topAuthor = "";

    for (const message of messagesArray) {
      messageCount++;
      authorList.push(message.author.username);
      emojiCount += message.reactions.cache.size;
    }

    topAuthor = authorList.sort((a, b) => authorList.filter(v => v === a).length - authorList.filter(v => v === b).length).pop();

    const emojisForMessage = emojiList();

    // name of the previous month
    const date = new Date();

    date.setMonth(date.getMonth() - 1);
    const prevMonthName = date.toLocaleString("default", { month: "long" }).toUpperCase();
    const prevMonthYear = date.getFullYear();

    let messageHistoryFormatted = `${emojisForMessage[Math.floor(Math.random() * emojisForMessage.length)]} ${emojisForMessage[Math.floor(Math.random() * emojisForMessage.length)]} ${emojisForMessage[Math.floor(Math.random() * emojisForMessage.length)]}  **AWOKEN ${prevMonthName} ${prevMonthYear} STATS**  ${emojisForMessage[Math.floor(Math.random() * emojisForMessage.length)]} ${emojisForMessage[Math.floor(Math.random() * emojisForMessage.length)]} ${emojisForMessage[Math.floor(Math.random() * emojisForMessage.length)]}\n`;

    messageHistoryFormatted += `> Message Count: **${messageCount}**\n`;
    messageHistoryFormatted += `> Emoji Reacts: **${emojiCount}**\n`;
    messageHistoryFormatted += `> Top Poster: **${topAuthor}**\n`;

    return messageHistoryFormatted;
  } catch (error) {
    console.error("Error processing message history");
    console.error(error);
    return null;
  }
}

export { fetchMessageHistory, processMessageHistory };
