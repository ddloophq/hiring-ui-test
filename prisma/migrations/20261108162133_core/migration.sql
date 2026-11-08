-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ProjectCompany" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "companyNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "companyType" TEXT NOT NULL,
    "registeredIn" TEXT NOT NULL,
    "registeredAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProjectCompany_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompanyExtract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectCompanyId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "orderedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readyAt" DATETIME,
    "settleAfter" DATETIME NOT NULL,
    "shareholders" TEXT,
    "shareClasses" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CompanyExtract_projectCompanyId_fkey" FOREIGN KEY ("projectCompanyId") REFERENCES "ProjectCompany" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "ProjectCompany_projectId_idx" ON "ProjectCompany"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectCompany_projectId_companyNumber_key" ON "ProjectCompany"("projectId", "companyNumber");

-- CreateIndex
CREATE INDEX "CompanyExtract_projectCompanyId_idx" ON "CompanyExtract"("projectCompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyExtract_projectCompanyId_version_key" ON "CompanyExtract"("projectCompanyId", "version");
