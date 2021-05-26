import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from '@app/auth'; // CredentialsService } from '@app/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() sidenav!: MatSidenav;
  user: any;
  userRole: string;

  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService // private credentialsService: CredentialsService
  ) {}

  ngOnInit() {
    this.getUser();
    this.getRole();
  }

  logout() {
    this.authenticationService.logout().subscribe((r) => {
      window.location.reload();
    });
  }

  getUser() {
    this.authenticationService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  getRole() {
    this.authenticationService.getUserRole().subscribe((r) => {
      this.userRole = r;
    });
  }

  // get username(): string | null {
  //   const credentials = this.credentialsService.credentials;
  //   return credentials ? credentials.username : null;
  // }

  get title(): string {
    return this.titleService.getTitle();
  }

  changeSessionStorage(link: string) {
    sessionStorage.setItem('currentPage', link);
  }
}
