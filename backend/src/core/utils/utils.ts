import dotenv from 'dotenv';
import path from 'path';

export abstract class Utils {
  static loadEnv() {
    dotenv.config({ path: path.resolve(process.cwd(), '.env') });
  }
}
