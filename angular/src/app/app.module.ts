import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; // Ensure AppComponent is standalone
import { DatePipe } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './signup/signup.component';
import { MaincityComponent } from './maincity/maincity.component';
import { HomeComponent } from './home/home.component';
import { AddcityComponent } from './addcity/addcity.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule} from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth.service';
import { ReportComponent } from './report/report.component'; 
import { LongPressDragDirective } from './app-longpress.directive';
import { PreventDoubleClickDirective } from './prevent-double-click.directive';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    // Remove standalone components here
    AppComponent,
    LoginComponent,
    SignupComponent,
    MaincityComponent,
    HomeComponent,
    AddcityComponent,
    ReportComponent,
    LongPressDragDirective,
    PreventDoubleClickDirective,
    HamburgerMenuComponent,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbDropdownModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    AppComponent // Add standalone components here in imports
  ],
  providers: [AuthService, { provide: LocationStrategy, useClass: HashLocationStrategy }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
