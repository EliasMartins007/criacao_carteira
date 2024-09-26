// Importando as dependências
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

try {
  // Definindo a rede
  const network = bitcoin.networks.testnet; // Pode ser bitcoin.networks.bitcoin para mainnet

  // Derivação de carteira HD
  const path = `m/49'/1'/0'/0`;

  // Criando o mnemonic para seed (palavras de senha)
  let mnemonic = bip39.generateMnemonic();
  const seed = bip39.mnemonicToSeedSync(mnemonic);

  // Criando raiz da carteira HD
  let root = bip32.fromSeed(seed, network);

  // Criando uma conta - par de chave privada e pública
  let account = root.derivePath(path);

  // Criando um nó a partir da raiz
  let node = account.derive(0).derive(0); 

  // Criando o endereço BTC
  let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey, 
    network: network,
  }).address;

  console.log("Carteira gerada com sucesso!!!");
  console.log("Endereço:", btcAddress);
  console.log("Chave privada:", node.toWIF());
  console.log("Seed:", mnemonic);

} catch (error) {
  console.error("Erro ao gerar a carteira:", error.message);
}
