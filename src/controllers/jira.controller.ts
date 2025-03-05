import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";

//@desc   Create Jira ticket
//@route  POST /tickets
//@access Private
export const createTicket = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, link, title, summary, priority } = req.body;

			if (!email || !link || !summary || !priority) {
				return res.status(400).json({
					success: false,
					message: "All fields are required.",
				});
			}

			// Check for user
			const userResponse = await fetch(
				`${process.env.JIRA_URL}/user/search?query=${email}`,
				{
					method: "GET",
					headers: {
						Authorization: `Basic ${Buffer.from(
							`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_KEY}`
						).toString("base64")}`,
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				}
			);

			let user: any = await userResponse.json();

			// Create user if it doesn't exists
			if (user.length === 0) {
				const createResponse = await fetch(`${process.env.JIRA_URL}/user`, {
					method: "POST",
					headers: {
						Authorization: `Basic ${Buffer.from(
							`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_KEY}`
						).toString("base64")}`,
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						emailAddress: email,
						products: [],
					}),
				});

				user = await createResponse.json();
			} else {
				user = user[0];
			}

			// Prepare data for ticket
			const bodyData = {
				fields: {
					project: {
						key: "SCRUM",
					},
					issuetype: {
						name: "Ticket",
					},
					summary,
					description: {
						version: 1,
						type: "doc",
						content: [
							{
								type: "paragraph",
								content: [
									{
										type: "text",
										text: title,
									},
								],
							},
						],
					},
					customfield_10037: link || "",
					priority: {
						name: priority,
					},
					reporter: {
						id: user.accountId,
					},
				},
			};

			const ticketResponse = await fetch(`${process.env.JIRA_URL}/issue`, {
				method: "POST",
				headers: {
					Authorization: `Basic ${Buffer.from(
						`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_KEY}`
					).toString("base64")}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(bodyData),
			});

			const ticket = await ticketResponse.json();

			return res.status(201).json({
				success: true,
			});
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "Internal error. Please try again.",
			});
		}
	}
);

//@desc   Get a user's Jira's tickets
//@route  GET /tickets/:email
//@access Private
export const getUserTickets = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email } = req.params;

			if (!email) {
				return res.status(400).json({
					success: false,
					message: "All fields are required.",
				});
			}

			const sanitizedEmail = email.split("@").join("\\u0040");

			const jql = `reporter=${sanitizedEmail} AND issuetype=Ticket`;

			const response = await fetch(
				`${process.env.JIRA_URL}/search?jql=${jql}`,
				{
					method: "GET",
					headers: {
						Authorization: `Basic ${Buffer.from(
							`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_KEY}`
						).toString("base64")}`,
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				}
			);

			const tickets = await response.json();

			return res.status(201).json({
				success: true,
				data: tickets,
			});
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "Internal error. Please try again.",
			});
		}
	}
);
