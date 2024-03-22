import { User } from "../model/user.model"

interface CreateUserType{
    email: string,
    password: string
}

class UserService{

    public createUser = async(data: CreateUserType) => {

        return await User.create(data);
    }
}

export const userService = new UserService();