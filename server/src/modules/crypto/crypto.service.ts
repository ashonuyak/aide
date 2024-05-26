import { Injectable } from '@nestjs/common';
import { createHash, pbkdf2Sync, randomBytes } from 'crypto';

@Injectable()
export class CryptoService {
	private readonly saltLength = 16; // Length of the salt
	private readonly iterations = 10_000; // Number of iterations
	private readonly keyLength = 64; // Key length
	private readonly digest = 'sha512'; // Digest algorithm

	hashSha256(value: string) {
		return createHash('sha256').update(value).digest('base64');
	}

	/**
	 * Hashes a password using PBKDF2.
	 * @param password The password to hash.
	 * @returns The hashed password as a string in format "salt$hash".
	 */
	hashPassword(password: string): string {
		const salt = randomBytes(this.saltLength).toString('hex');
		const hash = pbkdf2Sync(
			password,
			salt,
			this.iterations,
			this.keyLength,
			this.digest
		).toString('hex');

		return `${salt}$${hash}`;
	}

	/**
	 * Compares a provided password with a stored hash.
	 * @param password The password to check.
	 * @param storedHash The stored hash in format "salt$hash".
	 * @returns true if the password matches the hash, false otherwise.
	 */
	comparePassword(password: string, storedHash: string): boolean {
		const [salt, originalHash] = storedHash.split('$');
		const hash = pbkdf2Sync(
			password,
			salt,
			this.iterations,
			this.keyLength,
			this.digest
		).toString('hex');

		return hash === originalHash;
	}

	newPassword(bytes: number) {
		return randomBytes(bytes).toString('base64').replaceAll(/\W/g, '');
	}
}
