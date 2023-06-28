import { Trip } from './trip.interface';

export interface User {
  id?: number;
  username: string;
  email?: string;
  password?: string;
  trips: Trip[];
}
