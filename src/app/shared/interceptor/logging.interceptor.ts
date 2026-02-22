import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class loggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log("Request intercepted:", req);

    const token = localStorage.getItem('authToken');
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    
    // Gérer la requête et intercepter la réponse
    return next.handle(authReq).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          //  console.log("Successful Response:", event.status); // Pour les réponses réussies
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error("Error Response:", error); // Pour les erreurs
        }
      })
    );
  }
}
