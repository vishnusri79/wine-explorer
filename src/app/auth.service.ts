import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;

  constructor() {
    this.loggedIn = !!localStorage.getItem('loggedIn');
  }

  login(email: string, password: string): Observable<boolean> {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.email === email && storedUser.password === password) {
      this.loggedIn = true;
      localStorage.setItem('loggedIn', 'true');
      return of(true).pipe(tap(() => this.loggedIn = true), delay(500));
    } else {
      return of(false).pipe(delay(500));
    }
  }

  register(username: string, email: string, password: string): Observable<boolean> {
    const newUser = { username, email, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    return of(true).pipe(tap(() => this.loggedIn = false), delay(500));
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('loggedIn');
  }

  get isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
