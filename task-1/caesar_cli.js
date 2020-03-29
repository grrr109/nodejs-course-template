const { program } = require('commander');
const { pipeline } = require('stream');
const fs = require('fs');
const through = require('through2');

program
  .storeOptionsAsProperties(false)
  .requiredOption('-s, --shift <value>', 'a shift')
  .option('-i, --input <value>', 'an input file')
  .option('-o, --output <value>', 'an output file')
  .requiredOption('-a, --action <value>', 'an action encode/decode');

program.parse(process.argv);

const shiftNumber = program._optionValues.shift % 25;

const readStream = program._optionValues.input
  ? fs.createReadStream(program._optionValues.input)
  : process.stdin;

const writeStream = program._optionValues.output
  ? fs.createWriteStream(program._optionValues.output)
  : process.stdout;

function transformStream() {
  if (program._optionValues.action === 'encode') {
    return encodeStream(shiftNumber);
  }

  if (program._optionValues.action === 'decode') {
    return decodeStream(shiftNumber);
  }

  process.stderr.write('--action should be encode or decode \n');
  throw new Error('Something bad happened!');
}

function decodeStream(shift) {
  return through.obj((chunk, enc, next) => {
    const result = [];

    chunk
      .toString()
      .split('')
      .forEach(char => {
        if (char.search(/[A-Za-z]/) !== -1) {
          const charNum = char.charCodeAt(0);

          if (charNum >= 65 && charNum <= 90) {
            if (charNum - shift < 65) {
              char = String.fromCharCode(91 + (charNum - shift - 65));
            } else {
              char = String.fromCharCode(charNum - shift);
            }

            result.push(char);
          } else if (charNum >= 97 && charNum <= 122) {
            if (charNum - shift < 97) {
              char = String.fromCharCode(123 + (charNum - shift - 97));
            } else {
              char = String.fromCharCode(charNum - shift);
            }

            result.push(char);
          } else {
            char = String.fromCharCode(charNum);
            result.push(char);
          }
        } else {
          result.push(char);
        }
      });

    next(null, result.join(''));
  });
}

function encodeStream(shift) {
  return through.obj((chunk, enc, next) => {
    const result = [];

    chunk
      .toString()
      .split('')
      .forEach(char => {
        if (char.search(/[A-Za-z]/) !== -1) {
          const charNum = char.charCodeAt(0);

          if (charNum >= 65 && charNum <= 90) {
            if (charNum + shift > 90) {
              char = String.fromCharCode(64 + (charNum + shift - 90));
            } else {
              char = String.fromCharCode(charNum + shift);
            }

            result.push(char);
          } else if (charNum >= 97 && charNum <= 122) {
            if (charNum + shift > 122) {
              char = String.fromCharCode(96 + (charNum + shift - 122));
            } else {
              char = String.fromCharCode(charNum + shift);
            }

            result.push(char);
          } else {
            char = String.fromCharCode(charNum);
            result.push(char);
          }
        } else {
          result.push(char);
        }
      });

    next(null, result.join(''));
  });
}

pipeline(readStream, transformStream(), writeStream, err => {
  if (err) {
    console.error('Pipeline failed.', err);
  } else {
    console.log('Pipeline succeeded.');
  }
});
