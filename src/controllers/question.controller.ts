import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import asyncHandler from "../middleware/asyncHandler";

//@desc   Gets template's questions
//@route  GET /templates/:id/questions
//@access Private
export const getTemplateQuestions = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const tags = await prisma.tag.findMany();
			const topics = await prisma.topic.findMany();

			return res.status(200).json({
				success: true,
				data: { tags, topics },
			});
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "Internal error. Please try again.",
			});
		}
	}
);
