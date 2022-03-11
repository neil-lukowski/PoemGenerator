/**
 * Reads text from input file and outputs different pieces of information about
 * the file contents. This code was completed in accordance with the standards
 * of project 1 in CS253.
 *
 * @author James Nelson & Neil Lukowski
 *
 * @version 5/1/2020
 */

/**
 * Function to call, run, and format the output of each method in the program.
 * Also reads the .txt file and turns it into an array.
 *
 * @param {String} param - String value simulating file that has been passed to
 * the main function. Used for testing purposes.
 * 
 * @returns {String} param - String value simulating file that has been passed
 * to the main function.
 * @returns {String} error - String value simulating error message. For use
 * by the tester.
 */
function main (param) {
  var error = "";
  try {
    var fs = require('fs');
    // var file = process.argv[2];
    var file = param;
    if (param === undefined) {
      throw new Error();
    }
    // var parsedFile = fs.readFileSync(file, "utf-8");
    var parsedFile = file;
  } 
  catch (err) {
    // console.log("ERROR: File not found");
    // process.exit();
    error = 'unfound';
    return error;
  }
  try {
    // Create an array of each word from the parsed input
    var arrOfWords = splitIntoArray(parsedFile);
    if (arrOfWords.length == 1) { 
        throw new Error();
      }
  } 
  catch (err) {
    // console.log("ERROR: Valid input not detected");
    // console.exit();
    error = 'invalid';
    return error;
  }
  // Count the words in the array
  wordCount = countWords(arrOfWords);
  // console.log("\nWord Count is:" + "\n", JSON.stringify(wordCount));

  // Creates an object of word with frequency of use
  wordFrequency = generateWordFrequency(wordCount, arrOfWords.length);
  // console.log("\nWord Frequency is:" + "\n", JSON.stringify(wordFrequency));

  // Counts the amount of time each word is followed by another certain word
  followWordCounts = countFollowWords(arrOfWords);
  // console.log("\nFollow Word Count is:" + "\n", followWordCounts);

  // Determines each word's probability of being followed by a certain word
  followWordFreq = generateFollowFrequency(followWordCounts);
  // console.log("\nFollow Word Frequency is:" + "\n",followWordFreq);

  return param;
}

/**
 * Helper function to convert text file's contents into array of strings.
 * Also removes punctuation and sets all text to lowercase.
 *
 * @param {Object} text - The parsed text file to be converted.
 *
 * @returns {Object} wordsArray - An array of strings that represent all words
 * contained within the file.
 */
