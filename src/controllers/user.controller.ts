import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import asyncHandler from "../middleware/asyncHandler";
import formatTemplate from "../utils/formatTemplate";
import includeTemplate from "../utils/includeTemplate";
import verifyID from "../utils/verifyId";

//@desc   Get a user
//@route  GET /users/:id
//@access Private
export const getUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			if (!id) {
				return res
					.status(400)
					.json({ success: false, message: "All fields are required." });
			}

			const userId = verifyID(id);

			const response = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					id: true,
					name: true,
					email: true,
					role: true,
				},
			});

			if (!response) {
				return res
					.status(404)
					.json({ success: false, message: "User not found." });
			}

			return res.status(200).json({ success: true, data: response });
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "Internal error. Please try again.",
			});
		}
	}
);

//@desc   Get all users
//@route  GET /users
//@access Private
export const getUsers = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await prisma.user.findMany({
				select: {
					id: true,
					name: true,
					email: true,
					role: true,
				},
			});

			return res
				.status(200)
				.json({ success: true, count: response.length, data: response });
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "Internal error. Please try again.",
			});
		}
	}
);

//@desc   Update user's role
//@route  PUT /users/:id
//@access Public
export const updateUserRole = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			if (!id) {
				return res.status(400).json({
					success: false,
					message: "All fields are required.",
				});
			}

			const userId = verifyID(id);

			const response = await prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					role: "ADMIN",
				},
			});

			if (!response) {
				return res.status(400).json({
					success: false,
					message: "Error.",
				});
			}

			return res.status(204).end();
		} catch (err) {
			return res.status(500).json({
				success: false,

				message: "Internal error. Please try again.",
			});
		}
	}
);

//@desc   Deletes a user
//@route  DELETE /users/:id
//@access Private
export const deleteUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			if (!id) {
				return res
					.status(400)
					.json({ success: false, message: "All fields are required." });
			}

			const userId = verifyID(id);

			await prisma.user.delete({
				where: {
					id: userId,
				},
			});

			return res.status(204).end();
		} catch (err) {
			if (
				err instanceof Prisma.PrismaClientKnownRequestError &&
				err.code === "P2025"
			) {
				return res
					.status(404)
					.json({ success: false, message: "User not found." });
			}
			return res.status(400).json({
				success: false,
				message: "Error. Please try again.",
			});
		}
	}
);

//@desc   Get all user's templates
//@route  GET /users/:id/templates
//@access Private
export const getUserTemplates = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			if (!id) {
				return res
					.status(400)
					.json({ success: false, message: "All fields are required." });
			}

			const userId = verifyID(id);

			const response = await prisma.template.findMany({
				where: {
					userId: userId,
				},
				orderBy: { likes: { _count: "desc" } },
				include: includeTemplate,
			});

			const formattedTemplate = response.map(template =>
				formatTemplate(template)
			);

			return res.status(200).json({
				success: true,
				count: formattedTemplate.length,
				data: formattedTemplate,
			});
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "Internal error. Please try again.",
			});
		}
	}
);

//@desc   Get all user's templates
//@route  GET /users/:id/templates
//@access Private
export const getUserForms = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			if (!id) {
				return res
					.status(400)
					.json({ success: false, message: "All fields are required." });
			}

			const userId = verifyID(id);

			const response = await prisma.form.findMany({
				where: {
					userId: userId,
				},
			});

			return res.status(200).json({
				success: true,
				count: response.length,
				data: response,
			});
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "Internal error. Please try again.",
			});
		}
	}
);
