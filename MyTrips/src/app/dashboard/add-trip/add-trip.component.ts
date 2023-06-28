import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trip } from 'src/app/interfaces/trip.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss'],
})
export class AddTripComponent implements OnInit {
  tripForm: FormGroup;
  user: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.tripForm = this.formBuilder.group({
      city: ['', Validators.required],
      description: ['', Validators.required],
      date: [null, Validators.required],
      imageURL: ['', Validators.required],
    });
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

  onSubmit() {
    const trip: Trip = {
      city: this.tripForm.get('city').value,
      description: this.tripForm.get('description').value,
      imageURL: this.tripForm.get('imageURL').value,
      date: this.tripForm.get('date').value,
    };

    if (this.user) {
      this.userService.addTripToUser(this.user, trip).subscribe(
        (user) => {
          // Trip added successfully, update the user data
          this.user = user;
          this.tripForm.reset();
        },
        (error) => {
          console.error('Error adding trip:', error);
        }
      );
    }
  }
}
