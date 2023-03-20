const crypto = require('crypto');

function mineAdventCoin(secretKey) {
  let number = 1;
  while (true) {
    const input = secretKey + number.toString();
    const hash = crypto.createHash('md5').update(input).digest('hex');
    if (hash.slice(0, 6) === '000000') {
      return number;
    }
    number++;
  }
}

const secretKey = 'iwrupvqb';
const adventCoin = mineAdventCoin(secretKey);
console.log(adventCoin);
