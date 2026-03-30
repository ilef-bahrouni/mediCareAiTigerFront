import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { StorageService } from '../../shared/services/storage.service';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { ToasterService } from '../../shared/services/toaster.service';
import { switchMap } from 'rxjs';
import { PermissionStore } from '../../stores/permission.store';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [TranslateModule , ReactiveFormsModule ,RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  permissionStore = inject(PermissionStore )
 form!: FormGroup;
  private formBuilder = inject(FormBuilder);
  loading: boolean = false ;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToasterService,
    private storageService: StorageService,

  ) {
    if (storageService.getToken()) {
      router.navigateByUrl('');
    } else {
      storageService.removeAll();
    }
  }
  ngOnInit(): void {
    // this.form = new FormGroup({
    //   username: new FormControl('', [Validators.required]),
    //   password: new FormControl('', [Validators.required]),
    // });
    this.form = this.formBuilder.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]],
    });
    //  console.log( this.formUtilities.getControl(this.form, 'username'));
  }
  // get username() {
  //   return this.form.get('username');
  // }
  // get password() {
  //   return this.form.get('password');
  // }
  get f() {
    return this.form.controls;
  }
  onSubmitlogin() {
    if (this.form.valid) {
     this.loading=true;
      this.authService.Login(this.form.value)
      .pipe(

        switchMap((response: any) => {
          this.storageService.saveToken(response.data)
            return this.authService.InitData()
      
        })
      )
      .subscribe({
        next: (res) => {
          if (res.code === 200) {
        this.loading = false
           this.permissionStore.setData(
             res.data['profil']['id'],
              res.data['profil']['lastName'],
              res.data['profil']['firstName'],
             
              res.data['userType']
             ) 
            this.toastService.showSuccess("Successfully logged in!");
            this.router.navigateByUrl('/');
            this.authService.startAutoLogout();

          } else {
            this.toastService.showError(res.msg);
            this.loading=false
          }
        },
        error: () => {
          this.loading=false
          this.toastService.showError("AUTH.ALERTLOGINERROR")

        },
      });

    } else {
          Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control?.markAsTouched({ onlySelf: true });

      });
      this.toastService.showError('FORMEMPTY')
    }
  }
}
