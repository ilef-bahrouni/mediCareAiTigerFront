import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PermissionStore } from './stores/permission.store';
import { AuthService } from './shared/services/auth.service';
import { ToastContainerComponent } from "./toaster/toast-container/toast-container.component";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [ToastContainerComponent , RouterModule],
})
export class AppComponent implements OnInit {
  permissionStore = inject(PermissionStore);
  authService = inject(AuthService);
  router = inject(Router);
  title = 'ESHOP';
  ngOnInit(): void {
    
    // if(this.storage.getToken() != null ){
    // this.authService.checkToken().subscribe(
    //   (res: any) => {
    //     if (res.code === 200) {
    //       this.permissionStore.setData(
    //         res.data['partnerRespDTO']['name'],
    //         res.data['agentResponseDTO']['lastName'],
    //         res.data['agentResponseDTO']['firstName'],
    //         res.data['agentResponseDTO']['gender'],
    //         res.data['agentResponseDTO']['id'],
    //         res.data['partnerRespDTO']['id'],
    //         res.data['roleRespDTO']['name'],
    //         res.data['roleRespDTO']['functionRespDTOS']
    //       );
    //     } else {
    //       this.router.navigateByUrl('auth/login');
    //     }
    //   },
    //   (error: any) => {
    //     // console.log("err:",error);

    //     this.router.navigate(['auth/login']);
    //   }
    // );
  }
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');
  } 
}
