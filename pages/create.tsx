import Button from '@self/components/Button';
import PageContainer from '@self/components/PageContainer';
import PageHeading from '@self/components/PageHeading';
import { Action, PayloadAction, ValidationError } from '@self/lib/types';
import isEmpty from 'lodash-es/isEmpty';
import map from 'lodash-es/map';
import reduce from 'lodash-es/reduce';
import { ChangeEvent, useReducer } from 'react';

type InputEvent = ChangeEvent<HTMLInputElement>;

interface ValidationErrors {
  [field: string]: ValidationError[];
}

interface FormState {
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
  let [state, dispatch] = useReducer(
    createReducer,
    createReducer(
      {
        formState: {
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
      console.log(state);
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
      <Button onClick={handleCreate} disabled={!isEmpty(state.errors)}>
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
