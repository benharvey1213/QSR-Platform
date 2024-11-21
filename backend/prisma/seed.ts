import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function hashPassword(password: string) : Promise<string> {
	return hash(password, 10);
}

async function main() {
	const adminPassword = await hashPassword(process.env.STARTER_ADMIN_PASSWORD);
	const editorPassword = await hashPassword(process.env.STARTER_EDITOR_PASSWORD);

	// Add starter users
	await prisma.user.createMany({
		data: [
			{ email: 'admin@example.com', password: adminPassword, role: 'ADMIN' },
			{ email: 'editor@example.com', password: editorPassword, role: 'EDITOR' },
		],
		skipDuplicates: true,
	});

	// Add starter menu items
	await prisma.menuItem.createMany({
		data: [
			{
				name: "Veggie Burger",
				description: "A delicious plant-based burger",
				price: 5.99,
			},
			{
				name: "French Fries",
				description: "Crispy and golden brown",
				price: 2.99,
			}
		],
		skipDuplicates: true,
	})

	console.log('Starter data has been added!');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});