import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PreAuthComponent} from './module/pre-auth/pre-auth.component';
import {AuthGuard} from './core/guards/auth.guard';
import {ChatComponent} from './module/chat/chat.component';
import {NotFoundComponent} from './module/not-found/not-found.component';

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
      },
      {
        path: 'create-account',
        loadChildren: () => import('./module/pre-auth/create-account/create-account.module').then(m => m.CreateAccountModule),
        data: {
          animation: 'isLeft'
        },
      },
      {
        path: 'new-password',
        loadChildren: () => import('./module/pre-auth/new-password/new-password.module').then(m => m.NewPasswordModule),
      },
    ]
  },
  {
    path: '',
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
