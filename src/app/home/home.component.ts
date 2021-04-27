import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
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
  }
}
