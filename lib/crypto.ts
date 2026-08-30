import CryptoJS from 'crypto-js';

const FALLBACK_SECRET = 'decaycheck-local-dev-secret-key-32chars!';

function getEncryptionKey(): string {
  return process.env.TOKEN_ENCRYPTION_KEY || FALLBACK_SECRET;
}

/**
 * Encrypts a sensitive string (e.g. OAuth refresh token) before storing in Postgres.
 */
export function encryptToken(plainText: string): string {
  if (!plainText) return plainText;
  const key = getEncryptionKey();
  return CryptoJS.AES.encrypt(plainText, key).toString();
}

/**
 * Decrypts an encrypted token retrieved from Postgres.
 */
export function decryptToken(cipherText: string): string {
  if (!cipherText) return cipherText;
  const key = getEncryptionKey();
  const bytes = CryptoJS.AES.decrypt(cipherText, key);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  if (!originalText) {
    throw new Error('Failed to decrypt token: invalid key or corrupted payload.');
  }
  return originalText;
}
