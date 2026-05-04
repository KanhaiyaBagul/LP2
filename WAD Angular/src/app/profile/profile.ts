import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private auth = inject(Auth);
  
  // Expose the current user to the template
  user = this.auth.currentUser;
}
