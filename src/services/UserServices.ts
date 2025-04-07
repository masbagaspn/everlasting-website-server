import { User } from "../models";

const getById = async (id: string) => {
  const user = await User.findOne({ where: { id } });
  return user;
};

const updateUser = async (
  id: string,
  firstName: string,
  lastName: string,
  userName: string
) => {
  let isUserNameExist = await User.findOne({ where: { id: !id, userName } });

  if (isUserNameExist) {
    throw new Error("Username is already exist.");
  }

  const user = await User.update(
    { firstName, lastName, userName },
    { where: { id } }
  );

  return user;
};

const deleteUser = async (id: string) => {
  const user = await User.destroy({ where: { id } });
  return user;
};

export const userServices = {
  getById,
  updateUser,
  deleteUser,
};
