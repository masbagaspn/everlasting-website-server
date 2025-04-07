import { Request, Response } from "express";
import { Role, User } from "../models";
import { userServices } from "../services/UserServices";
import { BaseResponse } from "../payloads/response/baseResponse";
import { ApiExceptionType, getStatusCode } from "../enums/ApiExceptionType";
import { AuthRequest } from "../types/AuthRequest";

export const getById = async (req: Request, res: Response) => {
  try {
    const id = (req as AuthRequest).user;
    const user = await User.findOne({
      where: { id },
      attributes: ["username", "firstName", "lastName"],
      include: Role,
    });

    if (!user) {
      res.status(404).json(new BaseResponse(ApiExceptionType.USER_NOT_FOUND));
      return;
    }

    res.status(200).json(new BaseResponse(user, ApiExceptionType.SUCCESS));
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, username } = req.body;

    const user = await userServices.updateUser(
      id,
      firstName,
      lastName,
      username
    );

    if (!user) {
      res
        .status(getStatusCode(ApiExceptionType.USER_NOT_FOUND))
        .json(new BaseResponse(ApiExceptionType.USER_NOT_FOUND));
      return;
    }

    res.status(200).json(new BaseResponse(user, ApiExceptionType.SUCCESS));
  } catch (error) {
    res.status(500).json(new BaseResponse(ApiExceptionType.INTERNAL_ERROR));
  }
};
