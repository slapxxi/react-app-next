import PageContainer from '@self/components/PageContainer';
import PageHeading from '@self/components/PageHeading';
import useStore from '@self/lib/hooks/useStore';
import { Project } from '@self/lib/types';
import Link from 'next/link';

function Projects() {
  let { selectors } = useStore();
  let projects = selectors.selectProjects();

  return (
    <PageContainer>
      <PageHeading>Projects</PageHeading>
      <Link href="/create">
        <a href="/create">Create Project</a>
      </Link>
      {projects.length === 0 ? (
        <p>There are no projects yet.</p>
      ) : (
        <ul>
          {projects.map((p: Project) => (
            <li key={p.id}>
              <Link href={`/project?projectId=${p.id}`} as={`/project/${p.id}`}>
                <a>{p.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </PageContainer>
  );
}

export default Projects;
