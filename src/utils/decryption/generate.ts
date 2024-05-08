import forge from 'node-forge';

export const rsaKeyPair = forge.pki.rsa.generateKeyPair({
  bits: 2048,
  workers: 2,
});

export const publicKey = rsaKeyPair.publicKey;
export const privateKey = rsaKeyPair.privateKey;

export const publicKeyPem = forge.pki.publicKeyToPem(rsaKeyPair.publicKey);
export const privateKeyPem = forge.pki.privateKeyToPem(rsaKeyPair.privateKey);
