import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Role, User } from "../models";
import generateToken from "../utils/generateToken";
import { BaseResponse } from "../payloads/response/baseResponse";
import { ApiExceptionType, getStatusCode } from "../enums/ApiExceptionType";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, firstName, lastName, roleId } = req.body;

    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      res.status(400).json({ message: "Username already exists." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      firstName,
      lastName,
      password: hashedPassword,
      roleId,
    });

    res
      .status(getStatusCode(ApiExceptionType.SUCCESS))
      .json(new BaseResponse(generateToken(user.id), ApiExceptionType.SUCCESS));
  } catch (error) {
    res
      .status(getStatusCode(ApiExceptionType.INTERNAL_ERROR))
      .json(new BaseResponse(null, ApiExceptionType.INTERNAL_ERROR));
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
      res.status(400).json({ message: "Invalid username or password." });
      return;
    }

    res.status(200).json({ token: generateToken(user.id) });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
