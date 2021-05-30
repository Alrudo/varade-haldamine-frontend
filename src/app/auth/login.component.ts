import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { environment } from '@env/environment';
import { UntilDestroy } from '@core';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('loginAnState', [
      state(
        'move',
        style({
          opacity: 1,
          width: '45%',
        })
      ),
      transition('* => move', animate('1000ms ease')),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  constructor() {}

  get stateName() {
    return 'move';
  }

  ngOnInit() {}

  login() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/azure';
  }
}
