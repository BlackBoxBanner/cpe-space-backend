import forge from "node-forge";
import { privateKey } from "@/utils/decryption/generate";

type AesKeyPair = {
  key: string;
  iv: string;
};

type EncryptedDataWithKey = {
  encryptedData: string;
  aesKeyEncrypted: string;
};

export const decrypt = <T = unknown>(rawData: string) => {
  try {
    const data = JSON.parse(
      forge.util.decode64(rawData),
    ) as EncryptedDataWithKey;

    const aesKeyPair = decryptAesKeyPair(data.aesKeyEncrypted);

    const encryptedData = decryptData<T>(
      forge.util.decode64(data.encryptedData),
      aesKeyPair,
    );
    return encryptedData;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to decrypt data");
  }
};

type DecryptAesKeyPair = (encryptedAesKey: string) => AesKeyPair;

const decryptAesKeyPair: DecryptAesKeyPair = (encryptedAesKey) => {
  const aesKeyPair = JSON.parse(
    privateKey.decrypt(forge.util.decode64(encryptedAesKey), "RSA-OAEP"),
  ) as AesKeyPair;

  return {
    key: forge.util.decode64(aesKeyPair.key),
    iv: forge.util.decode64(aesKeyPair.iv),
  };
};

function decryptData<T>(encryptedData: string, aesKeyPair: AesKeyPair): T {
  const { key, iv: ivWithTag } = aesKeyPair;

  const iv = forge.util.createBuffer(
    forge.util.hexToBytes(ivWithTag.slice(32)),
  );
  const tag = forge.util.createBuffer(
    forge.util.hexToBytes(ivWithTag.slice(0, 32)),
  );

  const decipher = forge.cipher.createDecipher("AES-GCM", key);
  decipher.start({ iv, tag, tagLength: 128 });
  decipher.update(
    forge.util.createBuffer(forge.util.hexToBytes(encryptedData)),
  );
  decipher.finish();

  try {
    return JSON.parse(decipher.output.toString()) as T;
  } catch (error) {
    return decipher.output.toString() as T;
  }
}
