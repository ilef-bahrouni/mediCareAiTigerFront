import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { StorageService } from '../../shared/services/storage.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../shared/services/toaster.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const storageService = inject(StorageService);
  const token = storageService.getToken();
  const router = inject(Router);

   const injector = inject(Injector);
  if (!token) {
     router.navigateByUrl('auth/login');
    return next(req)
  }
  if (req.url.includes('/login')) {
    return next(req);
  }

  else {
    let headers = req.headers.append('ngrok-skip-browser-warning', '69420').append('Authorization', `Bearer ${token.trim()}`);;

    const newReq = req.clone({
      headers
    })

    return next(newReq).pipe(catchError((error: HttpErrorResponse) => {
      // console.log(error);
         const toastr = injector.get(ToasterService);

      // Vérifie si le token est expiré
      if (error.status === 401 && error.error?.error === 'TokenExpired') {
         toastr.showError("SESSIONEXPIRED");
        storageService.removeAll(); //vider le storage
        router.navigateByUrl('auth/login');
      }
      throw error;
    })
    )
  }
}