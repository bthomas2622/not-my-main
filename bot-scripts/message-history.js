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
      const channelMessages = await channel.messages.fetch({ after: snowflakeTime });

      for (const message of channelMessages.values()) {
        messagesArray.push(message);
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

    return `Total messages: ${messageCount}\nTotal emojis: ${emojiCount}\nTop author: ${topAuthor}`;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { fetchMessageHistory, processMessageHistory };
