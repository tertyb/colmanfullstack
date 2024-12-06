import bcrypt from 'bcryptjs';
import PostModel, { IPost } from '../models/post.model';
import UserModel, { IBaseUser, IUser } from '../models/user.model';
import { BaseService } from './base.service';


export class UserService extends BaseService<IUser> {
  private postBaseService: BaseService<IPost>
  constructor() {
    super(UserModel);
    this.postBaseService = new BaseService(PostModel);
  }

   async saveUser(user: IBaseUser) {
    const { username, password, email } = user
    if (!username || !password || !email) throw new Error('one of the fields missing')
    await this.checkIfUsernameExists(username);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword, email, image: '' });
    return await newUser.save();

  }

  async createUser(user: IBaseUser) {
     await this.saveUser(user);
      return 'create entity sucssfully'
  }

  private async checkIfUsernameExists(username: string) {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) throw new Error('User already exists');
  }


  async getUserPosts(userId: string) {
    return await this.postBaseService.getByFilter({ userId });
  }
}




