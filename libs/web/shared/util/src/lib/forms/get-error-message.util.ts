import { FormControl, ValidationErrors } from '@angular/forms';

const createErrorMessage = (
  errorKey: string,
  validationErrors: ValidationErrors
): string => {
  const ERROR_MESSAGES: Record<string, string> = {
    required: 'The field is required.',
    maxlength: `The field must be less than ${validationErrors['requiredLength']} characters.`,
    minlength: `The field must be at least ${validationErrors['requiredLength']} characters long.`,
    min: `The field must be greater than ${validationErrors['min']}.`,
    max: `The field must be less than ${validationErrors['max']}.`,
  };
  return ERROR_MESSAGES[errorKey];
};

export const getErrorMessage = (formControl: FormControl): string => {
  const errors = formControl.errors;

  if (errors) {
    for (const key of Object.keys(errors)) {
      const value = errors[key];

      if (Object.prototype.hasOwnProperty.call(errors, key)) {
        return createErrorMessage(key, value);
      }
    }
  }

  return '';
};
