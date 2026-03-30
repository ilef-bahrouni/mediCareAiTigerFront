import { HttpErrorResponse, HttpEvent, HttpHandlerFn,  HttpRequest } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { StorageService } from '../../shared/services/storage.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../shared/services/toaster.service';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const storageService = inject(StorageService);
  const token = storageService.getToken();
  const router = inject(Router);

   const injector = inject(Injector);
  // const token = auth.token();
  if (!token) {
    return next(req)
  }
  if (req.url.includes('/login')) {
    return next(req);
  }
  // const headers = new HttpHeaders({
  //   Authorization: token
  // })
  else {
    let headers = req.headers.
    append('Authorization', `Bearer ${token}`);;

    const newReq = req.clone({
      headers
    })

    return next(newReq).pipe(catchError((error: HttpErrorResponse) => {
      console.log(error);
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

