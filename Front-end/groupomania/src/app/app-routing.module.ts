import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {NewPostComponent} from './new-post/new-post.component';
import {ViewNewsComponent} from './view-news/view-news.component';
import {PostByPseudoComponent} from './post-by-pseudo/post-by-pseudo.component';
import {AccountComponent} from './account/account.component';
import {AuthGuardService} from './services/auth-guard.service';
import {ModifyPostComponent} from './modify-post/modify-post.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'post/new', component: NewPostComponent, canActivate: [AuthGuardService]},
  {path: 'post/modify/:id', component: ModifyPostComponent, canActivate: [AuthGuardService]},
  {path: 'post', component: ViewNewsComponent , canActivate: [AuthGuardService]},
  {path: 'post/byPseudo/:id', component: PostByPseudoComponent, canActivate: [AuthGuardService]},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: 'post', pathMatch: 'full'},
  {path: '**', redirectTo: 'post'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {
}
