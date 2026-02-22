import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layout/full/full.component';
import { BlankComponent } from './layout/blank/blank.component';
// import { authGuard } from './core/guards/auth.guard';
// import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [

  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule), 
      //   canActivate: [authGuard],
        //canActivateChild: [authGuard], 
      }]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./authentification/authentification.module').then(m => m.AuthentificationModule) // Chargement du module 'features'
      //  , canActivate: [noAuthGuard],
      //    canActivateChild: [noAuthGuard], 
      }
    ]
  },
 

];
