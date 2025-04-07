import { Request, Response } from "express";
import { UserInvitation } from "../models";
import { AuthRequest } from "../types/AuthRequest";
import { userInvitaitonServices } from "../services/UserInvitationService";
import { BaseResponse } from "../payloads/response/baseResponse";
import { ApiExceptionType, getStatusCode } from "../enums/ApiExceptionType";

export const getAll = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthRequest;
    const invitations = await UserInvitation.findAll({
      where: { userId: user },
    });

    if (!invitations) {
      res
        .status(404)
        .json(
          new BaseResponse(null, ApiExceptionType.USER_INVITATION_NOT_FOUND)
        );
      return;
    }

    res
      .status(200)
      .json(new BaseResponse(invitations, ApiExceptionType.SUCCESS));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong:(" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;

    const invitation = await UserInvitation.findOne({
      where: {
        id,
        userId: user,
      },
    });

    if (!invitation) {
      res.status(404).json({ message: "Invitation Not Found" });
      return;
    }
    res.status(200).json({ invitation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong:(" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthRequest;
    const { name, weddingDate } = req.body;

    const invitation = await userInvitaitonServices.createUserInvitation(
      name,
      weddingDate,
      user as string
    );

    if (!invitation) {
      res
        .status(getStatusCode(ApiExceptionType.USER_INVITATION_NOT_FOUND))
        .json(new BaseResponse(ApiExceptionType.USER_INVITATION_NOT_FOUND));
      return;
    }

    res
      .status(200)
      .json(new BaseResponse(invitation, ApiExceptionType.SUCCESS));
  } catch (err) {
    console.error(err);
    res
      .status(getStatusCode(ApiExceptionType.INTERNAL_ERROR))
      .json(new BaseResponse(ApiExceptionType.INTERNAL_ERROR));
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const { name, weddingDate } = req.body;

    const invitation = await userInvitaitonServices.updateUserInvitation(
      id,
      name,
      weddingDate,
      user as string
    );

    if (!invitation) {
      res
        .status(getStatusCode(ApiExceptionType.USER_INVITATION_NOT_FOUND))
        .json(
          new BaseResponse(null, ApiExceptionType.USER_INVITATION_NOT_FOUND)
        );
      return;
    }

    res
      .status(200)
      .json(new BaseResponse(invitation, ApiExceptionType.SUCCESS));
  } catch (err) {
    console.error(err);
    res
      .status(getStatusCode(ApiExceptionType.INTERNAL_ERROR))
      .json(new BaseResponse(null, ApiExceptionType.INTERNAL_ERROR));
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user } = req as AuthRequest;

    const invitation = await userInvitaitonServices.deleteUserInvitation(
      id,
      user as string
    );
    if (!invitation) {
      res
        .status(getStatusCode(ApiExceptionType.USER_INVITATION_NOT_FOUND))
        .json(
          new BaseResponse(null, ApiExceptionType.USER_INVITATION_NOT_FOUND)
        );
      return;
    }

    res
      .status(200)
      .json(new BaseResponse(invitation, ApiExceptionType.SUCCESS));
  } catch (err) {
    console.error(err);
    res
      .status(getStatusCode(ApiExceptionType.INTERNAL_ERROR))
      .json(ApiExceptionType.INTERNAL_ERROR);
  }
};
