import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../../../shared/services/client.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment.development';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-modal',
  templateUrl: './patient-modal.component.html',
  styles: ``,
  standalone: true,
  imports: [TranslateModule , CommonModule , ReactiveFormsModule]
})
export class PatientModalComponent {
  active = 1;
  url: string = environment.urlFiles;
  @Input() data: any;
  @Input() modaltype!: string;
  add: boolean = true;
  // selectedRegions: any[] = [];
  // regions: any[] = [];
  photo: any;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private api: ClientService,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) {}
  formatDate(dateString: string): string {
    if (!dateString) return ''; // Vérifie si la date existe
    return dateString.split(' ')[0]; // Garde uniquement "YYYY-MM-DD"
  }
  ClientForm!: FormGroup;
  ngOnInit(): void {
    // this.getRegionsList() ;

    //  console.log('Received data:', this.data);
    this.photo = this.data?.profilePhoto
      ? this.url + this.data?.profilePhoto
      : '../../../../assets/images/avatar.png';
    //  console.log( 'photo ' , this.photo );

    // this.data = {
    //   adress: 'Present Address',
    //   adress1: 'Permanent Address',
    //   birthday: '2024-10-10',
    //   city: 'city',
    //   codepostal: 4200,
    //   country: 'US',
    //   email: 'test@gmail.com',
    //   firstName: 'firstname',
    //   lastName: 'lastname',
    // };
    if ( this.modaltype ==='add'){
 this.ClientForm = this.fb.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      phoneNumber: new FormControl('', [
        // Validators.required,
      ]),

      birthDate: new FormControl('', [
        Validators.required,
      ]),
    });
    }else {
    this.ClientForm = this.fb.group({
      firstName: new FormControl(this.data.firstName, [
        Validators.required,
        Validators.minLength(4),
      ]),
      lastName: new FormControl(this.data.lastName, [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl(this.data.email, [
        Validators.required,
        Validators.email,
      ]),
      phoneNumber: new FormControl(this.data.phoneNumber, [
        // Validators.required,
      ]),

      birthDate: new FormControl(this.formatDate(this.data.birthDate), [
        Validators.required,
      ]),
    });}
  }
  get firstName() {
    return this.ClientForm.get('firstName');
  }
  get lastName() {
    return this.ClientForm.get('lastName');
  }
  get email() {
    return this.ClientForm.get('email');
  }
  get birthDate() {
    return this.ClientForm.get('birthDate');
  }
  get phoneNumber() {
    return this.ClientForm.get('phoneNumber');
  }

  save() {
    if (this.ClientForm.valid ) {
    
      let { birthDate, ...obj } = this.ClientForm.value;

      obj = {
        ...obj,
        homeAddress:"",
        homeLatitude:0, 
        homeLongitude:0 
        // birthDate: this.convertToISO(this.ClientForm.get('birthDate')?.value),
      };
let apiCall = this.data?.id ? this.api.updatePatient(this.data.id, obj) : this.api.createPatient(obj);
      apiCall.subscribe((res: any) => {
        if (res.code == 200) {
          this.activeModal.close('Modal Closed');
          this.ClientForm.reset();
        }  else {
          this.showError('Erreur', res.msg);
        }
      });
    } else {
      this.showError('Erreur', 'FORMEMPTY');
    }
  }

  convertToISO(dateStr: string): string {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`; // yyyy-MM-dd
    }
    return dateStr; // Si le format est incorrect, ne pas modifier
  }

  dismissModal() {
    this.activeModal.dismiss('Modal Dismissed');
  }
  imageSrc: string = '../../../../assets/images/avatar.png'; // Default image

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageSrc = e.target.result; // Update image source
      };

      reader.readAsDataURL(file); // Read file as data URL
    }
  }
  showSuccess(key: string, contentKey: string) {
    this.translate.get([key, contentKey]).subscribe((translations) => {
      this.toastr.success(translations[contentKey], translations[key]);
    });
  }

  showError(key: string, contentKey: string) {
    this.translate.get([key, contentKey]).subscribe((translations) => {
      this.toastr.error(translations[contentKey], translations[key]);
    });
  }

  showWarning(key: string, contentKey: string) {
    this.translate.get([key, contentKey]).subscribe((translations) => {
      this.toastr.warning(translations[contentKey], translations[key]);
    });
  }
  changeValue(type: string) {
    if (type === 'firstName' && this.firstName?.errors?.['required']) {
      this.showError('Erreur', 'ALERT.FIRSTNAMEREQUIRE');
    } else if (type === 'lastName' && this.lastName?.errors?.['required']) {
      this.showError('Erreur', 'ALERT.LASTNAMEREQUIRE');
    } else if (type === 'email' && this.email?.errors?.['required']) {
      this.showError('Erreur', 'ALERT.EMAILREQUIRE');
    } else if (
      type === 'phoneNumber' &&
      this.phoneNumber?.errors?.['required']
    ) {
      this.showError('Erreur', 'ALERT.PHONEREQUIRE');
    } else if (type === 'birthDate' && this.birthDate?.errors?.['required']) {
      this.showError('Erreur', 'ALERT.BIRTHDAYQUIRE');
    }
  }



}
