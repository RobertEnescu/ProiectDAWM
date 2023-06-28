import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { Trip } from 'src/app/interfaces/trip.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
})
export class TripsComponent implements OnInit {
  user: User | null = null;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the logged-in username from local storage
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
      // Fetch the user data from the server based on the logged-in username
      this.userService.getUserByUsername(loggedInUser).subscribe(
        (users) => {
          if (users.length > 0) {
            // Assuming there is only one user with the provided username
            this.user = users[0];
          }
        },
        (error) => {
          console.error('Error retrieving user data:', error);
        }
      );
    }
  }
  goToAddTrips() {
    this.router.navigate(['/dashboard/add_trip']);
  }
}