import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  showOptions = false; 
  constructor(private router: Router){}

  navigateToApp() {
    window.location.href = environment.crossOriginUrl+'/login';
  }

  isMenuOpen: boolean = false;

  toggleMenu(event: any) {
    this.isMenuOpen = event.target.checked;
  }

  async redirectToCompanyListing() {
    // this.router.navigateByUrl('/company-listing');

    window.location.href = environment.crossOriginUrl + '/companies';
  }
}
