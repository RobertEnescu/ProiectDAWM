import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { map } from 'rxjs';
import { UserService } from '../services/user.service';

export function passwordValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const value: string = control.value;
  if (value && value.length >= 6 && /[A-Z]/.test(value) && /\d/.test(value)) {
    return null; // Valid password
  }
  return { passwordInvalid: true }; // Invalid password
}
