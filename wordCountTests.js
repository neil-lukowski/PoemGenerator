/**
 * This file contains a BDD test suite for the wordCount.js file. Each function
 * is tested with all possible scenarios. Code completed in accordance with
 * the guidelines for project 3 in CS253.
 * 
 * @author James Nelson & Neil Lukowski
 *
 * @version 5/1/2020
 */

var expect = require('chai').expect;
var wc = require('../wordCount.js');

/**
* Test suite for the wordCount.js file.
*/
describe('Test of wordCount file', function () {
   //Variable representing a plain text string of words
   //for testing splitIntoArray and main
   var text = null;

   //Variable representing an array of words that is created when splitIntoArray
   //makes each word in a string become an element of an array.
   var wordArr = null;

   //Variable representing the number of elements in an array for testing wordFreq. 
   var arrLength = null;

   //Variable representing an object of key valued pair where specific words are
   //the keys and the number of occurances are the values. Passed with
   //arrLength to generateWordFrequency for testing calculations
   var wordCountObj = null;

   //Variable representing an object of key valued pairs where the value
   //is another object of counted words. Used to test generateFollowFrequency
   var wordFollow = null;

   //Variable representing an object of key valued pairs where the key is a word
   //and the value is the number it occurs. Used to test valueSummer.
   var sumObj = null;

   //Variable holding a specific string to match a return value in test for main()
   //when file does not exist.
   var noFile = null;

   //Variable holding a specific string to test as parameter for main() to
   //sumulate input of invalid length.
   var inv = null;

   /**
    * Initializes values before any of the tests begin.
    */
   before(function() {
       text = "one two three";
       wordArr = ["red", "blue", "red", "green"];
       arrLength = 4;
       wordCountObj = {"red": 2, "blue": 1, "green": 1};
       wordFollow = {"red": {"blue": 1, "green": 1}, "green": {"red": 1}, "blue": {"red": 1}};
       sumObj = { "a": 1, "b": 2, "c": 3 };
       inv = "";
   });

   /**
    * Tears down values after all tests have been completed.
    */
   after(function() {
       text = null;
       wordArr = null;
       arrLength = null;
       wordCountObj = null;
       wordFollow = null;
       sumObj = null;
       noFile = null;
       inv = null;
   });

   /**
    * Unit tests for testing wordCount.js methods, functions, lines, and statements.
    */
   it("splitIntoArray function should return [one, two, three]", function() {
       var textToArr = wc.splitIntoArray(text);
       expect(textToArr).to.deep.equal(["one", "two", "three"]);
   });

   it("countWords function should return {red: 2, blue: 1, green: 1}", function() {
       var wordCount = wc.countWords(wordArr);
       expect(wordCount).to.deep.equal({"red":2, "blue":1, "green":1});
   });

   it("generateWordFrequency function should return {red: .5, blue: .25, green: .25}", function() {
       var wordFreq = wc.generateWordFrequency(wordCountObj, arrLength);
       expect(wordFreq).to.deep.equal({"red": .5, "blue": .25, "green": .25});
   });

   it("valueSummer function should return 6", function() {
       var sum = wc.valueSummer(sumObj);
       expect(sum).to.equal(6);
   });

   it("countFollowWords function should return valid output", function() {
       var followWords = wc.countFollowWords(wordArr);
       expect(followWords).to.deep.equal({"red": {"blue": 1, "green": 1}, "green": {"red": 1}, "blue": {"red": 1}});
   });

   it("generateFollowFrequency function should return valid output", function() {
       var followFreq = wc.generateFollowFrequency(wordFollow);
       expect(followFreq).to.deep.equal({"red": [{"blue": .5, "green": .5}], "green": [{"red": 1}], "blue": [{"red": 1}]});
   });

   it("Testing main without file, should return expected error", function() {
       var mn = wc.main();
       expect(mn).to.be.equal("unfound");
   });

   it("Testing main with invalid input of empty file, should return expected error", function() {
       var mn = wc.main(inv);
       expect(mn).to.be.equal("invalid");
   });

   it("Testing main with valid text input, expecting passed value to be returned", function() {
       var mn = wc.main(text);
       expect(mn).to.be.equal(text);
   });
});

