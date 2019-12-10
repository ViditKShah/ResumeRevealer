import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatTabsModule } from '@angular/material/tabs';

import { appRoutes } from './routes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { CandidlistComponent } from './candidlist/candidlist.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AuthService } from './_services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FavouriteslistComponent } from './favouriteslist/favouriteslist.component';
import { ScheduledlistComponent } from './scheduledlist/scheduledlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CandidlistComponent,
    EditprofileComponent,
    FavouriteslistComponent,
    ScheduledlistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgCircleProgressModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
