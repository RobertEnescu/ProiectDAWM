import { AbstractControl } from '@angular/forms';

export function passwordValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const value: string = control.value;
  if (value && value.length >= 6 && /[A-Z]/.test(value) && /\d/.test(value)) {
    return null; // Valid password
  }
  return { passwordInvalid: true }; // Invalid password
}
