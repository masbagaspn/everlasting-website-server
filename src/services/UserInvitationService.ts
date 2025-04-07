import { Person, Guest, UserInvitation, Message, Wish, Event } from "../models";

const getUserInvitations = async (
  userId: string
): Promise<UserInvitation[] | null> => {
  const invitations = await UserInvitation.findAll({
    where: { userId },
    include: [
      { model: Person },
      { model: Guest },
      { model: Message },
      { model: Event },
      { model: Wish },
    ],
  });
  return invitations;
};

const getUserInvitationById = async (
  id: string,
  userId: string
): Promise<UserInvitation | null> => {
  const invitation = await UserInvitation.findOne({ where: { id, userId } });
  return invitation;
};

const createUserInvitation = async (
  name: string,
  weddingDate: Date,
  userId: string
): Promise<UserInvitation | null> => {
  const invitation = await UserInvitation.create({
    name,
    weddingDate,
    userId,
  });
  return invitation;
};

const updateUserInvitation = async (
  id: string,
  name: string,
  weddingDate: Date,
  userId: string
) => {
  const invitation = await UserInvitation.update(
    { name, weddingDate },
    { where: { id, userId } }
  );

  return invitation;
};

const deleteUserInvitation = async (id: string, userId: string) => {
  const invitation = await UserInvitation.destroy({ where: { id, userId } });
  return invitation;
};

export const userInvitaitonServices = {
  getUserInvitations,
  getUserInvitationById,
  createUserInvitation,
  updateUserInvitation,
  deleteUserInvitation,
};
