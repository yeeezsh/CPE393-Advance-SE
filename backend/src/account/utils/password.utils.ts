import bcrypt from 'bcrypt';

export class PasswordUtils {
  static async compare(plainText: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plainText, hashed);
  }

  static async hash(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashed = bcrypt.hash(plainText, salt);
    return hashed;
  }
}
