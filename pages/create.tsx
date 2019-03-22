/** @jsx jsx */
import { jsx } from '@emotion/core';
import Button from '@self/components/Button';
import FormInput from '@self/components/FormInput';
import PageContainer from '@self/components/PageContainer';
import PageHeading from '@self/components/PageHeading';
import useForm from '@self/lib/hooks/useForm';
import useStorage from '@self/lib/hooks/useStorage';
import useStore from '@self/lib/hooks/useStore';
import { ValidationErrors } from '@self/lib/types';
import isEmpty from 'lodash-es/isEmpty';
import isEqual from 'lodash-es/isEqual';
import map from 'lodash-es/map';
import Router from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { v4 as generateId } from 'uuid';

type InputEvent = ChangeEvent<HTMLInputElement>;

let defaultFormState = {
  title: '',
  description: '',
};

function CreateProject() {
  let store = useStore();
  let [displayErrors, setDisplayErrors] = useState(false);

  let [storage, setStorage, clearStorage] = useStorage({
    id: 'create-form',
    type: 'sessionStorage',
    data: defaultFormState,
  });

  let [form, formActions] = useForm({ fields: defaultFormState });

  useEffect(() => {
    if (!isEqual(storage, defaultFormState)) {
      if (!isEmpty(storage.description) || !isEmpty(storage.title)) {
        setDisplayErrors(true);
      }
      formActions.update(storage);
    }
  }, []);

  useEffect(() => {
    setStorage(form.formState);
  }, [form.formState]);

  function handleCreate() {
    if (isEmpty(form.errors)) {
      let { title, description } = form.formState;
      let id = generateId();
      clearStorage();
      store.actions.createProject({ id, title, description });
      Router.push(`/project?projectId=${id}`, `/project/${id}`);
    }
  }

  function updateTitle({ target }: InputEvent) {
    if (!displayErrors) {
      setDisplayErrors(true);
    }
    formActions.update({ title: target.value });
  }

  function updateDescription({ target }: InputEvent) {
    if (!displayErrors) {
      setDisplayErrors(true);
    }
    formActions.update({ description: target.value });
  }

  return (
    <PageContainer>
      <PageHeading>Create</PageHeading>
      <div>
        <label htmlFor="create-title">Title</label>
        <FormInput
          id="create-title"
          type="text"
          value={form.formState.title}
          onChange={updateTitle}
          errors={displayErrors && !!form.errors.title}
        />
      </div>
      <div>
        <label htmlFor="create-description">Description</label>
        <FormInput
          id="create-title"
          type="text"
          value={form.formState.description}
          onChange={updateDescription}
          errors={displayErrors && !!form.errors.description}
        />
      </div>
      <div>
        <Button type="submit" onClick={handleCreate} disabled={!isEmpty(form.errors)}>
          Publish
        </Button>
      </div>
      {displayErrors && <Errors errors={form.errors} />}
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

export default CreateProject;
