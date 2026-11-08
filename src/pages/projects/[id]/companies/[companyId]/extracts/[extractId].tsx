import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

export default function ExtractPage() {
  const router = useRouter();
  const projectId = typeof router.query.id === "string" ? router.query.id : "";
  const companyId =
    typeof router.query.companyId === "string" ? router.query.companyId : "";
  const extractId =
    typeof router.query.extractId === "string" ? router.query.extractId : "";

  const extract = api.extract.byId.useQuery(
    { id: extractId },
    {
      enabled: !!extractId,
      refetchInterval: (query) =>
        query.state.data?.status === "PENDING" ? 2000 : false,
    },
  );

  return (
    <>
      <Head>
        <title>
          {extract.data
            ? `Extract v${extract.data.version} | ${extract.data.projectCompany.name}`
            : "Extract"}
        </title>
      </Head>
      <main className="mx-auto max-w-3xl p-6">
        <p className="mb-4 text-sm">
          <Link
            href={`/projects/${projectId}/companies/${companyId}`}
            className="underline"
          >
            ← Company
          </Link>
        </p>

        {extract.isLoading && <p>Loading…</p>}
        {extract.error && (
          <p className="text-red-600">{extract.error.message}</p>
        )}

        {extract.data && (
          <>
            <h1 className="mb-1 text-2xl font-semibold">
              Extract v{extract.data.version}
            </h1>
            <p className="mb-6 text-sm text-neutral-600">
              {extract.data.projectCompany.name} · {extract.data.status}
            </p>

            {extract.data.status === "PENDING" && (
              <p className="mb-4 border border-amber-300 bg-amber-50 p-3 text-sm">
                Order pending. Settles around{" "}
                {extract.data.settleAfter.toLocaleTimeString()}. Refreshing
                automatically…
              </p>
            )}

            {extract.data.status === "READY" && (
              <>
                <section className="mb-8">
                  <h2 className="mb-3 text-lg font-medium">Share classes</h2>
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="py-2 pr-2">Name</th>
                        <th className="py-2 pr-2">Rights</th>
                        <th className="py-2 pr-2">Voting</th>
                        <th className="py-2">Nominal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {extract.data.shareClasses?.map((sc) => (
                        <tr
                          key={sc.name}
                          className="border-b border-neutral-100"
                        >
                          <td className="py-2 pr-2">{sc.name}</td>
                          <td className="py-2 pr-2">{sc.rights}</td>
                          <td className="py-2 pr-2">
                            {sc.voting ? "Yes" : "No"}
                          </td>
                          <td className="py-2">{sc.nominalValue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>

                <section>
                  <h2 className="mb-3 text-lg font-medium">Shareholders</h2>
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="py-2 pr-2">Name</th>
                        <th className="py-2 pr-2">Shares</th>
                        <th className="py-2">Class</th>
                      </tr>
                    </thead>
                    <tbody>
                      {extract.data.shareholders?.map((sh) => (
                        <tr
                          key={`${sh.name}-${sh.shareClass}-${sh.shares}`}
                          className="border-b border-neutral-100"
                        >
                          <td className="py-2 pr-2">{sh.name}</td>
                          <td className="py-2 pr-2">
                            {sh.shares.toLocaleString()}
                          </td>
                          <td className="py-2">{sh.shareClass}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
