import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

type ParsedExtract = RouterOutputs["extract"]["listByCompany"][number];

function ExtractColumn({
  title,
  extract,
}: {
  title: string;
  extract: ParsedExtract | undefined;
}) {
  if (!extract) {
    return (
      <div className="border border-neutral-200 p-4">
        <h2 className="mb-2 font-medium">{title}</h2>
        <p className="text-sm text-neutral-500">Select an extract</p>
      </div>
    );
  }

  if (extract.status === "PENDING") {
    return (
      <div className="border border-neutral-200 p-4">
        <h2 className="mb-2 font-medium">
          {title}: v{extract.version}
        </h2>
        <p className="text-sm text-amber-700">Still pending…</p>
      </div>
    );
  }

  return (
    <div className="border border-neutral-200 p-4">
      <h2 className="mb-1 font-medium">
        {title}: v{extract.version}
      </h2>
      <p className="mb-4 text-xs text-neutral-500">
        Ordered {extract.orderedAt.toLocaleString()}
        {extract.readyAt && ` · ready ${extract.readyAt.toLocaleString()}`}
      </p>

      <h3 className="mb-2 text-sm font-medium">Share classes</h3>
      <ul className="mb-4 space-y-1 text-sm">
        {extract.shareClasses?.map((sc) => (
          <li key={sc.name}>
            <span className="font-medium">{sc.name}</span> — {sc.rights} (
            {sc.voting ? "voting" : "non-voting"}, nom {sc.nominalValue})
          </li>
        ))}
      </ul>

      <h3 className="mb-2 text-sm font-medium">Shareholders</h3>
      <ul className="space-y-1 text-sm">
        {extract.shareholders?.map((sh) => (
          <li key={`${sh.name}-${sh.shareClass}-${sh.shares}`}>
            {sh.name}: {sh.shares.toLocaleString()} ({sh.shareClass})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ComparePage() {
  const router = useRouter();
  const projectId = typeof router.query.id === "string" ? router.query.id : "";
  const companyId =
    typeof router.query.companyId === "string" ? router.query.companyId : "";

  const company = api.company.byId.useQuery(
    { id: companyId },
    { enabled: !!companyId },
  );
  const extracts = api.extract.listByCompany.useQuery(
    { projectCompanyId: companyId },
    {
      enabled: !!companyId,
      refetchInterval: (query) => {
        const hasPending = query.state.data?.some(
          (e) => e.status === "PENDING",
        );
        return hasPending ? 2000 : false;
      },
    },
  );

  const readyExtracts = useMemo(
    () => extracts.data?.filter((e) => e.status === "READY") ?? [],
    [extracts.data],
  );

  const [leftId, setLeftId] = useState("");
  const [rightId, setRightId] = useState("");

  const left = readyExtracts.find((e) => e.id === leftId);
  const right = readyExtracts.find((e) => e.id === rightId);

  const compareEnabled =
    !!leftId && !!rightId && leftId !== rightId && !!left && !!right;

  const comparison = api.extract.compare.useQuery(
    {
      projectCompanyId: companyId,
      leftExtractId: leftId,
      rightExtractId: rightId,
    },
    { enabled: compareEnabled },
  );

  return (
    <>
      <Head>
        <title>
          {company.data ? `Compare | ${company.data.name}` : "Compare extracts"}
        </title>
      </Head>
      <main className="mx-auto max-w-5xl p-6">
        <p className="mb-4 text-sm">
          <Link
            href={`/projects/${projectId}/companies/${companyId}`}
            className="underline"
          >
            ← Company
          </Link>
        </p>

        <h1 className="mb-2 text-2xl font-semibold">Compare extracts</h1>
        {company.data && (
          <p className="mb-6 text-sm text-neutral-600">
            {company.data.name} ({company.data.companyNumber})
          </p>
        )}

        {extracts.isLoading && <p>Loading extracts…</p>}

        {readyExtracts.length < 2 && !extracts.isLoading && (
          <p className="mb-4 text-sm text-neutral-600">
            Need at least two ready extracts to compare. Order more from the
            company page (each order settles after ~10s with slightly different
            data).
          </p>
        )}

        <div className="mb-6 flex flex-wrap gap-4">
          <label className="text-sm">
            Left
            <select
              className="ml-2 border border-neutral-300 px-2 py-1"
              value={leftId}
              onChange={(e) => setLeftId(e.target.value)}
            >
              <option value="">Select…</option>
              {readyExtracts.map((e) => (
                <option key={e.id} value={e.id}>
                  v{e.version}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            Right
            <select
              className="ml-2 border border-neutral-300 px-2 py-1"
              value={rightId}
              onChange={(e) => setRightId(e.target.value)}
            >
              <option value="">Select…</option>
              {readyExtracts.map((e) => (
                <option key={e.id} value={e.id}>
                  v{e.version}
                </option>
              ))}
            </select>
          </label>
        </div>

        {comparison.error && (
          <p className="mb-4 text-sm text-red-600">
            {comparison.error.message}
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <ExtractColumn title="Left" extract={comparison.data?.left ?? left} />
          <ExtractColumn
            title="Right"
            extract={comparison.data?.right ?? right}
          />
        </div>
      </main>
    </>
  );
}
