/**
 * takes in word and capitalizes the first letter only
 * @param { string } word the word you only want to capitalize the first letter of
 * @returns {string} the formatted word
 */
function capitalizeFirstLetterOnly(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export default capitalizeFirstLetterOnly;
