import * as bcrypt from 'bcryptjs';

export class CryptoService {
  private readonly saltRounds = 10;

  async hashIt(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async isMatch(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
