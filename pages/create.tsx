import Button from '@self/components/Button';
import PageContainer from '@self/components/PageContainer';
import PageHeading from '@self/components/PageHeading';
import useForm from '@self/lib/hooks/useForm';
import useStorage from '@self/lib/hooks/useStorage';
import useStore from '@self/lib/hooks/useStore';
import { ValidationErrors } from '@self/lib/types';
import isEmpty from 'lodash-es/isEmpty';
import map from 'lodash-es/map';
import Router from 'next/router';
import { ChangeEvent, useEffect } from 'react';
import { v4 as generateId } from 'uuid';

type InputEvent = ChangeEvent<HTMLInputElement>;

let defaultFormState = {
  id: generateId(),
  title: '',
  description: '',
};

function CreateProject() {
  let store = useStore();

  let [storage, setStorage, clearStorage] = useStorage({
    id: 'create-form',
    type: 'sessionStorage',
    data: defaultFormState,
  });

  let [state, formActions] = useForm({ fields: defaultFormState });

  useEffect(() => {
    formActions.update(storage);
  }, [storage, formActions]);

  useEffect(() => {
    setStorage(state.formState);
  }, [state.formState, setStorage]);

  function handleCreate() {
    if (isEmpty(state.errors)) {
      let { id, title, description } = state.formState;
      clearStorage();
      store.actions.createProject({ id, title, description });
      Router.push(`/project?projectId=${id}`, `/project/${id}`);
    }
  }

  function updateTitle({ target }: InputEvent) {
    formActions.update({ title: target.value });
  }

  function updateDescription({ target }: InputEvent) {
    formActions.update({ description: target.value });
  }

  return (
    <PageContainer>
      <PageHeading>Create</PageHeading>
      <div>
        <input type="hidden" value={state.formState.id} name="id" />
        <label htmlFor="create-title">Title</label>
        <input
          value={state.formState.title}
          type="text"
          id="create-title"
          onChange={updateTitle}
        />
      </div>
      <div>
        <label htmlFor="create-description">Description</label>
        <input
          value={state.formState.description}
          type="text"
          id="create-description"
          onChange={updateDescription}
        />
      </div>
      <div>
        {isEmpty(state.errors) ? (
          <Button type="submit" onClick={handleCreate}>
            Publish
          </Button>
        ) : null}
      </div>
      <Errors errors={state.errors} />
    </PageContainer>
  );
}

function Errors({ errors }: { errors: ValidationErrors }) {
  return (
    <div>
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

export default CreateProject;
