import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
  standalone :true , 
  imports:[RouterModule]
})
export class SideBarComponent implements OnChanges {
    @Input() isMenuOpen = false;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isMenuOpen']) {
      this.isMenuOpen = changes['isMenuOpen'].currentValue;
    }
    }
storageService = inject(StorageService)
    private modalService = inject(NgbModal);
    private router = inject(Router);
    menuBlocks : any[]=   [
      {
        id: 1,
        label: 'Dashboard',
        link: '/' , 
        icon :'/icons/home.svg'
      }, 
       {
        id: 2,
        label: 'Clients',
        link: '/clients' , 
        icon :'/icons/users-icon.svg'
      },
       
      {
        id: 4,
        label: 'Agents',
        link: '/agents' , 
            icon :'/icons/users-icon.svg'
      }, 
     
    ] 
  ngOnInit(): void {
 
  }
}
