import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import asyncHandler from "../middleware/asyncHandler";
import verifyID from "../utils/verifyId";

//@desc   Toggle a user's like
//@route  PUT /likes
//@access Private
export const updateLike = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId, templateId } = req.body;

			if (!userId || !templateId) {
				return res.status(400).json({
					success: false,
					message: "All fields are required.",
				});
			}

			const sanitizedTemplateId = verifyID(templateId);
			const sanitizedUserId = verifyID(userId);

			const existingLike = await prisma.likes.findFirst({
				where: {
					templateId: sanitizedTemplateId,
					userId: sanitizedUserId,
				},
			});

			if (existingLike) {
				await prisma.likes.delete({
					where: { id: existingLike.id },
				});
			} else {
				await prisma.likes.create({
					data: {
						templateId: sanitizedTemplateId,
						userId: sanitizedUserId,
					},
				});
			}

			return res.status(200).json({
				success: true,
				message: "Like updated.",
			});
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "Internal error. Please try again.",
			});
		}
	}
);
