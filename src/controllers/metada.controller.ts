import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import asyncHandler from "../middleware/asyncHandler";

//@desc   Gets latest tags and topics
//@route  GET /metadata
//@access Private
export const getMetadata = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const tags = await prisma.tag.findMany();
			const topics = await prisma.topic.findMany();

			const sanitizedTags = tags.map(tag => tag.text);

			return res.status(200).json({
				success: true,
				data: { tags: sanitizedTags, topics },
			});
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "Internal error. Please try again.",
			});
		}
	}
);
