/**
 * Catalog of sample companies + extract snapshots used when an order settles.
 *
 * Thames Digital Solutions PLC is the richest story for UI work (multi-class,
 * large ownership swings, a corporate shareholder that is also in this catalog).
 * Highland Forge Ltd is that linked corporate shareholder.
 * Meridian Health Technologies Ltd is the large cap table (see meridian.ts).
 * Belfast Marine is a quieter baseline for contrast.
 */

import { MERIDIAN } from "./meridian";

export type Shareholder = {
  name: string;
  shares: number;
  shareClass: string;
  /**
   * When set, this shareholder is also a company in SAMPLE_COMPANIES.
   * Use for “link / add to project / order extract” UX.
   */
  companyNumber?: string;
};

export type ShareClass = {
  name: string;
  rights: string;
  voting: boolean;
  nominalValue: number;
};

export type CompanyProfile = {
  companyNumber: string;
  name: string;
  companyType: string;
  registeredIn: string;
  registeredAt: Date;
  status: string;
};

export type ExtractSnapshot = {
  shareholders: Shareholder[];
  shareClasses: ShareClass[];
};

export type SampleCompany = CompanyProfile & {
  extracts: ExtractSnapshot[];
};

/** Company with the most interesting ownership / class changes across extracts */
export const FEATURED_COMPANY_NUMBER = "08472931";

/** Corporate shareholder of the featured company; also in the catalog */
export const LINKED_SHAREHOLDER_COMPANY_NUMBER = "SC123456";

/** Company with a large cap table (dozens of shareholders, six classes) */
export const LARGE_COMPANY_NUMBER = MERIDIAN.companyNumber;

