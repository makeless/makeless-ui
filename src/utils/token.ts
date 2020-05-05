import {customAlphabet} from 'nanoid';

export default {
  generate(): string {
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const nanoid = customAlphabet(alphabet, 32);
    return nanoid();
  },
};
