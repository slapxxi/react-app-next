import Button from '@self/components/Button';
import FormInput from '@self/components/FormInput';
import withAuth from '@self/components/hocs/withAuth';
import PageContainer from '@self/components/PageContainer';
import PageHeading from '@self/components/PageHeading';
import useForm from '@self/lib/hooks/useForm';
import useStore from '@self/lib/hooks/useStore';
import redirectTo from '@self/lib/redirectTo';
import fetchProject from '@self/lib/services/fetchProject';
import { Project, SessionContext, ValidationErrors } from '@self/lib/types';
import isEmpty from 'lodash-es/isEmpty';
import map from 'lodash-es/map';
import { NextComponentType } from 'next';
import Router from 'next/router';
import { ChangeEvent } from 'react';

type InputEvent = ChangeEvent<HTMLInputElement>;

interface Props {
  project?: Project;
  projectId: string;
}

// TODO: Remove duplication
function EditProject({ project, projectId }: Props) {
  let { actions, selectors } = useStore();

  if (!project) {
    project = selectors.selectProject(projectId);
  }

  if (!project) {
    return Router.push('/projects');
  }

  let [form, formActions] = useForm({
    fields: { title: project.title, description: project.description },
  });

  function updateTitle(event: InputEvent) {
    formActions.update({ title: event.target.value });
  }

  function updateDescription(event: InputEvent) {
    formActions.update({ description: event.target.value });
  }

  function handleUpdate() {
    if (isEmpty(form.errors)) {
      actions.updateProject({ ...project!, ...form.formState });
      Router.push(`/project?projectId=${project!.id}`, `/project/${project!.id}`);
    }
  }

  return (
    <PageContainer>
      <PageHeading>Edit - &quot;{project.title}&quot;</PageHeading>
      <div>
        <label htmlFor="edit-title">Title</label>
        <FormInput
          id="edit-title"
          value={form.formState.title}
          onChange={updateTitle}
          errors={!!form.errors.title}
        />
      </div>
      <div>
        <label htmlFor="edit-description">Description</label>
        <FormInput
          id="edit-description"
          value={form.formState.description}
          onChange={updateDescription}
          errors={!!form.errors.description}
        />
      </div>
      <div>
        <Button onClick={handleUpdate} disabled={!isEmpty(form.errors)}>
          Update
        </Button>
      </div>
      {!isEmpty(form.errors) && <Errors errors={form.errors} />}
    </PageContainer>
  );
}

function Errors({ errors }: { errors: ValidationErrors }) {
  return (
    <div datat-testid="errors">
      {map(
        errors,
        (err, key) =>
          err.length !== 0 && (
            <div key={key}>
              <h6>{key}</h6>
              <ul>
                {err.map((e) => (
                  <li key={e.message}>{e.message}</li>
                ))}
              </ul>
            </div>
          ),
      )}
    </div>
  );
}

EditProject.getInitialProps = async ({
  query,
  req,
  res,
}: SessionContext): Promise<Props> => {
  let { projectId } = query as Record<string, string>;

  if (res && !projectId) {
    redirectTo(res, '/projects');
  }

  if (req && req.session.decodedToken && projectId) {
    let client = req.firebaseServer;
    let user = req.session.decodedToken;
    let project = await fetchProject(client, user, projectId);
    return { project, projectId };
  }

  return { projectId };
};

export default withAuth(EditProject as NextComponentType<Props>);
