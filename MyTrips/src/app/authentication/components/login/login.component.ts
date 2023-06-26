import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  invalidLogin = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const username = this.validateForm.value.username;
      const password = this.validateForm.value.password;

      this.userService.login(username, password).subscribe(
        (loggedIn) => {
          if (loggedIn) {
            // Login successful
            this.invalidLogin = false;

            // Store the logged-in user information
            localStorage.setItem('loggedInUser', username);

            // Redirect to the main page or any desired route
            this.router.navigate(['/tabel']);
          } else {
            // Invalid username or password
            this.invalidLogin = true;
          }
        },
        (error) => {
          console.error('Error occurred during login:', error);
        }
      );
    } else {
      this.validateForm.markAllAsTouched();
    }
  }
}
