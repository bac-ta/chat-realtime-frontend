import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PreAuthComponent} from './module/pre-auth/pre-auth.component';
import {MainContentComponent} from './layout/main-content/main-content.component';
import {AuthGuard} from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'pre-auth',
    component: PreAuthComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./module/pre-auth/login/login.module').then(m => m.LoginModule),
        data: {
          animation: 'isRight'
        }
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('./module/pre-auth/forgot-passord/forgot-pasword.module').then(m => m.ForgotPaswordModule),
        data: {
          animation: 'isLeft'
        }
      }
    ]
  },
  {
    path: '',
    component: MainContentComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
