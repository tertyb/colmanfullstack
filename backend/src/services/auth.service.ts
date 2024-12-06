import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel, { IBaseUser, IUser } from '../models/user.model';
import { config } from '../config/config';
import { IAuthTokens } from '../interfaces/auth';
import { BaseService } from './base.service';
import { UserService } from './user.service';




export class AuthService extends BaseService<IUser> {
  userService: UserService;
  constructor() {
    super(UserModel);
    this.userService = new UserService()
  }

  async registerUser(userdata: IBaseUser) {
    const newUser = await this.userService.saveUser(userdata);
    return this.generateAuthKeys(newUser.username, newUser._id);

  }

  async loginUser(username: string, password: string) {
    const user = await this.getUserDataByUserName(username);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    return this.generateAuthKeys(user.username, user._id);
  }

  async refreshUserToken(refreshToken: string) {
    let userData: any
    try {
      userData = jwt.verify(refreshToken, config.JWT_SECRET);
    } catch (error) {
      throw new Error('invalid refresh token')
    }

    const user = await this.getUserDataByUserName(userData.username);
    return this.generateAuthKeys(user.username, user._id)
  }

  async getUserDataByUserName(username: string) {
    const user = await this.userService.getOneByFilter({ username });
    if (!user) throw new Error('User not found');
    return user;
  }

  generateAuthKeys(username: string, userId: any): IAuthTokens {
    const token = jwt.sign({ userId }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRATION });
    const refreshToken = jwt.sign({ username }, config.JWT_SECRET, { expiresIn: '7d' });

    return { token, refreshToken }
  }
}
