import forge from 'node-forge';

export const generateAesKey = () => {
  const aesSalt = forge.random.getBytesSync(16);
  const keyPassPhrase = forge.random.getBytesSync(16);
  const aesKey = forge.pkcs5.pbkdf2(keyPassPhrase, aesSalt, 32, 32);
  return aesKey;
};
