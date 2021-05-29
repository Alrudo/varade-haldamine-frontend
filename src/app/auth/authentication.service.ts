import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<any> {
    window.sessionStorage.clear();
    return this.http.get<Observable<any>>('api/asset/logout');
  }

  getUser(): Observable<any> {
    // @ts-ignore
    return this.http.get<any>(`api/asset/account`, { responseType: 'application/json' });
  }

  getUserRole(): Observable<string> {
    // @ts-ignore application/json
    return this.http.get<string>(`api/asset/accountt`, { responseType: 'text' });
  }

  getUserName(): Observable<any> {
    // @ts-ignore
    return this.http.get<any>(`api/asset/username`, { responseType: 'text' });
  }
}
