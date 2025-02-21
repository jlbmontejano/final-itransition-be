import { configDotenv } from "dotenv";
import prisma from "./prisma/prismaClient";
import app from "./src/app";

async function main() {
	configDotenv();
	app.listen(process.env.PORT, () => {
		console.log("App listening on port: ", process.env.PORT);
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