function splitIntoArray (text) {
  // split string by spaces (including spaces, tabs, and newlines)
  // .replace and .split examples from
  // stackoverflow.com/questions/10346722/how-can-i-split-a-
  // javascript-string-by-white-space-or-comma
  temp = text.replace(/[.,\/#!$%\^&\*;:{}=\-_""''?~()]/g, '')
    .trim().toLowerCase();
  var wordsArray = temp.split(/\s*[\s,]\s*/);
  return wordsArray;
}

/**
 * Function to record the occurances of each word in a given array of strings.
 * If the word in question exists in the object, the count of that word will
 * increment by one, otherwise the word will be added onto the object with a
 * value of one.
 *
 * @param {Object} arrayToBeCounted - The array of words from the text file.
 *
 * @returns {Object} wordCount - An object where the keys are words and the
 * values are numbers which represent the amount of times the word appears.
 */
function countWords (arrayToBeCounted) {
  var wordCount = {};
  arrayToBeCounted.forEach(function (word) {
    if (wordCount.hasOwnProperty(word)) {
      wordCount[word]++;
    } 
    else {
      wordCount[word] = 1;
    }
  });

  return wordCount;
}

/**
 * Function to represent the frequency of a given word being found in the text
 * document. The value for frequency is a percentage. The function takes the
 * object from count words and divides each word value by the total length of
 * the original array.
 * 
 * @param {Object} arrToFindFreq - Represents the object from wordCount that has
 * each word paired with its respective value.
 * @param {number} length - The length of the original string array created from
 * the text document.
 *
 * @returns {Object} wordFrequency - An object which contains the string values
 * of each word in the wordCount Object paired with the values of each word's
 * frequency of appearance as a percent.
 */
function generateWordFrequency (arrToFindFreq, length) {
  var wordFrequency = {};
  var size = length;
  for (item in arrToFindFreq) { 
      wordFrequency[item] = arrToFindFreq[item] / size;
  }
  return wordFrequency;
}

/**
 * Function to calculate the frequency of each word being followed by each other
 * word contained within the string array. Frequency is represented as a
 * percentage. THis function implements the helper function makeNextPairs to
 * handle to pair combining process.
 *
 * @param {Object} arr - Object returned from countFollowWords function
 *
 * @returns {Object} followWordFrequency - Object representing the frequency of
 * Each word being followed by each other word. Frequency is given as a
 * percentage.
 */
function generateFollowFrequency (arr) {
  var followWordFrequency = {};
  var freqKeys = [];
  var freqVals = [];
  var newFreqVals = [];
  var freqKeys = Object.keys(arr);
  var freqVals = Object.values(arr);

  for (let i = 0; i < freqVals.length; i++) {
    const current = freqVals[i];
    const sum = valueSummer(current);
    newFreqVals.push(generateWordFrequency(current, sum));
    followWordFrequency[freqKeys[i]] = newFreqVals;
    newFreqVals = [];
  }

  return followWordFrequency
}
/**
 * Function to add all values of passed object. Used by generateFollowFrequency
 * to assure correct divisor to decide follow frequency.
 * 
 * @param {Object} sumObj - Object where values are numbers.
 * 
 * @returns {number} sum - Number value representing the total sum of all the
 * object's values.
 */
function valueSummer (sumObj) {
  var sum = 0;
  for (const item in sumObj) {
    sum += sumObj[item];
  }
  return sum;
}

/**
 * Function to create an object which represents the amount of times each word is
 * followed by each other word. The object's key is a word that appears in the
 * string array and the value is an object with the keys being the following word
 * and the values being the amount of times that word follows the primary word.
 *
 * @param {Object} arrToFindFollow - String array to be counted
 *
 * @returns {Object} followWordCounts - An object which contains each word paired
 * with an object with the key being the following word and the value being the
 * amount of times that word follows the primary word.
 */
function countFollowWords (arrToFindFollow) {
  var paired = [];
  var followWordCounts = {};
  var pairsObj = [];
  var followList = [];

  // Creates an array of only one copy of each word
  const temp = new Set(arrToFindFollow);
  var followList = Array.from(temp);

  var paired = makeNextPairs(arrToFindFollow);

  for (let i = 0; i < followList.length; i++) {
    const word = followList[i];
    for (let j = 0; j < paired.length; j++) {
      const arrNext = paired[j];
      if (arrNext[0] == word) {
        pairsObj.push(arrNext[1]);
      }
    }
    followWordCounts[word] = countWords(pairsObj);
    pairsObj = [];
  }

  return followWordCounts;
}

/**
 * Helper function to create an array of pairs for use of the
 * generateFollowFrequency function.
 *
 * @param {Object} arr - Object returned from the countFollowWords funtion.
 *
 * @returns {Object} masterArr - An array of pairs to be used by the
 * generateFollowFrequency function.
 */
function makeNextPairs (arr) {
  var masterArr = [];
  // Makes array of each word and the one following.
  // Pushes that array to master array, masterArr
  for (i = 0; i <= arr.length - 1; i++) {
    str1 = arr[i];
    str2 = arr[i + 1];
    if (!(str2 == undefined)) {
      const tempArr = [str1, str2];
      masterArr.push(tempArr);
    } 
    else {
      const tempArr = [str1, arr[0]];
      masterArr.push(tempArr);
    }
  }
  return masterArr;
}

/*
if (require.main == module) {
    main();
}
*/

exports.countWords = countWords;
exports.generateWordFrequency = generateWordFrequency;
exports.countFollowWords = countFollowWords;
exports.generateFollowFrequency = generateFollowFrequency;
exports.splitIntoArray = splitIntoArray;
exports.valueSummer = valueSummer;
exports.main = main;