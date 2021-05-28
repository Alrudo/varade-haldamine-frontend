import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { Router } from '@angular/router';
// import { AuthenticationService } from '@app/auth';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  version: string | null = environment.version;

  user: any;

  constructor(private router: Router) // private authenticationService: AuthenticationService
  {}

  ngOnInit(): void {
    // this.getUser();
  }

  // getUser() {
  //   this.authenticationService.getUser().subscribe((user) => {
  //     this.user = user;
  //   });
  // }
}
