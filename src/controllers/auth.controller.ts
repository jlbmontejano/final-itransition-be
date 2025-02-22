import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import asyncHandler from "../middleware/asyncHandler";

//@desc   Create a user
//@route  POST /signup
//@access Public
export const signupUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name, email, password } = req.body;
			const saltRounds = 10;

			if (!name || !email || !password) {
				return res.status(400).json({
					success: false,
					message: "All fields are required.",
				});
			}

			const hashedPassword = await bcrypt.hash(password, saltRounds);

			const response = await prisma.user.create({
				data: {
					name,
					email,
					password: hashedPassword,
				},
				select: {
					id: true,
					name: true,
					email: true,
					role: true,
				},
			});

			return res.status(201).json({
				success: true,
				data: response,
			});
		} catch (err) {
			console.log(err);
			if (
				err instanceof PrismaClientKnownRequestError &&
				err.code === "P2002"
			) {
				return res.status(400).json({
					success: false,
					message: "Email is already used.",
				});
			}

			return res.status(500).json({
				success: false,
				message: "Internal error. Please try again.",
			});
		}
	}
);

//@desc   Logs in a user
//@route  POST /login
//@access Public
export const loginUser = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				return res.status(400).json({
					success: false,
					data: null,
					message: "All fields are required.",
				});
			}

			const response = await prisma.user.findFirst({
				where: {
					email,
				},
				select: {
					id: true,
					name: true,
					email: true,
					password: true,
					role: true,
				},
			});

			if (!response) {
				return res.status(401).json({
					success: false,
					message: "Invalid credentials.",
				});
			}

			let isValid = await bcrypt.compare(password, response.password);

			if (!isValid) {
				return res.status(401).json({
					success: false,
					message: "Invalid credentials.",
				});
			}

			const { password: _, ...userData } = response;

			return res.status(200).json({
				success: true,
				data: userData,
			});
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "Internal error. Please try again.",
			});
		}
	}
);
