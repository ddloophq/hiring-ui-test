import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

export default function CompanyPage() {
  const router = useRouter();
  const projectId = typeof router.query.id === "string" ? router.query.id : "";
  const companyId =
    typeof router.query.companyId === "string" ? router.query.companyId : "";

  const utils = api.useUtils();
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
  const orderExtract = api.extract.order.useMutation({
    onSuccess: async () => {
      await utils.extract.listByCompany.invalidate({
        projectCompanyId: companyId,
      });
      await utils.company.byId.invalidate({ id: companyId });
    },
  });

  const hasPending = extracts.data?.some((e) => e.status === "PENDING");

  return (
    <>
      <Head>
        <title>
          {company.data ? `${company.data.name} | Company` : "Company"}
        </title>
      </Head>
      <main className="mx-auto max-w-3xl p-6">
        <p className="mb-4 text-sm">
          <Link href={`/projects/${projectId}`} className="underline">
            ← Project
          </Link>
        </p>

        {company.isLoading && <p>Loading…</p>}
        {company.error && (
          <p className="text-red-600">{company.error.message}</p>
        )}

        {company.data && (
          <>
            <h1 className="mb-1 text-2xl font-semibold">{company.data.name}</h1>
            <p className="mb-6 text-sm text-neutral-600">
              {company.data.companyNumber}
            </p>

            <section className="mb-8 border border-neutral-200 p-4">
              <h2 className="mb-3 text-lg font-medium">Company information</h2>
              <dl className="grid grid-cols-2 gap-2 text-sm">
                <dt className="text-neutral-500">Name</dt>
                <dd>{company.data.name}</dd>
                <dt className="text-neutral-500">Company number</dt>
                <dd>{company.data.companyNumber}</dd>
                <dt className="text-neutral-500">Company type</dt>
                <dd>{company.data.companyType}</dd>
                <dt className="text-neutral-500">Registered in</dt>
                <dd>{company.data.registeredIn}</dd>
                <dt className="text-neutral-500">Registered at</dt>
                <dd>{company.data.registeredAt.toLocaleDateString()}</dd>
                <dt className="text-neutral-500">Status</dt>
                <dd>{company.data.status}</dd>
              </dl>
            </section>

            <section>
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <h2 className="text-lg font-medium">Extracts</h2>
                <button
                  type="button"
                  className="border border-neutral-800 bg-neutral-800 px-3 py-1.5 text-sm text-white disabled:opacity-50"
                  disabled={orderExtract.isPending || hasPending}
                  onClick={() =>
                    orderExtract.mutate({ projectCompanyId: companyId })
                  }
                >
                  Order extract
                </button>
                <Link
                  href={`/projects/${projectId}/companies/${companyId}/compare`}
                  className="text-sm underline"
                >
                  Compare extracts
                </Link>
              </div>

              {orderExtract.error && (
                <p className="mb-2 text-sm text-red-600">
                  {orderExtract.error.message}
                </p>
              )}
              {hasPending && (
                <p className="mb-2 text-sm text-amber-700">
                  An order is pending (~10s). This list refreshes automatically.
                </p>
              )}

              {extracts.isLoading && <p>Loading extracts…</p>}
              {extracts.error && (
                <p className="text-red-600">{extracts.error.message}</p>
              )}

              <ul className="space-y-2">
                {extracts.data?.map((extract) => (
                  <li
                    key={extract.id}
                    className="border border-neutral-200 p-3"
                  >
                    <Link
                      href={`/projects/${projectId}/companies/${companyId}/extracts/${extract.id}`}
                      className="font-medium underline"
                    >
                      Extract v{extract.version}
                    </Link>
                    <div className="text-sm text-neutral-600">
                      {extract.status}
                      {extract.status === "PENDING" &&
                        ` · settles ${extract.settleAfter.toLocaleTimeString()}`}
                      {extract.readyAt &&
                        ` · ready ${extract.readyAt.toLocaleString()}`}
                      {` · ordered ${extract.orderedAt.toLocaleString()}`}
                    </div>
                  </li>
                ))}
              </ul>

              {extracts.data?.length === 0 && (
                <p className="text-neutral-500">No extracts ordered yet.</p>
              )}
            </section>
          </>
        )}
      </main>
    </>
  );
}
