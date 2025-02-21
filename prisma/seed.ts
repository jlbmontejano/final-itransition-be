import prisma from "./prismaClient";

async function main() {
	const response = await prisma.topic.createMany({
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
