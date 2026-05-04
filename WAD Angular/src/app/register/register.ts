import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  errorMessage = '';

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const success = this.auth.register(this.registerForm.value);
      if (success) {
        // Automatically login the user after registration
        this.auth.login({ 
          email: this.registerForm.value.email, 
          password: this.registerForm.value.password 
        });
        this.router.navigate(['/profile']);
      } else {
        this.errorMessage = 'A user with this email already exists.';
      }
    }
  }
}
