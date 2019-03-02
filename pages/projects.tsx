import PageContainer from '@self/components/PageContainer';
import PageHeading from '@self/components/PageHeading';
import Link from 'next/link';

function Projects() {
  return (
    <PageContainer>
      <PageHeading>Projects</PageHeading>
      <Link href="/create">
        <a href="/create">Create Project</a>
      </Link>
      <p>There are no projects yet.</p>
    </PageContainer>
  );
}

export default Projects;
