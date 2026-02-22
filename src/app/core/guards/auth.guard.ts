import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
 const authService = inject(AuthService);
  const router = inject(Router);

  let isAuthenticated = false;

  authService.checkToken().subscribe({
    next: (res) => {
      console.log(res);
      
      if (res.code === 200) {
        isAuthenticated = true;
      } else {
           router.navigate(['/auth/login']);
     
      }
    },
    error: () => router.navigate(['/auth/login'])
  });

  return isAuthenticated;

};
