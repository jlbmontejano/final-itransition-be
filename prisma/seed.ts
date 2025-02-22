import bcrypt from "bcrypt";
import prisma from "./prismaClient";

async function main() {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash("1", saltRounds);

	const admin = await prisma.user.create({
		data: {
			name: "Admin",
			email: "admin@test.com",
			password: hashedPassword,
			role: "ADMIN",
		},
	});

	const topics = await prisma.topic.createMany({
		data: [
			{ text: "Math" },
			{ text: "History" },
			{ text: "Education" },
			{ text: "Music" },
			{ text: "Science" },
		],
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
