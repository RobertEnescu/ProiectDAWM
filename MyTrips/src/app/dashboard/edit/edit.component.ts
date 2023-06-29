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
  tripToUpdate: Trip | null = null;

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
            console.log('Retrieved user:', this.user);
          }
        },
        (error) => {
          console.error('Error retrieving user data:', error);
        }
      );
    }
  }

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
    const newTrip: Trip = {
      id: this.tripToUpdate ? this.tripToUpdate.id : null, // Assign a new ID if adding a new trip
      city: this.tripForm.get('city').value,
      description: this.tripForm.get('description').value,
      imageURL: this.tripForm.get('imageURL').value,
      date: this.tripForm.get('date').value,
    };
  
    if (this.user) {
      if (this.tripToUpdate) {
        // Updating an existing trip
        this.userService.updateTrip(this.user, newTrip).subscribe(
          (updatedUser) => {
            this.user = updatedUser; // Update the user object with the updated data
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
  }

