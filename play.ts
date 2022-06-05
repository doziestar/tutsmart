import Coinkey from 'coinkey';

const Wallet = new Coinkey.createRandom();
console.log(Wallet.privateWif);
console.log(Wallet.publicAddress);
console.log(Wallet.publicKey);
console.log(Wallet.privateKey);
console.log(Wallet.publicKey.toString('hex'));
console.log(Wallet.privateKey.toString('hex'));
console.log(Wallet.publicKey.toString('hex'));
