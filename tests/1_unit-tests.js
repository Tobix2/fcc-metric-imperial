const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  test('convertHandler should correctly read a whole number input', function () {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  test('convertHandler should correctly read a decimal number input', function () {
    assert.equal(convertHandler.getNum('3.1mi'), 3.1);
  });

  test('convertHandler should correctly read a fractional input', function () {
    assert.equal(convertHandler.getNum('1/2km'), 0.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function () {
    assert.approximately(convertHandler.getNum('5.4/3lbs'), 1.8, 0.01);
  });

  test('convertHandler should correctly return an error on a double-fraction (3/2/3)', function () {
    assert.isUndefined(convertHandler.getNum('3/2/3kg'));
  });

  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  test('convertHandler should correctly read each valid input unit', function () {
    const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    units.forEach(unit => {
      assert.equal(convertHandler.getUnit('10' + unit), unit.toLowerCase() === 'l' ? 'L' : unit.toLowerCase());
    });
  });

  test('convertHandler should correctly return an error for an invalid input unit', function () {
    assert.isUndefined(convertHandler.getUnit('3g'));
  });

  test('convertHandler should return the correct return unit for each valid input unit', function () {
    const inputUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const returnUnits = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
    inputUnits.forEach((unit, i) => {
      assert.equal(convertHandler.getReturnUnit(unit), returnUnits[i]);
    });
  });

  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
    const unitNames = {
      gal: 'gallons',
      l: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    Object.keys(unitNames).forEach(unit => {
      assert.equal(convertHandler.spellOutUnit(unit), unitNames[unit]);
    });
  });

  test('convertHandler should correctly convert gal to L', function () {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
  });

  test('convertHandler should correctly convert L to gal', function () {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
  });

  test('convertHandler should correctly convert mi to km', function () {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
  });

  test('convertHandler should correctly convert km to mi', function () {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
  });

  test('convertHandler should correctly convert lbs to kg', function () {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.1);
  });

  test('convertHandler should correctly convert kg to lbs', function () {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
  });
});
