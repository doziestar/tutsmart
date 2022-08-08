import { GovernmentIdDto } from '@/dtos/users.dto';
import { IUser } from '@/interfaces/users.interface';
import DB from '@databases';

class VerificationService {
  /**
   * @param {string} userId
   * Bvn: Bank Verification Number: verified from external api
   * @param {string} bvn
   * @returns {Promise<Object>}
   * NIN: National Identity Number: verified from external api
   * @param {string} nin
   * @returns {Promise<Object>}
   */
  static async verifyUser(userId: string, bvn: string): Promise<Object> {
    const user: IUser = await DB.Users.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    if (user.bvn !== bvn) {
      throw new Error('BVN does not match');
    }
    return {
      bvn: user.bvn,
    };
  }

  public verifyGovernmentId = async (userData: GovernmentIdDto) => {
    throw new Error('Method not implemented.');
  };
}

export default VerificationService;
