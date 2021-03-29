import bcrypt from 'bcrypt';

export class PasswordUtils {
  static async compare(p1: string, p2: string): Promise<boolean> {
    return await bcrypt.compare(p1, p2);
  }

  static async hash(plainText: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashed = bcrypt.hash(plainText, salt);
    return hashed;
  }
}
