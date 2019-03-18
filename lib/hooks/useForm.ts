import {
  Action,
  PayloadAction,
  ValidationError,
  ValidationErrors,
} from '@self/lib/types';
import reduce from 'lodash-es/reduce';
import { useMemo, useReducer } from 'react';

interface Config<Fields> {
  fields: Fields;
}

interface State<Fields> {
  formState: Fields;
  errors: ValidationErrors;
}

interface ActionCreators<FormFields> {
  update: (fields: Partial<FormFields>) => void;
}

enum ActionType {
  init = 'INIT',
  update = 'UPDATE',
}

type Actions<FormFields> =
  | Action<ActionType.init>
  | PayloadAction<ActionType.update, Partial<FormFields>>;

function useForm<Fields>({
  fields,
}: Config<Fields>): [State<Fields>, ActionCreators<Fields>] {
  let [state, dispatch] = useReducer(formReducer, {
    formState: fields,
    errors: validateFormState(fields),
  });

  let actions: ActionCreators<Fields> = useMemo(() => {
    return {
      update(fields: Partial<Fields>) {
        dispatch({ type: ActionType.update, payload: fields });
      },
    };
  }, []);

  return [state as State<Fields>, actions];
}

function formReducer<Fields>(
  state: State<Fields>,
  action: Actions<Fields>,
): State<Fields> {
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

function validateState<FormFields>({ formState }: State<FormFields>): State<FormFields> {
  return { formState, errors: validateFormState(formState) };
}

function validateFormState<FormFields>(
  formState: State<FormFields>['formState'],
): State<FormFields>['errors'] {
  return reduce(
    (formState as unknown) as object,
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

export default useForm;
