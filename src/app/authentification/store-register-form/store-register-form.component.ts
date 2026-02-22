import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { StorageService } from '../../shared/services/storage.service';
import { ToasterService } from '../../shared/services/toaster.service';

@Component({
  selector: 'app-store-register-form',
  standalone: true,
  imports: [],
  templateUrl: './store-register-form.component.html',
  styleUrl: './store-register-form.component.css'
})
export class StoreRegisterFormComponent {

form!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private storageService = inject(StorageService);
  private toastService = inject(ToasterService);
 
  ngOnInit(): void {
 
    this.form = this.formBuilder.group({
      username: ['',[Validators.required]],
      name: ['',[Validators.required]],
      password: ['',[Validators.required]],
    });
    //  console.log( this.formUtilities.getControl(this.form, 'username'));
  }
  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }
  get name() {
    return this.form.get('name');
  }
  save() {
    if (this.form.valid) {
      this.authService
        .Login(
          this.form.value
        )
        .subscribe((res) => {
          if (res.code == 200) {
            this.storageService.saveuserId(3);
            this.storageService.saveToken(res?.data);

            this.toastService.showSuccess('AUTH.ALERTLOGINSUCCES');
            this.router.navigateByUrl('');
            this.authService.startAutoLogout();
          } else {
            this.toastService.showError(res.msg);
          }
        });
    } else {
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      this.toastService.showError('FORMEMPTY');
    }
  }
}
