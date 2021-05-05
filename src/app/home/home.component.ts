import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading = false;
  user: any;

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.isLoading = true;
    this.getUser();
    const location = sessionStorage.getItem('currentPage');
    if (location === 'about') {
      this.router.navigate(['about']);
    }
    if (location === 'add-asset') {
      this.router.navigate(['add-asset']);
    }
    if (location === 'property_detail') {
      this.router.navigate(['property_detail/' + sessionStorage.getItem('id')]);
    }
    if (location === 'change_asset') {
      this.router.navigate(['change-asset/' + sessionStorage.getItem('id')]);
    }
  }

  getUser() {
    this.authenticationService.getUser().subscribe((user) => {
      this.user = user;
      this.isLoading = false;
    });
  }
}
