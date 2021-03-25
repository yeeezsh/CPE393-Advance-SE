import * as bcrypt from 'bcrypt';

export class UserEntity {
  id?: string;
  username?: string;
  password?: string;
  email?: string;

  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
