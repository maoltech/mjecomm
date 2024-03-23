import { jwtService } from '../JWT.service';
import jwt from 'jsonwebtoken';
import { User } from '../../model/user.model';

// Mock the jsonwebtoken library
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

// Mock the User model
jest.mock('../model/user.model', () => ({
  findById: jest.fn(),
}));

describe('JWTService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createToken', () => {
    it('should return accessToken and refreshToken', () => {
      (jwt.sign as jest.Mock).mockReturnValueOnce('fakeAccessToken');
      (jwt.sign as jest.Mock).mockReturnValueOnce('fakeRefreshToken');
      const tokens = jwtService.createToken('userId', 'email');
      expect(tokens).toEqual({
        accessToken: 'fakeAccessToken',
        refreshToken: 'fakeRefreshToken',
      });
      expect(jwt.sign).toHaveBeenCalledTimes(2);
    });
  });

  describe('verifyAccessToken', () => {
    it('should return user if token is valid', async () => {
      const mockDecodedToken = {
        userId: 'userId',
        email: 'email@example.com',
      };
      const mockUser = { _id: 'userId', email: 'email@example.com' };
      (jwt.verify as jest.Mock).mockReturnValueOnce(mockDecodedToken);
      (User.findById as jest.Mock).mockResolvedValueOnce(mockUser);

      const user = await jwtService.verifyAccessToken('fakeAccessToken');
      expect(user).toEqual(mockUser);
      expect(jwt.verify).toHaveBeenCalledWith(
        'fakeAccessToken',
        expect.any(String)
      );
      expect(User.findById).toHaveBeenCalledWith('userId');
    });

    it('should return false if token is invalid', async () => {
      (jwt.verify as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Invalid token');
      });

      const user = await jwtService.verifyAccessToken('fakeAccessToken');
      expect(user).toBe(false);
    });

    it('should return false if user is not found', async () => {
      const mockDecodedToken = {
        userId: 'userId',
        email: 'email@example.com',
      };
      (jwt.verify as jest.Mock).mockReturnValueOnce(mockDecodedToken);
      (User.findById as jest.Mock).mockResolvedValueOnce(null);

      const user = await jwtService.verifyAccessToken('fakeAccessToken');
      expect(user).toBe(false);
    });
  });
});
