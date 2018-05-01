import jwt from 'jsonwebtoken';
const Hashes = require('jshashes');
const SHA256 = new Hashes.SHA256;

/**
 * A function that generates a jwt.
 * @param input 
 */
export function generateAuthToken (input: any) {
	const token = jwt.sign(input, process.env.JWT_SECRET, { expiresIn: '1h' });
	return token;
}

/**
 * A function that decodes a jwt.
 * @param token 
 */
export function verifyAuthtoken (token: any) {
	return jwt.verify(token, process.env.JWT_SECRET);
}

/**
 * A mock implementation of a hash function. Could have used bcrypt.
 * @param str 
 */
export function hashPassword (str: string): string {
	return SHA256.hex(str);
}