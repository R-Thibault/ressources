import gql from "graphql-tag";
import * as argon2 from "argon2";
import {
  DummyFiles,
  DummyGroups,
  DummyImages,
  DummyLinks,
  DummyMembers,
  DummyMessages,
  DummyRessources,
  DummyRights,
  DummyTags,
  DummyUsers,
} from "../dummyDatas";
import { Image } from "../entities/Image";
import { File } from "../entities/File";
import { validate } from "class-validator";
import { User } from "../entities/User";
import { Tag } from "../entities/Tag";
import { Group } from "../entities/Group";
import { Message } from "../entities/Message";
import { Member } from "../entities/Member";
import { Link } from "../entities/Link";
import { Ressource } from "../entities/Ressource";
import { Right } from "../entities/Right";
import { validateDatas } from "./validate";

export async function populateBdd() {
  try {
    const adminUser = new User();
    adminUser.email = "admin@ressources.com";
    adminUser.hashed_password = await argon2.hash("DummyPassword");
    adminUser.created_at = new Date();
    const error = await validate(adminUser);

    if (error.length > 0) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    } else {
      const datas = await adminUser.save();
    }
  } catch (error) {
    throw new Error(`error occured ${JSON.stringify(error)}`);
  }

  for (let i = 0; i < DummyUsers.length; i++) {
    try {
      const newUser = new User();
      newUser.email = DummyUsers[i].email;
      newUser.hashed_password = await argon2.hash(DummyUsers[i].password);
      newUser.lastname = DummyUsers[i].lastname;
      newUser.firstname = DummyUsers[i].firstname;
      newUser.created_at = DummyUsers[i].created_at;

      const error = await validate(newUser);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newUser.save();
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  for (let i = 0; i < DummyImages.length; i++) {
    try {
      const newImage = new Image();
      newImage.name = DummyImages[i].name;
      newImage.path = DummyImages[i].path;
      newImage.created_by = DummyImages[i].created_by;
      newImage.created_at = DummyImages[i].created_at;

      const error = await validate(newImage);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newImage.save();
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  for (let i = 0; i < DummyTags.length; i++) {
    try {
      const newTag = new Tag();
      newTag.name = DummyTags[i].name;
      newTag.created_by = DummyTags[i].created_by;

      const error = await validate(newTag);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newTag.save();
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  for (let i = 0; i < DummyGroups.length; i++) {
    try {
      const newGroup = new Group();
      newGroup.name = DummyGroups[i].name;
      newGroup.description = DummyGroups[i].description;
      newGroup.token = DummyGroups[i].token;
      newGroup.created_by = DummyGroups[i].created_by;
      newGroup.created_at = DummyGroups[i].created_at;

      const error = await validate(newGroup);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newGroup.save();
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  for (let i = 0; i < DummyRights.length; i++) {
    try {
      const newRight = new Right();
      newRight.name = DummyRights[i].name;

      const error = await validate(newRight);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newRight.save();
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  for (let i = 0; i < DummyMembers.length; i++) {
    try {
      const newMember = new Member();
      newMember.group = DummyMembers[i].group_id;
      newMember.last_visit = DummyMembers[i].last_visit;
      newMember.created_by = DummyMembers[i].created_by;
      newMember.created_at = DummyMembers[i].created_at;

      const error = await validate(newMember);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newMember.save();
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  for (let i = 0; i < DummyMessages.length; i++) {
    try {
      const newMessage = new Message();
      newMessage.message = DummyMessages[i].message;
      newMessage.group = DummyMessages[i].group_id;
      newMessage.created_by = DummyMessages[i].created_by;
      newMessage.created_at = DummyMessages[i].created_at;

      const error = await validate(newMessage);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newMessage.save();
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  for (let i = 0; i < DummyFiles.length; i++) {
    try {
      const newFile = new File();
      newFile.name = DummyFiles[i].name;
      newFile.type = DummyFiles[i].type;
      newFile.path = DummyFiles[i].path;
      newFile.created_by = DummyFiles[i].created_by;
      newFile.created_at = DummyFiles[i].created_at;

      const error = await validate(newFile);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newFile.save();
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }
  for (let i = 0; i < DummyLinks.length; i++) {
    try {
      const newLink = new Link();
      newLink.title = DummyLinks[i].title;
      newLink.url = DummyLinks[i].url;
      newLink.created_by = DummyLinks[i].created_by;
      newLink.created_at = DummyLinks[i].created_at;

      const error = await validate(newLink);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newLink.save();
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  for (let i = 0; i < DummyRessources.length; i++) {
    try {
      const newRessource = new Ressource();
      newRessource.title = DummyRessources[i].title;
      newRessource.description = DummyRessources[i].description;
      newRessource.is_favorite = DummyRessources[i].is_favorite;
      newRessource.image_id = DummyRessources[i].image_id;
      newRessource.file_id = DummyRessources[i].file_id;
      newRessource.link_id = DummyRessources[i].link_id;
      newRessource.created_by = DummyRessources[i].created_by;
      newRessource.created_at = DummyRessources[i].created_at;

      const error = await validate(newRessource);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newRessource.save();
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  // add image to user
  for (let i = 0; i < DummyUsers.length; i++) {
    const user = await User.findOneBy({ id: i + 2 });

    if (user) {
      Object.assign(user, { image_id: DummyUsers[i].image_id });

      const error = await validate(user);

      if (error.length === 0) {
        const datas = await user.save();
      } else {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      }
    }
  }
}

// export const mutationPopulate = gql`
//   mutation {
//     populateImageTable {
//       id
//     }
//     populateUserTable {
//       id
//     }
//     populateTagTable {
//       id
//     }
//     populateGroupTable {
//       id
//     }
//     populateRightTable {
//       id
//     }
//     populateMemberTable {
//       id
//     }
//     populateMessageTable {
//       id
//     }
//     populateFileTable {
//       id
//     }
//     populateLinkTable {
//       id
//     }
//     populateRessourceTable {
//       id
//     }
//   }
// `;
