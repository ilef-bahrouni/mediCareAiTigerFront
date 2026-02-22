import { computed, Injectable, signal } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
//    private _currentToken = signal<any | null>(null)
//   token = this._currentToken.asReadonly()
//   isConnected = computed(() => this.token() !== null)
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    "ngrok-skip-browser-warning": "69420",
    'Authorization': 'Bearer ' + localStorage.getItem('token'),

  })
// SetToken(token :any){
//   this._currentToken =token
// }
  constructor(private http : HttpClient,) { }
  baseUrl= environment.url
  Login(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/agent/auth/signIn', data,  { withCredentials: true }  );
  }
  ResetPassword(token: string, newPassword: string): Observable<any> {
    const url = `${this.baseUrl}/agent/auth/reset?token=${token}&newPassword=${newPassword}`;
    return this.http.post<any>(url, {}, { responseType: 'json' });
  }
  ForgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/agent/auth/reset-request?email=${email}`, {}, { responseType: 'json' });
  }
  getAllPermissions(params: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/agent/role/permissions?`+params );
  }

  AgentInitData(): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/agent/initData/initData', null, { withCredentials: true } );
  }
   // Le token est automatiquement ajouté par l'authInterceptor
    // Le Guard a déjà vérifié si le token existe localement. 
  checkToken(): Observable<any> {
   
    return this.http.post<any>(`${this.baseUrl}/agent/initData/checkToken`, null);
  }
  // checkAuth(): Observable<any> {
  //   return this.http.post<any>(this.baseUrl + '/agent/initData/checkToken', null, { withCredentials: true } );
  // }
   startAutoLogout() {
    const token = localStorage.getItem('token');
    if (!token) return;
  
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = tokenPayload.exp * 1000; // en ms
    const currentTime = Date.now();
  
    const timeout = expiryTime - currentTime;
  
    if (timeout > 0) {
      setTimeout(() => {
        this.logout();
      }, timeout);
    } else {
      console.log("logout");
      
      this.logout(); // déjà expiré
    }
  }
  clearLogoutTimer() {
    // if (this.logoutTimer) {
    //   clearTimeout(this.logoutTimer);
    // }
  }

  logout() {
    this.clearLogoutTimer();
    // this.storageService.removeAll();
    //       this.storageService.clearSession() 
    // this.router.navigateByUrl('auth/login');
  }
} 
