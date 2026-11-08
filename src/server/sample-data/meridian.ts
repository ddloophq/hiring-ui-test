/**
 * Meridian Health Technologies Ltd — a large, venture-backed cap table.
 *
 * Use it to stress tables and charts: ~30–60 shareholders, up to six share
 * classes, holders spread across several classes, long names, and holdings
 * from 12 shares to millions.
 *
 * v1 — after Series A
 * v2 — Series B, Growth shares for executives, two leavers' shares
 *      re-designated as Deferred
 * v3 — secondary sale (a founder sells most Ordinary shares to Atlas),
 *      Hartwell Angels nominee distributes to its members, last hiring wave
 *
 * Generated once from a deterministic script, then committed as plain data.
 */

import type { SampleCompany } from "./companies";

export const MERIDIAN: SampleCompany = {
  companyNumber: "11938274",
  name: "Meridian Health Technologies Ltd",
  companyType: "Private limited company",
  registeredIn: "England and Wales",
  registeredAt: new Date("2019-04-08"),
  status: "Active",
  extracts: [
    {
      shareClasses: [
        {
          name: "Ordinary",
          rights: "One vote per share; full dividend and capital rights",
          voting: true,
          nominalValue: 0.0001,
        },
        {
          name: "Seed Preferred",
          rights:
            "1x non-participating liquidation preference; converts 1:1 to Ordinary; votes as converted",
          voting: true,
          nominalValue: 0.0001,
        },
        {
          name: "Series A Preferred",
          rights:
            "1x non-participating liquidation preference, senior to Seed; anti-dilution (broad-based weighted average); votes as converted",
          voting: true,
          nominalValue: 0.0001,
        },
      ],
      shareholders: [
        {
          name: "Dr Helena Marsh",
          shares: 3150000,
          shareClass: "Ordinary",
        },
        {
          name: "Benedict Oyelaran",
          shares: 2480000,
          shareClass: "Ordinary",
        },
        {
          name: "Ravi Chandrasekaran",
          shares: 1120000,
          shareClass: "Ordinary",
        },
        {
          name: "Meridian Health EMI Trust",
          shares: 640000,
          shareClass: "Ordinary",
        },
        {
          name: "Hartwell Angels Nominees Ltd",
          shares: 310000,
          shareClass: "Seed Preferred",
        },
        {
          name: "Sir Anthony Brook",
          shares: 95000,
          shareClass: "Seed Preferred",
        },
        {
          name: "Dr Margaret Ellison",
          shares: 72500,
          shareClass: "Seed Preferred",
        },
        {
          name: "Wexford Seed Fund I LP",
          shares: 820000,
          shareClass: "Seed Preferred",
        },
        {
          name: "Primrose Hill Ventures LLP",
          shares: 410000,
          shareClass: "Seed Preferred",
        },
        {
          name: "Wexford Seed Fund I LP",
          shares: 260000,
          shareClass: "Series A Preferred",
        },
        {
          name: "Northbridge Capital Partners III LP",
          shares: 1640000,
          shareClass: "Series A Preferred",
        },
        {
          name: "Halcyon Health Innovation Fund SCSp",
          shares: 980000,
          shareClass: "Series A Preferred",
        },
        {
          name: "British Patient Capital Co-Investment Ltd",
          shares: 540000,
          shareClass: "Series A Preferred",
        },
        {
          name: "Crowdcube Nominees Limited",
          shares: 187340,
          shareClass: "Series A Preferred",
        },
        {
          name: "Aisha Bello",
          shares: 28750,
          shareClass: "Ordinary",
        },
        {
          name: "Tomasz Nowak",
          shares: 26000,
          shareClass: "Ordinary",
        },
        {
          name: "Grace Lindqvist",
          shares: 44000,
          shareClass: "Ordinary",
        },
        {
          name: "Rohan Mehta",
          shares: 34250,
          shareClass: "Ordinary",
        },
        {
          name: "Chloe Fairbairn",
          shares: 36750,
          shareClass: "Ordinary",
        },
        {
          name: "Daniel Osei",
          shares: 33750,
          shareClass: "Ordinary",
        },
        {
          name: "Mei Lin Tan",
          shares: 26000,
          shareClass: "Ordinary",
        },
        {
          name: "Hamish Rennie",
          shares: 9000,
          shareClass: "Ordinary",
        },
        {
          name: "Sofia Marchetti",
          shares: 4250,
          shareClass: "Ordinary",
        },
        {
          name: "Kwame Asante",
          shares: 12500,
          shareClass: "Ordinary",
        },
        {
          name: "Eleanor Whitcombe-Hayes",
          shares: 15250,
          shareClass: "Ordinary",
        },
        {
          name: "Arjun Pillai",
          shares: 47750,
          shareClass: "Ordinary",
        },
        {
          name: "Zara Hussain",
          shares: 34750,
          shareClass: "Ordinary",
        },
        {
          name: "Lukas Brandt",
          shares: 33000,
          shareClass: "Ordinary",
        },
        {
          name: "Jonathan Pemberton-Smythe",
          shares: 12,
          shareClass: "Ordinary",
        },
      ],
    },
    {
      shareClasses: [
        {
          name: "Ordinary",
          rights: "One vote per share; full dividend and capital rights",
          voting: true,
          nominalValue: 0.0001,
        },
        {
          name: "Seed Preferred",
          rights:
            "1x non-participating liquidation preference; converts 1:1 to Ordinary; votes as converted",
          voting: true,
          nominalValue: 0.0001,
        },
        {
          name: "Series A Preferred",
          rights:
            "1x non-participating liquidation preference, senior to Seed; anti-dilution (broad-based weighted average); votes as converted",
          voting: true,
          nominalValue: 0.0001,
        },
        {
          name: "Series B Preferred",
          rights:
            "1.5x non-participating liquidation preference, senior to Series A and Seed; anti-dilution (broad-based weighted average); investor director appointment right",
          voting: true,
          nominalValue: 0.0001,
        },
        {
          name: "Growth",
          rights:
            "Non-voting; participate in exit proceeds only above a hurdle of £4.20 per share",
          voting: false,
          nominalValue: 0.0001,
        },
        {
          name: "Deferred",
          rights:
            "No voting or dividend rights; capital right limited to £1 in aggregate",
          voting: false,
          nominalValue: 0.0001,
        },
      ],
      shareholders: [
        {
          name: "Dr Helena Marsh",
          shares: 2900000,
          shareClass: "Ordinary",
        },
        {
          name: "Benedict Oyelaran",
          shares: 2300000,
          shareClass: "Ordinary",
        },
        {
          name: "Ravi Chandrasekaran",
          shares: 1120000,
          shareClass: "Ordinary",
        },
        {
          name: "Meridian Health EMI Trust",
          shares: 410000,
          shareClass: "Ordinary",
        },
        {
          name: "Hartwell Angels Nominees Ltd",
          shares: 310000,
          shareClass: "Seed Preferred",
        },
        {
          name: "Sir Anthony Brook",
          shares: 95000,
          shareClass: "Seed Preferred",
        },
        {
          name: "Dr Margaret Ellison",
          shares: 72500,
          shareClass: "Seed Preferred",
        },
        {
          name: "Wexford Seed Fund I LP",
          shares: 820000,
          shareClass: "Seed Preferred",
        },
        {
          name: "Primrose Hill Ventures LLP",
          shares: 410000,
          shareClass: "Seed Preferred",
        },
        {
          name: "Wexford Seed Fund I LP",
          shares: 260000,
          shareClass: "Series A Preferred",
        },
        {
          name: "Northbridge Capital Partners III LP",
          shares: 1640000,
          shareClass: "Series A Preferred",
        },
        {
          name: "Halcyon Health Innovation Fund SCSp",
          shares: 980000,
          shareClass: "Series A Preferred",
        },
        {
          name: "British Patient Capital Co-Investment Ltd",
          shares: 540000,
          shareClass: "Series A Preferred",
        },
        {
          name: "Crowdcube Nominees Limited",
          shares: 187340,
          shareClass: "Series A Preferred",
        },
        {
          name: "Aisha Bello",
          shares: 28750,
          shareClass: "Ordinary",
        },
        {
          name: "Tomasz Nowak",
          shares: 26000,
          shareClass: "Ordinary",
        },
        {
          name: "Grace Lindqvist",
          shares: 44000,
          shareClass: "Ordinary",
        },
        {
          name: "Chloe Fairbairn",
          shares: 36750,
          shareClass: "Ordinary",
        },
        {
          name: "Mei Lin Tan",
          shares: 26000,
          shareClass: "Ordinary",
        },
        {
          name: "Hamish Rennie",
          shares: 9000,
          shareClass: "Ordinary",
        },
        {
          name: "Sofia Marchetti",
          shares: 4250,
          shareClass: "Ordinary",
        },
        {
          name: "Kwame Asante",
          shares: 12500,
          shareClass: "Ordinary",
        },
        {
          name: "Eleanor Whitcombe-Hayes",
          shares: 15250,
          shareClass: "Ordinary",
        },
        {
          name: "Arjun Pillai",
          shares: 47750,
          shareClass: "Ordinary",
        },
        {
          name: "Zara Hussain",
          shares: 34750,
          shareClass: "Ordinary",
        },
        {
          name: "Lukas Brandt",
          shares: 33000,
          shareClass: "Ordinary",
        },
        {
          name: "Jonathan Pemberton-Smythe",
          shares: 12,
          shareClass: "Ordinary",
        },
        {
          name: "Rohan Mehta",
          shares: 21750,
          shareClass: "Deferred",
        },
        {
          name: "Daniel Osei",
          shares: 9500,
          shareClass: "Deferred",
        },
        {
          name: "Dr Helena Marsh",
          shares: 250000,
          shareClass: "Deferred",
        },
        {
          name: "Atlas Growth Equity Fund IV LP",
          shares: 2750000,
          shareClass: "Series B Preferred",
        },
        {
          name: "Northbridge Capital Partners III LP",
          shares: 620000,
          shareClass: "Series B Preferred",
        },
        {
          name: "Halcyon Health Innovation Fund SCSp",
          shares: 410000,
          shareClass: "Series B Preferred",
        },
        {
          name: "Sakura Life Sciences Strategic Investments KK",
          shares: 900000,
          shareClass: "Series B Preferred",
        },
        {
          name: "Lucy Abernethy (Chief Operating Officer)",
          shares: 180000,
          shareClass: "Growth",
        },
        {
          name: "Marcus Delaney (Chief Financial Officer)",
          shares: 150000,
          shareClass: "Growth",
        },
        {
          name: "Priyanka Venkataraman (Chief Technology Officer)",
          shares: 150000,
          shareClass: "Growth",
        },
        {
          name: "Imogen Pryce",
          shares: 10000,
          shareClass: "Ordinary",
        },
        {
          name: "Samuel Adeyemi",
          shares: 7500,
          shareClass: "Ordinary",
        },
        {
          name: "Freya Llewellyn",
          shares: 3500,
          shareClass: "Ordinary",
        },
        {
          name: "Mateo Alvarez",
          shares: 23500,
          shareClass: "Ordinary",
        },
        {
          name: "Hannah Kowalczyk",
          shares: 22250,
          shareClass: "Ordinary",
        },
        {
          name: "Oliver Achterberg",
          shares: 22000,
          shareClass: "Ordinary",
        },
        {
          name: "Nadia Rahman",
          shares: 12250,
          shareClass: "Ordinary",
        },
        {
          name: "Callum Fraser",
          shares: 8000,
          shareClass: "Ordinary",
        },
        {
          name: "Yuki Takahashi",
          shares: 22000,
          shareClass: "Ordinary",
        },
        {
          name: "Bethan Morgan",
          shares: 2250,
          shareClass: "Ordinary",
        },
        {
          name: "Ibrahim Diallo",
          shares: 20250,
          shareClass: "Ordinary",
        },
        {
          name: "Charlotte de Vries",
          shares: 25000,
          shareClass: "Ordinary",
        },
      ],
    },
    {
      shareClasses: [
        {
          name: "Ordinary",
          rights: "One vote per share; full dividend and capital rights",
          voting: true,
          nominalValue: 0.0001,
        },
        {
          name: "Seed Preferred",
          rights:
            "1x non-participating liquidation preference; converts 1:1 to Ordinary; votes as converted",
          voting: true,
          nominalValue: 0.0001,
        },
        {
          name: "Series A Preferred",
          rights:
            "1x non-participating liquidation preference, senior to Seed; anti-dilution (broad-based weighted average); votes as converted",
          voting: true,
          nominalValue: 0.0001,
        },
        {
          name: "Series B Preferred",
          rights:
            "1.5x non-participating liquidation preference, senior to Series A and Seed; anti-dilution (broad-based weighted average); investor director appointment right",
          voting: true,
          nominalValue: 0.0001,
        },
        {
          name: "Growth",
          rights:
            "Non-voting; participate in exit proceeds only above a hurdle of £4.20 per share",
          voting: false,
          nominalValue: 0.0001,
        },
        {
          name: "Deferred",
          rights:
            "No voting or dividend rights; capital right limited to £1 in aggregate",
          voting: false,
          nominalValue: 0.0001,
        },
      ],
      shareholders: [
        {
          name: "Dr Helena Marsh",
          shares: 2900000,
          shareClass: "Ordinary",
        },
        {
          name: "Benedict Oyelaran",
          shares: 2300000,
          shareClass: "Ordinary",
        },
        {
          name: "Meridian Health EMI Trust",
          shares: 388250,
          shareClass: "Ordinary",
        },
        {
          name: "Sir Anthony Brook",
          shares: 95000,
          shareClass: "Seed Preferred",
        },
        {
          name: "Dr Margaret Ellison",
          shares: 72500,
          shareClass: "Seed Preferred",
        },
        {
          name: "Wexford Seed Fund I LP",
          shares: 820000,
          shareClass: "Seed Preferred",
        },
        {
          name: "Primrose Hill Ventures LLP",
          shares: 410000,
          shareClass: "Seed Preferred",
        },
        {
          name: "Wexford Seed Fund I LP",
          shares: 260000,
          shareClass: "Series A Preferred",
        },
        {
          name: "Northbridge Capital Partners III LP",
          shares: 1640000,
          shareClass: "Series A Preferred",
        },
        {
          name: "Halcyon Health Innovation Fund SCSp",
          shares: 980000,
          shareClass: "Series A Preferred",
        },
        {
          name: "British Patient Capital Co-Investment Ltd",
          shares: 540000,
          shareClass: "Series A Preferred",
        },
        {
          name: "Crowdcube Nominees Limited",
          shares: 214910,
          shareClass: "Series A Preferred",
        },
        {
          name: "Aisha Bello",
          shares: 28750,
          shareClass: "Ordinary",
        },
        {
          name: "Tomasz Nowak",
          shares: 26000,
          shareClass: "Ordinary",
        },
        {
          name: "Grace Lindqvist",
          shares: 44000,
          shareClass: "Ordinary",
        },
        {
          name: "Chloe Fairbairn",
          shares: 36750,
          shareClass: "Ordinary",
        },
        {
          name: "Mei Lin Tan",
          shares: 26000,
          shareClass: "Ordinary",
        },
        {
          name: "Hamish Rennie",
          shares: 9000,
          shareClass: "Ordinary",
        },
        {
          name: "Sofia Marchetti",
          shares: 4250,
          shareClass: "Ordinary",
        },
        {
          name: "Kwame Asante",
          shares: 12500,
          shareClass: "Ordinary",
        },
        {
          name: "Eleanor Whitcombe-Hayes",
          shares: 15250,
          shareClass: "Ordinary",
        },
        {
          name: "Arjun Pillai",
          shares: 47750,
          shareClass: "Ordinary",
        },
        {
          name: "Zara Hussain",
          shares: 34750,
          shareClass: "Ordinary",
        },
        {
          name: "Lukas Brandt",
          shares: 33000,
          shareClass: "Ordinary",
        },
        {
          name: "Jonathan Pemberton-Smythe",
          shares: 12,
          shareClass: "Ordinary",
        },
        {
          name: "Rohan Mehta",
          shares: 21750,
          shareClass: "Deferred",
        },
        {
          name: "Daniel Osei",
          shares: 9500,
          shareClass: "Deferred",
        },
        {
          name: "Dr Helena Marsh",
          shares: 250000,
          shareClass: "Deferred",
        },
        {
          name: "Atlas Growth Equity Fund IV LP",
          shares: 2750000,
          shareClass: "Series B Preferred",
        },
        {
          name: "Northbridge Capital Partners III LP",
          shares: 620000,
          shareClass: "Series B Preferred",
        },
        {
          name: "Halcyon Health Innovation Fund SCSp",
          shares: 410000,
          shareClass: "Series B Preferred",
        },
        {
          name: "Sakura Life Sciences Strategic Investments KK",
          shares: 900000,
          shareClass: "Series B Preferred",
        },
        {
          name: "Lucy Abernethy (Chief Operating Officer)",
          shares: 180000,
          shareClass: "Growth",
        },
        {
          name: "Marcus Delaney (Chief Financial Officer)",
          shares: 150000,
          shareClass: "Growth",
        },
        {
          name: "Priyanka Venkataraman (Chief Technology Officer)",
          shares: 150000,
          shareClass: "Growth",
        },
        {
          name: "Imogen Pryce",
          shares: 10000,
          shareClass: "Ordinary",
        },
        {
          name: "Samuel Adeyemi",
          shares: 7500,
          shareClass: "Ordinary",
        },
        {
          name: "Freya Llewellyn",
          shares: 3500,
          shareClass: "Ordinary",
        },
        {
          name: "Mateo Alvarez",
          shares: 23500,
          shareClass: "Ordinary",
        },
        {
          name: "Hannah Kowalczyk",
          shares: 22250,
          shareClass: "Ordinary",
        },
        {
          name: "Oliver Achterberg",
          shares: 22000,
          shareClass: "Ordinary",
        },
        {
          name: "Nadia Rahman",
          shares: 12250,
          shareClass: "Ordinary",
        },
        {
          name: "Callum Fraser",
          shares: 8000,
          shareClass: "Ordinary",
        },
        {
          name: "Yuki Takahashi",
          shares: 22000,
          shareClass: "Ordinary",
        },
        {
          name: "Bethan Morgan",
          shares: 2250,
          shareClass: "Ordinary",
        },
        {
          name: "Ibrahim Diallo",
          shares: 20250,
          shareClass: "Ordinary",
        },
        {
          name: "Charlotte de Vries",
          shares: 25000,
          shareClass: "Ordinary",
        },
        {
          name: "Ravi Chandrasekaran",
          shares: 120000,
          shareClass: "Ordinary",
        },
        {
          name: "Atlas Growth Equity Fund IV LP",
          shares: 1000000,
          shareClass: "Ordinary",
        },
        {
          name: "Fenwick Family Office Ltd",
          shares: 104000,
          shareClass: "Seed Preferred",
        },
        {
          name: "Catriona Hale",
          shares: 61000,
          shareClass: "Seed Preferred",
        },
        {
          name: "Oluwaseun Adebayo-Williams",
          shares: 58000,
          shareClass: "Seed Preferred",
        },
        {
          name: "Thomas & Mary Greenhalgh (joint)",
          shares: 47000,
          shareClass: "Seed Preferred",
        },
        {
          name: "The Kingsbury 2019 Discretionary Settlement",
          shares: 40000,
          shareClass: "Seed Preferred",
        },
        {
          name: "Baroness Ruth Ashby (Non-Executive Director)",
          shares: 35000,
          shareClass: "Growth",
        },
        {
          name: "Rhys Pritchard",
          shares: 7250,
          shareClass: "Ordinary",
        },
        {
          name: "Ananya Krishnan",
          shares: 1500,
          shareClass: "Ordinary",
        },
        {
          name: "Patrick O'Sullivan",
          shares: 3250,
          shareClass: "Ordinary",
        },
        {
          name: "Leila Haddad",
          shares: 6000,
          shareClass: "Ordinary",
        },
        {
          name: "Georgina Ashworth-Clarke",
          shares: 1000,
          shareClass: "Ordinary",
        },
        {
          name: "Ewan McAllister",
          shares: 2750,
          shareClass: "Ordinary",
        },
      ],
    },
  ],
};
