var expect = require('chai').expect
var mp = require('../makePoem.js')

describe('Tests of the makePoem file', function () {
  var probability = null
  var randomProb = null
  var wordFreq = null
  var prevWord = null
  var followFreq = null

  before(function () {
    probability = 0.2
    wordFreq = { red: 0.33, blue: 0.33, green: 0.33 }

    prevWord = 'red'
    followFreq = { red: [{ blue: 0.5, green: 0.5 }], blue: [{ red: 0.5, blue: 0.5 }] }
  })

  after(function () {
    probability = null
    wordFreq = null
    prevWord = null
    followFreq = null
  })

  it('Testing the firstWord function', function () {
    var wordTest = mp.firstWord(wordFreq, probability)
    expect(wordTest).to.equal('blue')
  })

  it('Testing the nextWord function', function () {
    var wordTest = mp.nextWord(prevWord, followFreq, probability)
    expect(wordTest).to.equal('blue')
  })
})
