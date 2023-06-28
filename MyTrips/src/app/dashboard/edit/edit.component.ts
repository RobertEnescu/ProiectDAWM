import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trip } from 'src/app/interfaces/trip.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  tripForm: FormGroup;
  user: User | null = null;
  tripToUpdate: Trip | null = null; // New variable to store the trip to update

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
      this.userService.getUserByUsername(loggedInUser).subscribe(
        (users) => {
          if (users.length > 0) {
            this.user = users[0];
            console.log('Retrieved user:', this.user); // Add this line to log the user object
          }
        },
        (error) => {
          console.error('Error retrieving user data:', error);
        }
      );
    }
  }

  // New method to set the trip to update
  setTripToUpdate(trip: Trip) {
    this.tripToUpdate = trip;
    this.tripForm.patchValue({
      city: trip.city,
      description: trip.description,
      date: trip.date,
      imageURL: trip.imageURL
    });
  }

  onSubmit() {
    const updatedTrip: Trip = {
      city: this.tripForm.get('city').value,
      description: this.tripForm.get('description').value,
      imageURL: this.tripForm.get('imageURL').value,
      date: this.tripForm.get('date').value,
    };
  
    if (this.user && this.tripToUpdate) {
      this.userService.updateTrip(this.user, updatedTrip).subscribe(
        (updatedUser) => {
          // Trip updated successfully, update the user data
          this.userService.updateUser(updatedUser);
          this.tripForm.reset();
          this.tripToUpdate = null;
        },
        (error) => {
          console.error('Error updating trip:', error);
        }
      );
    }
  }
}
