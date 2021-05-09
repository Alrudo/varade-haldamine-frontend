import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { Credentials, CredentialsService } from './credentials.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private credentialsService: CredentialsService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    const data = {
      username: context.username,
      token: '123456',
    };
    this.credentialsService.setCredentials(data, context.remember);
    return of(data);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<any> {
    return this.http.get<Observable<any>>('asset/logout');
  }

  getUser(): Observable<any> {
    return this.http.get<any>(`asset/account`);
  }

  getUserRole(): Observable<string> {
    // @ts-ignore
    return this.http.get<string>(`asset/accountt`, { responseType: 'text' });
  }
}
