import natural from "natural";

/**
 * Converts a message to an emoji based on the sentiment of the message.
 * @param {string} messageContent the content of the message
 * @returns {string} emoji
 */
function sentimentToEmoji(messageContent) {
  try {
    const messageFormatted = messageContent.toLowerCase().split(" ");
    const SentimentAnalyzer = new natural.SentimentAnalyzer("English", natural.PorterStemmer, "afinn");
    const sentiment = SentimentAnalyzer.getSentiment(messageFormatted) * messageFormatted.length;

    if (sentiment >= 4) {
      return "😍";
    }
    if (sentiment <= -4) {
      return "🤬";
    }
    if (sentiment >= 3) {
      return "😊";
    }
    if (sentiment <= -3) {
      return "😡";
    }
    if (sentiment >= 2) {
      return "😄";
    }
    if (sentiment <= -2) {
      return "😞";
    }

    return null;

  } catch (error) {
    console.error(error);
    return null;
  }
}

export default sentimentToEmoji;
