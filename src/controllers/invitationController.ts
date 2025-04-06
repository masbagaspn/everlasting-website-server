import { Request, Response } from "express";
import { UserInvitation } from "../models";
import { AuthRequest } from "../types/AuthRequest";

export const getUserInvitations = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req as AuthRequest;
    const invitations = await UserInvitation.findAll({
      where: { userId: user },
    });

    if (!invitations) {
      res.status(404).json({ message: "User have no invitations" });
      return;
    }

    res.status(200).json({ invitations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong:(" });
  }
};

export const createUserInvitation = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthRequest;
    const { name, weddingDate } = req.body;

    const invitation = await UserInvitation.create({
      name,
      weddingDate,
      userId: user,
    });

    if (!invitation) {
      res.status(400).json({ message: "Failed to create invitation." });
    }

    res.status(200).json({ message: "Invitation created successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong:(" });
  }
};
// public id!: string;
// public name!: string;
// public weddingDate!: Date;
// public invitationStatus!: "inactive" | "active" | "expired";
// public userId!: string;
