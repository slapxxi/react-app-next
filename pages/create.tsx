import Button from '@self/components/Button';
import PageContainer from '@self/components/PageContainer';
import PageHeading from '@self/components/PageHeading';
import useStore from '@self/lib/hooks/useStore';
import { Action, ID, PayloadAction, ValidationError } from '@self/lib/types';
import isEmpty from 'lodash-es/isEmpty';
import map from 'lodash-es/map';
import reduce from 'lodash-es/reduce';
import Router from 'next/router';
import { ChangeEvent, useReducer } from 'react';
import { v4 as generateId } from 'uuid';

type InputEvent = ChangeEvent<HTMLInputElement>;

interface ValidationErrors {
  [field: string]: ValidationError[];
}

interface FormState {
  id: ID;
  title: string;
  description: string;
}

interface State {
  formState: FormState;
  errors: ValidationErrors;
}

enum ActionType {
  init = 'INIT',
  update = 'UPDATE',
}

type Actions =
  | Action<ActionType.init>
  | PayloadAction<ActionType.update, Partial<FormState>>;

function CreateProject() {
  let store = useStore();
  let [state, dispatch] = useReducer(
    createReducer,
    createReducer(
      {
        formState: {
          id: generateId(),
          title: '',
          description: '',
        },
        errors: {},
      },
      { type: ActionType.init },
    ),
  );

  function handleCreate() {
    if (isEmpty(state.errors)) {
      let { id, title, description } = state.formState;
      store.actions.createProject({ id, title, description });
      Router.push(`/project?projectId=${id}`, `/project/${id}`);
    }
  }

  function updateTitle({ target }: InputEvent) {
    dispatch({ type: ActionType.update, payload: { title: target.value } });
  }

  function updateDescription({ target }: InputEvent) {
    dispatch({ type: ActionType.update, payload: { description: target.value } });
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
      <Button type="submit" onClick={handleCreate} disabled={!isEmpty(state.errors)}>
        Publish
      </Button>
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

function createReducer(state: State, action: Actions): State {
  switch (action.type) {
    case ActionType.init:
      return validateState(state);
    case ActionType.update:
      let formState = { ...state.formState, ...action.payload };
      return validateState({ formState, errors: state.errors });
    default:
      return state;
  }
}

function validateState(state: State): State {
  let { formState } = state;
  let errors = reduce(
    formState,
    (acc, value, key) => {
      let validationErrors = validateField(value);
      if (validationErrors.length === 0) {
        return acc;
      } else {
        return { ...acc, [key]: validationErrors };
      }
    },
    {},
  );
  return { formState, errors };
}

function validateField(field: string): ValidationError[] {
  let errors = [];

  if (/^\s*$/.test(field)) {
    errors.push({ message: 'should not be empty' });
  } else if (field.length < 4) {
    errors.push({ message: 'should contain at least 4 symbols' });
  }

  return errors;
}

export default CreateProject;