export const SAMPLE_COMPANIES: SampleCompany[] = [
  {
    companyNumber: "08472931",
    name: "Thames Digital Solutions PLC",
    companyType: "Public limited company",
    registeredIn: "England and Wales",
    registeredAt: new Date("2013-09-02"),
    status: "Active",
    extracts: [
      // v1 — founder-controlled, single class, clean pie chart
      {
        shareClasses: [
          {
            name: "Ordinary",
            rights: "One vote per share; full dividend rights",
            voting: true,
            nominalValue: 0.1,
          },
        ],
        shareholders: [
          { name: "Priya Sharma", shares: 520_000, shareClass: "Ordinary" },
          { name: "James Okonkwo", shares: 280_000, shareClass: "Ordinary" },
          {
            name: "Employee Benefit Trust",
            shares: 120_000,
            shareClass: "Ordinary",
          },
          {
            name: "Early Angel Nominees Ltd",
            shares: 80_000,
            shareClass: "Ordinary",
          },
        ],
      },
      // v2 — Series A: Highland Forge (catalog company) enters; Preference A created;
      // founders diluted; one early angel largely exits
      {
        shareClasses: [
          {
            name: "Ordinary",
            rights: "One vote per share; full dividend rights",
            voting: true,
            nominalValue: 0.1,
          },
          {
            name: "Preference A",
            rights: "1x non-participating preference; converts 1:1 to Ordinary",
            voting: true,
            nominalValue: 0.1,
          },
        ],
        shareholders: [
          { name: "Priya Sharma", shares: 400_000, shareClass: "Ordinary" },
          { name: "James Okonkwo", shares: 200_000, shareClass: "Ordinary" },
          {
            name: "Employee Benefit Trust",
            shares: 100_000,
            shareClass: "Ordinary",
          },
          {
            name: "Early Angel Nominees Ltd",
            shares: 20_000,
            shareClass: "Ordinary",
          },
          {
            name: "Highland Forge Ltd",
            shares: 350_000,
            shareClass: "Preference A",
            companyNumber: LINKED_SHAREHOLDER_COMPANY_NUMBER,
          },
          {
            name: "Orbit Angel Syndicate",
            shares: 80_000,
            shareClass: "Preference A",
          },
        ],
      },
      // v3 — secondary + new class: Highland Forge ups stake on Ordinary;
      // James largely exits; Deferred pool for key hires; EBT shrinks
      {
        shareClasses: [
          {
            name: "Ordinary",
            rights: "One vote per share; full dividend rights",
            voting: true,
            nominalValue: 0.1,
          },
          {
            name: "Preference A",
            rights: "1x non-participating preference; converts 1:1 to Ordinary",
            voting: true,
            nominalValue: 0.1,
          },
          {
            name: "Deferred",
            rights: "No voting until conversion; economic rights on exit only",
            voting: false,
            nominalValue: 0.01,
          },
        ],
        shareholders: [
          { name: "Priya Sharma", shares: 360_000, shareClass: "Ordinary" },
          { name: "James Okonkwo", shares: 40_000, shareClass: "Ordinary" },
          {
            name: "Employee Benefit Trust",
            shares: 60_000,
            shareClass: "Ordinary",
          },
          {
            name: "Highland Forge Ltd",
            shares: 120_000,
            shareClass: "Ordinary",
            companyNumber: LINKED_SHAREHOLDER_COMPANY_NUMBER,
          },
          {
            name: "Highland Forge Ltd",
            shares: 350_000,
            shareClass: "Preference A",
            companyNumber: LINKED_SHAREHOLDER_COMPANY_NUMBER,
          },
          {
            name: "Orbit Angel Syndicate",
            shares: 100_000,
            shareClass: "Preference A",
          },
          {
            name: "Founder Pool Nominee",
            shares: 75_000,
            shareClass: "Deferred",
          },
        ],
      },
    ],
  },
  {
    companyNumber: "SC123456",
    name: "Highland Forge Ltd",
    companyType: "Private limited company",
    registeredIn: "Scotland",
    registeredAt: new Date("2018-03-14"),
    status: "Active",
    extracts: [
      {
        shareClasses: [
          {
            name: "Ordinary",
            rights: "Full voting and dividend rights",
            voting: true,
            nominalValue: 1,
          },
        ],
        shareholders: [
          { name: "Alistair MacLeod", shares: 7_000, shareClass: "Ordinary" },
          { name: "Fiona Grant", shares: 3_000, shareClass: "Ordinary" },
        ],
      },
      {
        shareClasses: [
          {
            name: "Ordinary",
            rights: "Full voting and dividend rights",
            voting: true,
            nominalValue: 1,
          },
          {
            name: "Preference A",
            rights: "Fixed 6% dividend, no voting",
            voting: false,
            nominalValue: 1,
          },
        ],
        shareholders: [
          { name: "Alistair MacLeod", shares: 5_500, shareClass: "Ordinary" },
          { name: "Fiona Grant", shares: 3_000, shareClass: "Ordinary" },
          {
            name: "Caledonia Holdings LLP",
            shares: 1_500,
            shareClass: "Preference A",
          },
        ],
      },
      {
        shareClasses: [
          {
            name: "Ordinary",
            rights: "Full voting and dividend rights",
            voting: true,
            nominalValue: 1,
          },
          {
            name: "Preference A",
            rights: "Fixed 6% dividend, no voting",
            voting: false,
            nominalValue: 1,
          },
          {
            name: "Growth B",
            rights: "Non-voting, participating dividend",
            voting: false,
            nominalValue: 0.01,
          },
        ],
        shareholders: [
          { name: "Alistair MacLeod", shares: 5_000, shareClass: "Ordinary" },
          { name: "Fiona Grant", shares: 3_000, shareClass: "Ordinary" },
          {
            name: "Caledonia Holdings LLP",
            shares: 1_500,
            shareClass: "Preference A",
          },
          {
            name: "North Sea Ventures Ltd",
            shares: 500,
            shareClass: "Growth B",
          },
        ],
      },
    ],
  },
  {
    companyNumber: "NI612048",
    name: "Belfast Marine Components Ltd",
    companyType: "Private limited company",
    registeredIn: "Northern Ireland",
    registeredAt: new Date("2015-11-20"),
    status: "Active",
    extracts: [
      {
        shareClasses: [
          {
            name: "Ordinary A",
            rights: "Full voting rights",
            voting: true,
            nominalValue: 1,
          },
          {
            name: "Ordinary B",
            rights: "Economic rights only",
            voting: false,
            nominalValue: 1,
          },
        ],
        shareholders: [
          { name: "Owen Kerr", shares: 4_000, shareClass: "Ordinary A" },
          { name: "Niamh Doyle", shares: 3_500, shareClass: "Ordinary A" },
          { name: "Harbour Trust Co", shares: 2_500, shareClass: "Ordinary B" },
        ],
      },
      {
        shareClasses: [
          {
            name: "Ordinary A",
            rights: "Full voting rights",
            voting: true,
            nominalValue: 1,
          },
          {
            name: "Ordinary B",
            rights: "Economic rights only",
            voting: false,
            nominalValue: 1,
          },
        ],
        shareholders: [
          { name: "Owen Kerr", shares: 4_500, shareClass: "Ordinary A" },
          { name: "Niamh Doyle", shares: 3_000, shareClass: "Ordinary A" },
          { name: "Harbour Trust Co", shares: 2_500, shareClass: "Ordinary B" },
        ],
      },
      {
        shareClasses: [
          {
            name: "Ordinary A",
            rights: "Full voting rights",
            voting: true,
            nominalValue: 1,
          },
          {
            name: "Ordinary B",
            rights: "Economic rights only",
            voting: false,
            nominalValue: 1,
          },
        ],
        shareholders: [
          { name: "Owen Kerr", shares: 4_500, shareClass: "Ordinary A" },
          { name: "Niamh Doyle", shares: 2_500, shareClass: "Ordinary A" },
          { name: "Harbour Trust Co", shares: 2_000, shareClass: "Ordinary B" },
          {
            name: "Lagan Industrial Partners",
            shares: 1_000,
            shareClass: "Ordinary B",
          },
        ],
      },
    ],
  },
  MERIDIAN,
];

export function listSampleCompanies(): CompanyProfile[] {
  return SAMPLE_COMPANIES.map(({ extracts: _extracts, ...profile }) => profile);
}

export function getSampleCompany(
  companyNumber: string,
): SampleCompany | undefined {
  return SAMPLE_COMPANIES.find((c) => c.companyNumber === companyNumber);
}

/** Companies the seed adds to the demo project, in display order */
export function getSeededCompanies(): SampleCompany[] {
  return [FEATURED_COMPANY_NUMBER, LARGE_COMPANY_NUMBER].map(
    (companyNumber) => {
      const company = getSampleCompany(companyNumber);
      if (!company) {
        throw new Error(`Seeded company ${companyNumber} missing from catalog`);
      }
      return company;
    },
  );
}

/** 1-based version; cycles last snapshot if more orders than seeded versions */
export function getExtractSnapshot(
  companyNumber: string,
  version: number,
): ExtractSnapshot | undefined {
  const company = getSampleCompany(companyNumber);
  if (!company || company.extracts.length === 0) return undefined;

  const index = Math.min(version - 1, company.extracts.length - 1);
  return company.extracts[index];
}

/** How long an ordered extract stays PENDING (Inngest sleep + settleAfter estimate). */
export const EXTRACT_SETTLE_DELAY_MS = 10_000;
