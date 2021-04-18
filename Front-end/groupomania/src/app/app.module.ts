import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ViewNewsComponent} from './view-news/view-news.component';
import {OnePostComponent} from "./view-news/one-post/one-post.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NewPostComponent} from './new-post/new-post.component';
import {AccountComponent} from './account/account.component';
import {PostByPseudoComponent} from './post-by-pseudo/post-by-pseudo.component';
import {ModifyPostComponent} from './modify-post/modify-post.component';
import {AuthInterceptor} from "./interceptors/auth-interceptor";
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ViewNewsComponent,
    OnePostComponent,
    NewPostComponent,
    AccountComponent,
    PostByPseudoComponent,
    ModifyPostComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    FontAwesomeModule,
  ],
  exports: [RouterModule],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
