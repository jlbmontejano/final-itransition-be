import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import asyncHandler from "../middleware/asyncHandler";

//@desc   Create a tag
//@route  POST /tags
//@access Private
export const createTag = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { text } = req.body;

			if (!text) {
				return res.status(400).json({
					success: false,
					message: "All fields are required.",
				});
			}

			const response = await prisma.tag.create({
				data: {
					text,
				},
			});

			return res.status(201).json({
				success: true,
				message: "Tag created successfully.",
			});
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "Internal error. Please try again.",
			});
		}
	}
);
