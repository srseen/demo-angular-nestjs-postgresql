import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://backend:3000/api/auth';
  private currentUserSubject = new BehaviorSubject<AuthResponse['user'] | null>(
    null
  );
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromLocalStorage();
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/register`, data)
      .pipe(tap((res) => this.handleAuth(res)));
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/login`, data)
      .pipe(tap((res) => this.handleAuth(res)));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getProfile(): Observable<AuthResponse['user']> {
    return this.http.get<AuthResponse['user']>(`${this.baseUrl}/profile`);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  private handleAuth(response: AuthResponse) {
    localStorage.setItem('access_token', response.access_token);
    this.currentUserSubject.next(response.user);
  }

  private loadUserFromLocalStorage() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.getProfile().subscribe((user) => this.currentUserSubject.next(user));
    }
  }
}
