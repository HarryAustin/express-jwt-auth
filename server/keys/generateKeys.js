const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const generateKeyPairs = () => {
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  const pubKey = keyPair.publicKey;
  const pathForPub = path.join(__dirname, "rsa_pub_key.pem");
  const privKey = keyPair.privateKey;
  const pathForPriv = path.join(__dirname, "rsa_priv_key.pem");

  // Create files to keep the keys
  fs.writeFile(pathForPub, pubKey, (err) => {
    if (err) return err;
  });
  fs.writeFile(pathForPriv, privKey, (err) => {
    if (err) return err;
  });
};

generateKeyPairs();
