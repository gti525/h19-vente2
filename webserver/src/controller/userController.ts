import { User } from "../entity/User";
import { getManager } from "typeorm";

export async function addUser(name: string, surname: string, socialLink: string): Promise<User> {

    const userRepository = getManager().getRepository(User);

    let user = new User();
    user.name = name;
    user.surname = surname;
    user.socialLink = socialLink;

    const dbUser = await userRepository.find({
        where: {
            // name: user.name,
            // surname: user.surname,
            socialLink: user.socialLink
        }
    });
    if (dbUser.length === 0){
        const dbResponse = await userRepository.save(user);
    } else if (dbUser.length === 1) {
        user = dbUser[0];
    } else {
        user = null;
    }

    return user;
}
