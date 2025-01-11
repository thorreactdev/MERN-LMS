const crypto = require('crypto');

// Key and IV setup
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// Encryption function
function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encryptedData: encrypted, iv: iv.toString('hex') };
}

// Decryption function
function decrypt(encryptedData, ivHex) {
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Example usage
const text = "Hello, world!";
const { encryptedData, iv } = encrypt(text);
console.log("Encrypted:", encryptedData);

const decryptedData = decrypt(encryptedData, iv);
console.log("Decrypted:", decryptedData);
