import * as bcrypt from 'bcrypt';

export const comparePassword = async (
  userPassword: string,
  currentPassword: string,
) => await bcrypt.compare(currentPassword, userPassword);
