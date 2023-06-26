import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if the user is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      return true; // Allow access to the route
    } else {
      // User is not logged in, redirect to the login page
      this.router.navigate(['/login']);
      return false; // Block access to the route
    }
  }
}
