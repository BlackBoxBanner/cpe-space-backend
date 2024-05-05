import { generateAesKey } from '@/utils/encryption/generate';
import forge from 'node-forge';

type AesKeyPair = {
  key: string;
  iv: string;
};

type EncryptedDataWithKey = {
  encryptedData: string;
  aesKeyEncrypted: string;
};

type Encrypt = (data: unknown, publicKey: string) => string;
export const encrypt: Encrypt = (data, publicKey) => {
  const aesKey = generateAesKey();
  const encryptedData = encryptWithAes(data, aesKey);

  const aesKeyPair: AesKeyPair = {
    key: forge.util.encode64(aesKey),
    iv: encryptedData.iv,
  };

  const aesKeyEncrypted = encryptWithPublicKey(aesKeyPair, publicKey);

  const EncryptedDataWithKey: EncryptedDataWithKey = {
    encryptedData: encryptedData.encryptedData,
    aesKeyEncrypted,
  };

  return forge.util.encode64(JSON.stringify(EncryptedDataWithKey));
};

type EncryptedWithAes = (
  data: unknown,
  aesKey: AesKeyPair['key'],
) => {
  encryptedData: string;
  iv: AesKeyPair['iv'];
};

const encryptWithAes: EncryptedWithAes = (data, aesKey) => {
  const iv = forge.random.getBytesSync(16);
  const cipher = forge.cipher.createCipher('AES-GCM', aesKey);
  cipher.start({ iv: forge.util.createBuffer(iv), tagLength: 128 });
  cipher.update(forge.util.createBuffer(JSON.stringify(data)));
  cipher.finish();

  const encrypted = cipher.output;
  const tag = cipher.mode.tag;

  return {
    encryptedData: forge.util.encode64(encrypted.toHex()),
    iv: forge.util.encode64([tag.toHex(), forge.util.bytesToHex(iv)].join('')),
  };
};

type EncryptWithPublicKey = (data: AesKeyPair, publicKeyPem: string) => string;

const encryptWithPublicKey: EncryptWithPublicKey = (data, publicKeyPem) => {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encryptedAesKey = publicKey.encrypt(JSON.stringify(data), 'RSA-OAEP');
  return forge.util.encode64(encryptedAesKey);
};
