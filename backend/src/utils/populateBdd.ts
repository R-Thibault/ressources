import * as argon2 from "argon2";
import { Image } from "../entities/Image";
import { validate } from "class-validator";
import { User } from "../entities/User";
import { Tag } from "../entities/Tag";
import { Group } from "../entities/Group";
import { Message } from "../entities/Message";
import { Member } from "../entities/Member";
import { Link } from "../entities/Link";
import { Ressource } from "../entities/Ressource";
import { Right } from "../entities/Right";
import { faker } from "@faker-js/faker";

export async function populateBdd() {
  // used to set the number of data you want to generate
  const numberOfUsers = 5;
  const numberOfImages = 75;
  const numberOfAvatar = numberOfUsers + 2;
  const numberOfTags = 20;
  const numberOfGroups = 5;
  const numberOfMembers = 20;
  const numberOfRessources = 75;
  //const numberOfFiles = 20;
  const numberOfLinks = 20;
  const numberOfMessages = 20;

  //used to store the generated Datas for future relations
  const createdUsers = [];
  const createdImages = [];
  const createdTags = [];
  const createdGroups = [];
  const createdMembers = [];
  const createdLinks = [];
  const createdAvatars = [];

  // Creation de l'utilisateur Admin en 1er, permet de ne populé la base de donnée qu'une fois.
  try {
    const adminUser = new User();
    adminUser.email = "admin@ressources.com";
    adminUser.hashed_password = await argon2.hash("DummyPassword12!");
    adminUser.firstname = "Admin";
    adminUser.lastname = "Admin";
    adminUser.created_at = new Date();
    adminUser.is_account_validated = true;
    const error = await validate(adminUser);

    if (error.length > 0) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    } else {
      await adminUser.save();
    }
  } catch (error) {
    throw new Error(`error occured ${JSON.stringify(error)}`);
  }
  // Obligation de crée les utilisateurs en 1er pour pouvoir faire la relation "created_by_user" avec les autres tables
  for (let i = 0; i < numberOfUsers; i++) {
    try {
      if (i === 0) {
        const newUser = new User();
        newUser.email = "dev@gmail.com";
        newUser.hashed_password = await argon2.hash("superPassword1!");
        newUser.lastname = faker.person.lastName();
        newUser.firstname = faker.person.firstName();
        newUser.created_at = faker.date.between({
          from: "2024-01-01T00:00:00.000Z",
          to: Date.now(),
        });
        newUser.is_account_validated = true;
        //ajout relation avatar a la fin de la population de données, car les images ne sont pas encore crées ici.
        const error = await validate(newUser);

        if (error.length > 0) {
          throw new Error(`error occured ${JSON.stringify(error)}`);
        } else {
          await newUser.save();
          createdUsers.push(newUser);
        }
      } else if (i === 1) {
        const newUser = new User();
        newUser.email = "disabled@gmail.com";
        newUser.hashed_password = await argon2.hash("aZertY2024!");
        newUser.lastname = faker.person.lastName();
        newUser.firstname = faker.person.firstName();
        newUser.created_at = faker.date.between({
          from: "2024-01-01T00:00:00.000Z",
          to: Date.now(),
        });
        newUser.is_account_validated = false;
        //ajout relation avatar a la fin de la population de données, car les images ne sont pas encore crées ici.
        const error = await validate(newUser);

        if (error.length > 0) {
          throw new Error(`error occured ${JSON.stringify(error)}`);
        } else {
          await newUser.save();
          createdUsers.push(newUser);
        }
      } else {
        const newUser = new User();
        newUser.email = faker.internet.email();
        newUser.hashed_password = await argon2.hash("superPassword1!");
        newUser.lastname = faker.person.lastName();
        newUser.firstname = faker.person.firstName();
        newUser.created_at = faker.date.between({
          from: "2024-01-01T00:00:00.000Z",
          to: Date.now(),
        });
        newUser.is_account_validated = true;
        //ajout relation avatar a la fin de la population de données, car les images ne sont pas encore crées ici.
        const error = await validate(newUser);

        if (error.length > 0) {
          throw new Error(`error occured ${JSON.stringify(error)}`);
        } else {
          await newUser.save();
          createdUsers.push(newUser);
        }
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  for (let i = 0; i < numberOfImages; i++) {
    try {
      const newImage = new Image();
      newImage.name = faker.word.adjective();
      newImage.path = faker.image.url();
      newImage.created_by_user =
        createdUsers[Math.floor(Math.random() * createdUsers.length)]; // Randomly select a user
      newImage.created_at = faker.date.between({
        from: "2024-01-01T00:00:00.000Z",
        to: Date.now(),
      });

      const error = await validate(newImage);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        await newImage.save();
        createdImages.push(newImage);
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  for (let i = 0; i < numberOfAvatar; i++) {
    try {
      const newAvatar = new Image();
      newAvatar.name = faker.word.adjective();
      newAvatar.path = faker.image.avatar();
      newAvatar.created_by_user =
        createdUsers[Math.floor(Math.random() * createdUsers.length)]; // Randomly select a user
      newAvatar.created_at = faker.date.between({
        from: "2024-01-01T00:00:00.000Z",
        to: Date.now(),
      });

      const error = await validate(newAvatar);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        await newAvatar.save();
        createdAvatars.push(newAvatar);
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  for (let i = 0; i < numberOfTags; i++) {
    try {
      const newTag = new Tag();
      newTag.name = faker.word.adjective();
      newTag.created_by_user =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];

      const error = await validate(newTag);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        await newTag.save();
        createdTags.push(newTag);
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  for (let i = 0; i < numberOfGroups; i++) {
    try {
      const newGroup = new Group();
      newGroup.name = faker.word.adjective();
      newGroup.description = faker.lorem.paragraph(2);
      newGroup.token = faker.string.uuid();
      newGroup.created_by_user =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];
      newGroup.created_at = faker.date.between({
        from: "2024-01-01T00:00:00.000Z",
        to: Date.now(),
      });

      const error = await validate(newGroup);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        await newGroup.save();
        createdGroups.push(newGroup);
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  const DummyRights: {
    name: string;
  }[] = [
    {
      name: "GROUP_ADMIN",
    },
    {
      name: "USER",
    },
    {
      name: "ADMIN",
    },
  ];

  for (let i = 0; i < DummyRights.length; i++) {
    try {
      const newRight = new Right();
      newRight.name = DummyRights[i].name;

      const error = await validate(newRight);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        await newRight.save();
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  for (let i = 0; i < numberOfMembers; i++) {
    try {
      const newMember = new Member();
      newMember.group =
        createdGroups[Math.floor(Math.random() * createdGroups.length)];
      newMember.last_visit = faker.date.between({
        from: "2024-01-01T00:00:00.000Z",
        to: Date.now(),
      });
      newMember.user =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];
      newMember.created_at = faker.date.between({
        from: "2024-01-01T00:00:00.000Z",
        to: Date.now(),
      });

      const error = await validate(newMember);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        await newMember.save();
        createdMembers.push(newMember);
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  for (let i = 0; i < numberOfMessages; i++) {
    try {
      const newMessage = new Message();
      newMessage.message = faker.lorem.sentence();
      newMessage.group =
        createdGroups[Math.floor(Math.random() * createdGroups.length)];
      newMessage.created_by_user =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];
      newMessage.created_at = faker.date.between({
        from: "2024-01-01T00:00:00.000Z",
        to: Date.now(),
      });
      const error = await validate(newMessage);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        await newMessage.save();
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  // for (let i = 0; i < DummyFiles.length; i++) {
  //   try {
  //     const newFile = new File();
  //     newFile.name = DummyFiles[i].name;
  //     newFile.type = DummyFiles[i].type;
  //     newFile.path = DummyFiles[i].path;
  //     newFile.created_by_user =
  //       createdUsers[Math.floor(Math.random() * createdUsers.length)];
  //     newFile.created_at = faker.date.recent({
  //       days: 100,
  //
  //     });

  //     const error = await validate(newFile);

  //     if (error.length > 0) {
  //       throw new Error(`error occured ${JSON.stringify(error)}`);
  //     } else {
  //       await newFile.save();
  //     }
  //   } catch (error) {
  //     throw new Error(`error occured ${JSON.stringify(error)}`);
  //   }
  // }
  for (let i = 0; i < numberOfLinks; i++) {
    try {
      const newLink = new Link();
      newLink.url = faker.internet.url();
      newLink.created_by_user =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];
      newLink.created_at = faker.date.between({
        from: "2024-01-01T00:00:00.000Z",
        to: Date.now(),
      });

      const error = await validate(newLink);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        await newLink.save();
        createdLinks.push(newLink);
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  for (let i = 0; i < numberOfRessources; i++) {
    try {
      const newRessource = new Ressource();
      newRessource.title = faker.lorem.words(2);
      newRessource.description = faker.lorem.sentence();
      newRessource.image_id = createdImages[i + 1];
      newRessource.link_id = createdLinks[i + 1];
      newRessource.group_id =
        createdGroups[Math.floor(Math.random() * createdGroups.length)];
      newRessource.created_by_user =
        createdUsers[Math.floor(Math.random() * createdUsers.length)];
      newRessource.created_at = faker.date.between({
        from: "2024-01-01T00:00:00.000Z",
        to: Date.now(),
      });

      const error = await validate(newRessource);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        await newRessource.save();
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  // add image to user
  for (let i = 0; i < createdUsers.length; i++) {
    const user = await User.findOneBy({ id: i + 1 });

    if (user) {
      Object.assign(user, {
        avatar: createdAvatars[i + 1],
      });

      const error = await validate(user);

      if (error.length === 0) {
        await user.save();
      } else {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      }
    }
  }
}
