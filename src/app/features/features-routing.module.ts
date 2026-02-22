import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeAgentsComponent } from './admin/agent/liste-agents/liste-agents.component';
import { ListePatientsComponent } from './admin/Client/liste-patients/liste-patients.component';

const routes: Routes = [
  {
    path: '',
    component: ListePatientsComponent,
  
  }, 

  {
    path: 'agents',
    component: ListeAgentsComponent,
    
  
  },
  
  
  
  
  {
    path: 'clients',
    component: ListePatientsComponent,
   /* resolve: {
      data: clientsResolver
    }*/
  },
//   {
//   path: 'client/profile/:id',
//   component: ProfileClientComponent,

// }, 
 

    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
