import { Request, Response } from "express";
import { Role, User } from "../models";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userid } = req.params;

    const user = await User.findAll({
      where: { id: userid },
      include: Role,
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
