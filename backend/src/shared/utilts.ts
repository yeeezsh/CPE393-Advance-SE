import * as bcrypt from 'bcrypt';

export const comparePassword = async (
  userPassword: string,
  currentPassword: string,
) => {
  return await bcrypt.compare(currentPassword, userPassword);
};
