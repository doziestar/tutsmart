const { randomBytes } = require('crypto');

const uid = Math.random().toString(36).slice(2) + randomBytes(8).toString('hex') + new Date().getTime();
console.log(uid);

// get random 8 numbers from uid output
const random = uid.substring(2, 10);
console.log(random);
