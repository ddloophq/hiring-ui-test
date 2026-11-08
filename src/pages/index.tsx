import Head from "next/head";
import Link from "next/link";
import { type FormEvent, useState } from "react";

import { api } from "~/utils/api";

export default function HomePage() {
  const utils = api.useUtils();
  const projects = api.project.list.useQuery();
  const createProject = api.project.create.useMutation({
    onSuccess: async () => {
      setName("");
      await utils.project.list.invalidate();
    },
  });
  const [name, setName] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    createProject.mutate({ name: name.trim() });
  }

  return (
    <>
      <Head>
        <title>Projects | Company Extracts</title>
      </Head>
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="mb-2 text-2xl font-semibold">Projects</h1>
        <p className="mb-6 text-sm text-neutral-600">
          Create a project, add companies, order extracts, compare over time.
        </p>

        <form onSubmit={onSubmit} className="mb-8 flex gap-2">
          <input
            className="flex-1 border border-neutral-300 px-3 py-2"
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="border border-neutral-800 bg-neutral-800 px-4 py-2 text-white disabled:opacity-50"
            disabled={createProject.isPending || !name.trim()}
          >
            Create
          </button>
        </form>

        {projects.isLoading && <p>Loading…</p>}
        {projects.error && (
          <p className="text-red-600">{projects.error.message}</p>
        )}

        <ul className="space-y-2">
          {projects.data?.map((project) => (
            <li key={project.id} className="border border-neutral-200 p-3">
              <Link
                href={`/projects/${project.id}`}
                className="font-medium underline"
              >
                {project.name}
              </Link>
              <div className="text-sm text-neutral-600">
                {project._count.companies} companies · created{" "}
                {project.createdAt.toLocaleString()}
              </div>
            </li>
          ))}
        </ul>

        {projects.data?.length === 0 && (
          <p className="text-neutral-500">No projects yet.</p>
        )}
      </main>
    </>
  );
}
