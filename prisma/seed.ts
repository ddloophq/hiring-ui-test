import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../generated/prisma/client";
import { getSeededCompanies } from "../src/server/sample-data/companies";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is not set");

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({ url: databaseUrl }),
});

async function main() {
  await prisma.companyExtract.deleteMany();
  await prisma.projectCompany.deleteMany();
  await prisma.project.deleteMany();

  const companies = getSeededCompanies();

  await prisma.project.create({
    data: {
      name: "Demo diligence",
      companies: {
        create: companies.map((company) => ({
          companyNumber: company.companyNumber,
          name: company.name,
          companyType: company.companyType,
          registeredIn: company.registeredIn,
          registeredAt: company.registeredAt,
          status: company.status,
        })),
      },
    },
  });

  console.log(
    `Seeded demo project with ${companies.map((c) => c.name).join(", ")}`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
