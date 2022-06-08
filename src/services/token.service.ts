import DB from '@/databases';
import { StoredToken } from '@/interfaces/token.interface';
import { IUser } from '@/interfaces/users.interface';
import Cryptr from 'cryptr';

const crypto = new Cryptr(process.env.CRYPTO_SECRET);

export default class StoredTokenService {
  public async createOrUpdateToken(provider: any, token: StoredToken, user: IUser): Promise<StoredToken> {
    if (!token) throw new Error('token is required');
    if (!user) throw new Error('user is required');
    if (!provider) throw new Error('provider is required');

    if (token.access && token.refresh) {
      token.access = crypto.encrypt(token.access);
      token.refresh = crypto.encrypt(token.refresh);
      const tokenData = DB.Tokens.findOne({ where: { userId: user.id, provider } });
      if (tokenData) {
        await DB.Tokens.update({ ...token }, { where: { userId: user.id, provider } });
      }
    } else {
      const newToken: StoredToken = await DB.Tokens.create({ ...token, userId: user.id, provider });
      token.access = newToken.access;
      token.refresh = newToken.refresh;
    }
    return token;
  }

  public async getToken(id: string, user: IUser, skipDecryption: any, provider: any, token: StoredToken): Promise<StoredToken[]> {
    const tokenData: StoredToken[] = await DB.Tokens.findOne({
      where: { ...(id && { id: id }), ...(provider && { provider: provider }), userid: user.id },
    });
    if (tokenData.length && !skipDecryption) {
      tokenData.forEach(t => {
        t.access = crypto.decrypt(t.access);
        t.refresh = crypto.decrypt(t.refresh);
      });
    }
    return tokenData;
  }

  public verifyToken(provider: any, user: IUser): Promise<boolean> {
    const tokenData: StoredToken[] = DB.Tokens.findOne({
      where: { userId: user.id, provider },
    });
    if (tokenData.length) {
      return Promise.resolve(true);
    }
  }

  public async deleteToken(id: string, provider: any, user: IUser): Promise<number> {
    return await DB.Tokens.destroy({ where: { ...(id && { id: id }), userId: user.id, ...(provider && { provider: provider }) } });
  }
}
