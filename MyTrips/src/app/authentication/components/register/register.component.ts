import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordValidator } from 'src/app/helpers/validators';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;
  usernameTaken = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, passwordValidator]],
      checkPassword: [
        null,
        [Validators.required, this.confirmationValidator.bind(this)],
      ],
      username: [null, [Validators.required]],
      agree: [false],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const username = this.validateForm.value.username;

      // Check if username is unique
      this.userService.checkUsernameAvailability(username).subscribe(
        (isTaken: boolean) => {
          if (isTaken) {
            // Username is already taken
            this.usernameTaken = true;
            this.validateForm.controls['username'].setErrors({ taken: true });
          } else {
            // Username is unique, proceed with user registration
            const user: User = {
              username: username,
              email: this.validateForm.value.email,
              password: this.validateForm.value.password,
            };
            this.userService.addNewUser(user).subscribe(
              () => {
                console.log('User added successfully');
              },
              (error) => {
                console.error('Error adding user:', error);
              }
            );
            console.log('submit', this.validateForm.value);
          }
        },
        (error) => {
          console.error('Error checking username availability:', error);
        }
      );
    } else {
      // Handle form validation errors
      Object.values(this.validateForm.controls).forEach(
        (control: FormControl) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        }
      );
    }
  }

  confirmationValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls['checkPassword'].updateValueAndValidity()
    );
  }
  getUsernameErrorMessage(): string | null {
    if (this.usernameTaken) {
      return 'Username is already taken. Please choose a different username.';
    }
    return null;
  }
}
