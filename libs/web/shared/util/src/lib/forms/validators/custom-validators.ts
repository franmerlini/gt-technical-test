import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static requiredSelectValidator(control: AbstractControl): ValidationErrors | null {
    return !control?.value ? { required: true } : null;
  }

  static rationalTwoDecimalsValidator(control: AbstractControl): ValidationErrors | null {
    const value = control?.value;
    const regex = /^\d+(\.\d{1,2})?$/;
    return !regex.test(value) ? { rationaltwodecimals: true } : null;
  }
}
