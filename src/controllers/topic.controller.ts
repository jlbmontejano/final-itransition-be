import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import asyncHandler from "../middleware/asyncHandler";
import verifyID from "../utils/verifyId";

//@desc   Create a topic
//@route  POST /topics
//@access Private
export const createTopic = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { text } = req.body;

			if (!text) {
				return res
					.status(400)
					.json({ success: false, message: "All fields are required." });
			}

			const response = await prisma.topic.create({
				data: {
					text,
				},
			});

			return res.status(200).json({ success: true, data: response });
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "Internal error. Please try again.",
			});
		}
	}
);

//@desc   Deletes a topic
//@route  DELETE /topics/:id
//@access Private
export const deleteTopic = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			if (!id) {
				return res
					.status(400)
					.json({ success: false, message: "All fields are required." });
			}

			const topicId = verifyID(id);

			await prisma.topic.delete({
				where: {
					id: topicId,
				},
			});

			return res.status(204).end();
		} catch (err) {
			return res.status(400).json({
				success: false,
				message: "Error. Please try again.",
			});
		}
	}
);
