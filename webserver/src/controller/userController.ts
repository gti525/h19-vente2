import { getManager } from "typeorm";
import { User } from "../entity/User";

export async function addUser(name: string, surname: string, socialLink: string): Promise<User> {
    // console.log("name: " + name, " surname: " + surname, " socialLink: " + socialLink);

    try {
        const userRepository = getManager().getRepository(User);

        const newUser: User = new User();
        newUser.name = name;
        newUser.surname = surname;
        newUser.socialLink = socialLink;
        if (socialLink) {
            const dbUser = await userRepository.findOne({
                where: {
                    socialLink: newUser.socialLink
                }
            });
            if (!dbUser) {
                const dbResponse = await userRepository.save(newUser);
                return newUser;
            }
            return dbUser;
        } else {
            const dbResponse = await userRepository.save(newUser);
            return newUser;
        }
    } catch (error) {
        // console.log(error);
        return null;
    }
}
