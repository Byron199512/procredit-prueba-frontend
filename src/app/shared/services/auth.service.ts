import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestResponse } from '../interfaces/request.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environments } from 'src/environments/environments';
import { RequestTypeResponse } from '../interfaces/request-type.interface';
import { Login, LoginResponse, RegisterResponse } from '../interfaces/login.interface';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl: string = environments.baseUrl;
  private user?: LoginResponse;
  constructor(private http: HttpClient,
    private router: Router
  ) { }

  get currentUser(): LoginResponse | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(login: Login): Observable<LoginResponse | undefined> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, { ...login }).pipe(
      tap(resp => {
        this.user = resp
        localStorage.setItem('token', this.user.token)
      }),
      catchError(error => of(undefined))
    );
  }

  register(login: RegisterResponse): Observable<LoginResponse | undefined> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/register`, { ...login }).pipe(
      tap(resp => {
        this.user = resp
        localStorage.setItem('token', this.user.token)
      }),
      catchError(error => of(undefined))
    );
  }



  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    return this.http.get<LoginResponse>(`${this.baseUrl}/auth/revalidate`).pipe(
      tap(user => this.user = user),
      map(user => !!user),
      catchError(err => of(false))
    );
  }


  logout() {
    localStorage.removeItem('token')
    this.user = undefined;
    this.router.navigate(['/auth/login'])
  }
}
