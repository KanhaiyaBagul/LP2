import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  // Using a signal to hold the current logged in user state
  currentUser = signal<any>(null);

  constructor() {
    // Check local storage on initialization
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser));
    }
  }

  register(userData: any): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // Simple check if user already exists
    if (users.find((u: any) => u.email === userData.email)) {
      return false; // user already exists
    }
    
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(credentials: any): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === credentials.email && u.password === credentials.password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUser.set(user);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);
  }
}
