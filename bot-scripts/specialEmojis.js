/**
 * Returns special emojis based on matching words in message content
 * @param {string} messageContent the content of the message
 * @returns {string} emoji
 */
function specialEmojis(messageContent) {
  try {
    const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/u;
    const messageFormatted = messageContent.toLowerCase().replace(punctuationRegex, "").split(" ");

    if (messageFormatted.includes("dog")) {
      return "🐶";
    }
    if (messageFormatted.includes("cat")) {
      return "🐱";
    }
    if (messageFormatted.includes("fish")) {
      return "🍣";
    }
    if (messageFormatted.includes("love")) {
      return "❤️";
    }
    if (messageFormatted.includes("rip")) {
      return "⚰️";
    }
    if (messageFormatted.includes("dead") || messageFormatted.includes("die") || messageFormatted.includes("ded")) {
      return "☠️";
    }
    if (messageFormatted.includes("poop") || messageFormatted.includes("poo")) {
      return "💩";
    }
    if (messageFormatted.includes("fire")) {
      return "🔥";
    }
    if (messageFormatted.includes("alien")) {
      return "👽";
    }
    if (messageFormatted.includes("ghost")) {
      return "👻";
    }
    if (messageFormatted.includes("robot")) {
      return "🤖";
    }
    if (messageFormatted.includes("money") || messageFormatted.includes("cash") || messageFormatted.includes("dollar")) {
      return "💵";
    }
    if (messageFormatted.includes("kiss")) {
      return "💋";
    }
    if (messageFormatted.includes("key")) {
      return "🔑";
    }
    if (messageFormatted.includes("bomb")) {
      return "💣";
    }
    if (messageFormatted.includes("egg")) {
      return "🥚";
    }
    if (messageFormatted.includes("cake")) {
      return "🍰";
    }
    if (messageFormatted.includes("king") || messageFormatted.includes("queen")) {
      return "👑";
    }
    if (messageFormatted.includes("rain")) {
      return "☂️";
    }
    if (messageFormatted.includes("cheers")) {
      return "🍻";
    }
    if (messageFormatted.includes("dice")) {
      return "🎲";
    }
    if (messageFormatted.includes("dwarf") || messageFormatted.includes("rock") || messageFormatted.includes("stone")) {
      return "⛏";
    }
    if (messageFormatted.includes("fortnite")) {
      return "👶";
    }


    return null;

  } catch (error) {
    console.error(error);
    return null;
  }
}

export default specialEmojis;
