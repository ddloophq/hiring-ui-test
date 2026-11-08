import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { api } from "~/utils/api";

export default function ProjectPage() {
  const router = useRouter();
  const projectId = typeof router.query.id === "string" ? router.query.id : "";
  const utils = api.useUtils();

  const project = api.project.byId.useQuery(
    { id: projectId },
    { enabled: !!projectId },
  );
  const catalog = api.company.catalog.useQuery();
  const addCompany = api.company.addToProject.useMutation({
    onSuccess: async () => {
      await utils.project.byId.invalidate({ id: projectId });
    },
  });

  const [selectedNumber, setSelectedNumber] = useState("");

  const existingNumbers = new Set(
    project.data?.companies.map((c) => c.companyNumber) ?? [],
  );
  const available =
    catalog.data?.filter((c) => !existingNumbers.has(c.companyNumber)) ?? [];

  return (
    <>
      <Head>
        <title>
          {project.data ? `${project.data.name} | Projects` : "Project"}
        </title>
      </Head>
      <main className="mx-auto max-w-3xl p-6">
        <p className="mb-4 text-sm">
          <Link href="/" className="underline">
            ← Projects
          </Link>
        </p>

        {project.isLoading && <p>Loading…</p>}
        {project.error && (
          <p className="text-red-600">{project.error.message}</p>
        )}

        {project.data && (
          <>
            <h1 className="mb-6 text-2xl font-semibold">{project.data.name}</h1>

            <section className="mb-8">
              <h2 className="mb-2 text-lg font-medium">Add company</h2>
              <p className="mb-3 text-sm text-neutral-600">
                From the sample catalog ({catalog.data?.length ?? 0} available
                overall).
              </p>
              <div className="flex gap-2">
                <select
                  className="flex-1 border border-neutral-300 px-3 py-2"
                  value={selectedNumber}
                  onChange={(e) => setSelectedNumber(e.target.value)}
                >
                  <option value="">Select a company…</option>
                  {available.map((c) => (
                    <option key={c.companyNumber} value={c.companyNumber}>
                      {c.name} ({c.companyNumber})
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="border border-neutral-800 bg-neutral-800 px-4 py-2 text-white disabled:opacity-50"
                  disabled={!selectedNumber || addCompany.isPending}
                  onClick={() => {
                    addCompany.mutate(
                      { projectId, companyNumber: selectedNumber },
                      {
                        onSuccess: () => setSelectedNumber(""),
                      },
                    );
                  }}
                >
                  Add
                </button>
              </div>
              {addCompany.error && (
                <p className="mt-2 text-sm text-red-600">
                  {addCompany.error.message}
                </p>
              )}
              {available.length === 0 && (
                <p className="mt-2 text-sm text-neutral-500">
                  All sample companies are already in this project.
                </p>
              )}
            </section>

            <section>
              <h2 className="mb-3 text-lg font-medium">Companies</h2>
              <ul className="space-y-2">
                {project.data.companies.map((company) => (
                  <li
                    key={company.id}
                    className="border border-neutral-200 p-3"
                  >
                    <Link
                      href={`/projects/${projectId}/companies/${company.id}`}
                      className="font-medium underline"
                    >
                      {company.name}
                    </Link>
                    <div className="text-sm text-neutral-600">
                      {company.companyNumber} · {company.status} ·{" "}
                      {company._count.extracts} extracts
                    </div>
                  </li>
                ))}
              </ul>
              {project.data.companies.length === 0 && (
                <p className="text-neutral-500">No companies yet.</p>
              )}
            </section>
          </>
        )}
      </main>
    </>
  );
}
