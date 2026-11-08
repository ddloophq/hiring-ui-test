import { db } from "~/server/db";
import {
  type ExtractSnapshot,
  getExtractSnapshot,
} from "~/server/sample-data/companies";
import {
  type CompanyExtract,
  ExtractStatus,
} from "../../generated/prisma/client";

export type ParsedExtract = Omit<
  CompanyExtract,
  "shareholders" | "shareClasses"
> & {
  shareholders: ExtractSnapshot["shareholders"] | null;
  shareClasses: ExtractSnapshot["shareClasses"] | null;
};

function parseJsonField<T>(value: string | null): T | null {
  if (!value) return null;
  return JSON.parse(value) as T;
}

export function serializeExtract(extract: CompanyExtract): ParsedExtract {
  return {
    ...extract,
    shareholders: parseJsonField(extract.shareholders),
    shareClasses: parseJsonField(extract.shareClasses),
  };
}

/**
 * Settle a pending extract: load its snapshot and mark it READY.
 * Called only from the Inngest `settle-ordered-extract` function.
 */
export async function settleExtract(
  extractId: string,
): Promise<CompanyExtract> {
  const extract = await db.companyExtract.findUniqueOrThrow({
    where: { id: extractId },
    include: { projectCompany: true },
  });

  if (extract.status !== ExtractStatus.PENDING) {
    return extract;
  }

  const snapshot = getExtractSnapshot(
    extract.projectCompany.companyNumber,
    extract.version,
  );
  if (!snapshot) {
    throw new Error(
      `No snapshot for company ${extract.projectCompany.companyNumber} v${extract.version}`,
    );
  }

  return db.companyExtract.update({
    where: { id: extract.id },
    data: {
      status: ExtractStatus.READY,
      readyAt: new Date(),
      shareholders: JSON.stringify(snapshot.shareholders),
      shareClasses: JSON.stringify(snapshot.shareClasses),
    },
  });
}
