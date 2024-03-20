import { User } from "../database/userModel";

export class UserService {
  async updateUser(data: any, id: number) {
    const user = await User.update(
      { firstName: data.firstName, lastName: data.lastName },
      { where: { id: id } }
    );
    return user;
  }
}
