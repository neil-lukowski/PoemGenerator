/**
 * This file contains a BDD test suite for the makePoem.js file. Each function
 * is tested with all possible scenarios. Code completed in accordance with
 * the guidelines for project 3 in CS253.
 * 
 * @author James Nelson & Neil Lukowski
 * 
 * @version 5/1/2020
 */

var expect = require("chai").expect;
var mp = require("../makePoem.js");

/**
 * Test suite for the makePoem.js file.
 */
describe("Tests of the makePoem file", function() {
  //Variable representing probability value for nextWord and firstWord
  var probability = null;

    //Variable representing the object created from the generateWordFrequency
    //function. Passed to simulate proper word frequency.
    var wordFreq = null;

    //String value representing the previous word in the poem. Used by makePoem
    //and passed to nextWord.
    var prevWord = null;
    
    //Variable representing the object created by the generateFollowFrequency
    //function. Passed to appropriate functions to simulate follow frequency.
    var followFreq = null;

    //Number value representing the amount of stanzas in the poem.
    var stanzas = null;

    //Number value representing the amount of lines per stanza.
    var lines = null;

    //Number value representing the amount of words per poem line.
    var words = null;

    //Array of values between 0 and 1 representing the predetermined
    //probabilities for each word in the poem. Used by makePoem.
    var probArr = null;

    //Variable representing null value to be passed to simulate random probability.
    var randomProb = null;

    //Variable representing the object passed from generateWordFrequency 
    //function to random function tests. 'amber' represents random value.
    var randomWordFreq = null;

    //Variable representing the object created from followWordFrequency and
    //passed to the random function tests. 'amber' simulates random value.
    var randomFollowFreq = null;

    //Variable which is a string representing the file for use by the main 
    //function tests.
    var file = null;

    //Variable which is a string representing a missing file for use by the
    //main function tests.
    var missingFile = null;

    //Variable that is an empty string representing an empty file for use by
    //the main function tests.
    var emptyFile = null;

    //Variable that is a string value of a number. Used by the main function
    //tests.
    var stringStanza = null;

    //Variable that is a string value of a number. Used by the main function
    //tests.
    var stringLine = null;

    //Variable that is a string value of a number. Used by the main function
    //tests.
    var stringWord = null;

    //Variable that is a string representing the probability array passed to
    //the main function for testing.
    var stringProb = null;

    //Variable representing the showStruc value for the main function. True
    //value shows function outputs from the wordCount.js file.
    var strucTrue = null;

    //Variable representing the showStruc value for the main function. False
    //value does not show function outputs from the wordCount.js file.
    var strucFalse = null;

    /**
     * Initializes values before any of the tests begin.
     */
    before(function() {
        probability = .2;
        wordFreq = {"red":0.5,"blue":0.33,"green":0.16};
        prevWord = "red";
        followFreq = {"red":[{"blue":0.33,"red":0.33,"green":0.33}],
                      "blue":[{"red":0.5,"blue":0.5}],"green":[{"red":1}]};
        stanzas = 1;
        lines = 2;
        words = 3;
        randomProb = "null";
        randomWordFreq = {"amber":.2,"red":0.5,"blue":0.33,"green":0.16};
        randomFollowFreq = {"amber":[{"amber":1}],"red":[{"amber":.2,"blue":0.33,
         "red":0.33, "green":0.33}],"blue":[{"red":0.5,"blue":0.5}],"green":[{"red":1}]};
        file = "red blue red green blue blue";
        missingFile = "unfound";
        emptyFile = "";
        stringStanza = "1";
        stringLine = "2";
        stringWord = "3";
        stringProb = "[0.8, 0.2, 0.8, 0.6, 0.2, 0.2]";
        strucTrue = "true";
        strucFalse = "false";
    });

    /**
     * Initializes values before each test.
     */
    beforeEach(function() {
        probArr = [0.6, 0.2, 0.8, 0.9, 0.4, 0.4];
    });

    /**
     * Resets values after each test.
     */
    afterEach(function() {
        probArr = null;
    });
    

    /**
     * Resets values after all tests have been completed.
     */
    after(function() {
        probability = null;
        wordFreq = null;
        prevWord = null;
        followFreq = null;
        stanzas = null;
        lines = null;
        words = null;
        randomProb = null;
        randomWordFreq = null;
        randomFollowFreq = null;
        file = null;
        emptyFile = null;
        stringStanza = null;
        stringLine = null;
        stringWord = null;
        stringProb = null;
        strucTrue = null;
        strucFalse = null;
    });

    /**
     * Unit test that tests the capabilities of the firstWord function.
     * firstWord function should return 'blue' as String due to the given
     * parameter values.
     */
    it("firstWord function should return 'blue'", function() {
        var firstWordTest = mp.firstWord(wordFreq, probability);
        expect(firstWordTest).to.equal("blue");
    });

    /**
     * Unit test that tests the capabilities of the nextWord function.
     * nextWord function should return 'blue' as String due to the given
     * parameter values.
     */
    it("nextWord function should return 'blue'", function() {
        var nextWordTest = mp.nextWord(prevWord, followFreq, probability);
        expect(nextWordTest).to.equal("blue");
    });

    /**
     * Unit test that tests the capabilities of the makePoem function.
     * makePoem function should return a specific poem each time, as
     * a non-null probability array has been passed as a parameter.
     */
    it("makePoem function should return poem with six values", function() {
        var poemTest = mp.makePoem(wordFreq, followFreq, stanzas, lines, words, probArr);
        expect(poemTest).to.equal("red blue red\n red green red\n\n\n");
    });

    /**
     * Unit test that tests the random capabilities of the firstWord function.
     * The code for the firstWord function has been changed such that if a null
     * value is passed for the probability, probability will default to .2. As
     * a result, output of 'amber' is certain.
     */
    it("firstWord function with random probability should return 'amber'", function() {
        var firstWordTest = mp.firstWord(randomWordFreq, randomProb);
        expect(firstWordTest).to.equal("amber");
    });

    /**
     * Unit test that tests the random capabilities of the nextWord function.
     * The code for the firstWord function has been changed such that if a null
     * value is passed for the probability, probability will default to .2. As
     * a result, output of 'amber' is certain.
     */
    it("nextWord function with random probability should return 'amber'", function() {
        var nextWordTest = mp.nextWord(prevWord, randomFollowFreq, randomProb);
        expect(nextWordTest).to.equal("amber");
    });

    /**
     * Unit test that tests the random capabilities of the makePoem function.
     * The code for the firstWord function has been changed such that if a null
     * value is passed for the probability, probability will default to .2. As
     * a result, output of six 'amber' values is certain.
     */
    it("makePoem function with random probability should return six 'amber' values", function() {
        var poemTestRandom = mp.makePoem(randomWordFreq, randomFollowFreq, stanzas, lines, words, randomProb);
        expect(poemTestRandom).to.equal("amber amber amber\n amber amber amber\n\n\n");
    });

    /**
     * Unit test that tests the the main function with no arguments. Output should
     * always be 'Error: No Arguments'.
     */
    it("main function with no command arguments should return error", function() {
        var mainTest = mp.main();
        expect(mainTest).to.equal("Error: No Arguments");
    });

    /**
     * Unit test that tests the the main function with a non-existent file. 
     * Output should always be 'Error: File not Found'.
     */
    it("main function with missing file should return error", function() {
        var mainTest = mp.main(missingFile, stringStanza, stringLine, stringWord, stringProb, strucFalse);
        expect(mainTest).to.equal("Error: File not Found");
    });

    /**
     * Unit test that tests the the main function with an empty file. 
     * Output should always be 'Error: File not Found'.
     */
    it("main function with empty file should return error", function() {
        var mainTest = mp.main(emptyFile, stringStanza, stringLine, stringWord, stringProb, strucFalse);
        expect(mainTest).to.equal("Error: Invalid File");
    });

    /**
     * Unit test that tests the main function with valid parameters and
     * strucTrue. The output should include 'Shown!' followed by the
     * given poem starting on the next line.
     */
    it("main function with valid input and strucTrue should return valid output", function() {
        var mainTest = mp.main(file, stringStanza, stringLine, stringWord, stringProb, strucTrue);
        expect(mainTest).to.equal("Shown!\nred blue red\n green blue blue\n\n\n");
    });

    /**
     * Unit test that tests the main function with valid parameters and
     * strucFalse. The output should oly include the given poem.
     */
    it("main function with valid input and strucFalse should return valid output", function() {
        var mainTest = mp.main(file, stringStanza, stringLine, stringWord, stringProb, strucFalse);
        expect(mainTest).to.equal("red blue red\n green blue blue\n\n\n");
    });

    /**
     * Unit test that tests the random capabilities of the main function.
     * Output should return six 'blue' values. This is because of the way
     * the firstWord function was adapted to account for randomized
     * probability values.
     */
    it("main function with valid input and randomProb should return valid output", function() {
        var mainTest = mp.main(file, stringStanza, stringLine, stringWord, randomProb, strucFalse);
        expect(mainTest).to.equal("blue blue blue\n blue blue blue\n\n\n");
    });

});

