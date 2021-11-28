import isEmail from 'validator/es/lib/isEmail';

type Handler = (target?: string | number, error?: string) => Actions;

interface Actions {
  num: Handler;
  min: Handler;
  max: Handler;
  minLength: Handler;
  exec: () => { isValid: boolean; validationErrors: string[] };
}

export const validate = (value: string | number): Actions => {
  const _errors: string[] = [];
  const _value = value;

  return {
    num(_, error = 'Expected value to be a number!') {
      if (typeof _value === 'number') {
        return this;
      }

      _errors.push(error);
      return this;
    },
    min(_, error = `Number expected to be at least ${_value}`) {
      if (_value >= _value) {
        return this;
      }

      _errors.push(error);
      return this;
    },
    max(_, error = `Number expected to be at most ${_value}`) {
      if (_value <= _value) {
        return this;
      }
      _errors.push(error);
      return this;
    },
    minLength(
      minLength = 1,
      error = `must be at least ${minLength} characters long`
    ) {
      if (_value > minLength) {
        return this;
      }
      _errors.push(error);
      return this;
    },
    exec: () => {
      return { isValid: _errors.length === 0, validationErrors: _errors };
    },
  };
};
