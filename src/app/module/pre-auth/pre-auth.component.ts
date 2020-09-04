import {Component, OnInit} from '@angular/core';
import {Data, RouterOutlet} from '@angular/router';
import {slider} from './animations';

@Component({
  selector: 'app-pre-auth',
  template: `
      <div [@routeAnimations]="prepareRoute(outlet)" class="login-body">
          <router-outlet #outlet="outlet"></router-outlet>
      </div>
  `,
  animations: [
    slider
  ]
})
export class PreAuthComponent implements OnInit{

  ngOnInit(): void {
  }
  prepareRoute(outlet: RouterOutlet): Data {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}


