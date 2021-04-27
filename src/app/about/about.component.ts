import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  version: string | null = environment.version;

  constructor(private router: Router) {}

  ngOnInit() {}
}
