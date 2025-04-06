import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models";
import generateToken from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, roleId } = req.body;

    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      res.status(400).json({ message: "Username already exists." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      roleId,
    });

    res.status(201).json({ token: generateToken(user.id) });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(400).json({ message: "Invalid username." });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials." });
      return;
    }

    res.status(200).json({ token: generateToken(user.id) });
  } catch (error) {
    res.status(500).json({ message: "Error authenticating user." });
  }
};
