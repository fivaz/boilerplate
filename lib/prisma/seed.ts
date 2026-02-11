import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

async function safeDelete(modelDelete: () => Promise<unknown>) {
	try {
		await modelDelete();
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2021") {
			console.warn("⚠️ Table not found, skipping delete.");
		} else {
			throw error;
		}
	}
}

async function main() {
	const DEV_USER_ID = "demo-user-id";
	const DEV_ACCOUNT_ID = "account-123";
	const EMAIL = "test@test.com";

	console.log("🚀 Starting seed...");

	// --- 1️⃣ Cleanup ---
	console.log("🧹 Cleaning up existing data...");
	// await safeDelete(() => prisma.[newTable].deleteMany());

	// --- 2️⃣ Create or upsert user ---
	const user = await prisma.user.upsert({
		where: { id: DEV_USER_ID },
		update: {},
		create: {
			id: DEV_USER_ID,
			name: "Demo User",
			email: EMAIL,
			emailVerified: true,
		},
	});

	// --- 3️⃣ Create or upsert account ---
	await prisma.account.upsert({
		where: { id: DEV_ACCOUNT_ID },
		update: {},
		create: {
			id: DEV_ACCOUNT_ID,
			userId: user.id,
			accountId: EMAIL,
			providerId: "credential",
			password:
				"572915f247a8c5c4be56201a48bad84f:0b983fe1a6c3b51a9207c10d21e02f74606803844806e8d45f39e80ccb7b4529108cdc21b24488ae6a5ce60d61b9a2cf94294e20a50525903c0bd05aa07006ca",
		},
	});

	console.log("✅ Seed completed");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
