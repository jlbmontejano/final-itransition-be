import { Question } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import asyncHandler from "../middleware/asyncHandler";
import formatTemplate from "../utils/formatTemplate";
import includeTemplate from "../utils/includeTemplate";
import verifyID from "../utils/verifyId";

//@desc   Create a template
//@route  POST /templates
//@access Private
export const createTemplate = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { title, description, topicId, tags, questions, creatorId } =
				req.body;

			if (
				!title ||
				!description ||
				!topicId ||
				!tags ||
				!questions ||
				!creatorId
			) {
				return res
					.status(400)
					.json({ success: false, message: "All fields are required." });
			}

			const sanitizedCreatorId = verifyID(creatorId);
			const sanitizedTopicId = verifyID(topicId);

			const response = await prisma.template.create({
				data: {
					title,
					description,
					creator: {
						connect: {
							id: sanitizedCreatorId,
						},
					},
					topic: {
						connect: {
							id: sanitizedTopicId,
						},
					},
					tags: {
						connectOrCreate: tags.map((tag: string) => ({
							where: { text: tag },
							create: { text: tag },
						})),
					},
					questions: {
						create: questions.map((question: Question) => ({
							text: question.text,
							type: question.type,
							// options:
							// 	question.type === "CHECKBOX"
							// 		? {
							// 				create:
							// 					question.options?.map((option: Option) => ({
							// 						text: option.text,
							// 					})) || [],
							// 		  }
							// 		: undefined,
						})),
					},
					likes: {
						create: {
							user: { connect: { id: sanitizedCreatorId } },
						},
					},
				},
				select: {
					id: true,
					title: true,
					creator: { select: { id: true, name: true } },
				},
			});

			return res.status(200).json({ success: true, data: response });
		} catch (err) {
			console.log(err);
			return res.status(500).json({
				success: false,
				message: "Internal error. Please try again.",
			});
		}
	}
);

//@desc   Get a template
//@route  GET /templates/:id
//@access Private
export const getTemplate = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			if (!id) {
				return res
					.status(400)
					.json({ success: false, message: "All fields are required." });
			}

			const templateId = verifyID(id);

			const response = await prisma.template.findUnique({
				where: {
					id: templateId,
				},
				include: {
					...includeTemplate,
					questions: { select: { text: true, type: true } },
				},
			});

			if (!response) {
				return res
					.status(404)
					.json({ success: false, message: "Template not found." });
			}

			const formattedTemplate = formatTemplate(response);

			return res.status(200).json({ success: true, data: formattedTemplate });
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "Internal error. Please try again.",
			});
		}
	}
);

//@desc   Get all templates
//@route  GET /templates
//@access Private
export const getTemplates = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const response = await prisma.template.findMany({
				orderBy: { likes: { _count: "desc" } },
				include: includeTemplate,
			});

			const templates = response.map(template => formatTemplate(template));

			return res.status(200).json({
				success: true,
				count: templates.length,
				data: templates,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({
				success: false,
				message: "Internal error. Please try again.",
			});
		}
	}
);

//@desc   Deletes a template
//@route  DELETE /templates/:id
//@access Private
export const deleteTemplate = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			if (!id) {
				return res.status(400).json({
					success: false,
					message: "All fields are required.",
				});
			}

			const templateId = verifyID(id);

			await prisma.template.delete({
				where: {
					id: templateId,
				},
			});

			return res.status(200).json({
				success: true,
				message: "Template deleted.",
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({
				success: false,
				message: "Internal error. Please try again.",
			});
		}
	}
);
