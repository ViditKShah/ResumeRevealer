import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CandidlistComponent } from './candidlist/candidlist.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { FavouriteslistComponent } from './favouriteslist/favouriteslist.component';
import { ScheduledlistComponent } from './scheduledlist/scheduledlist.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'favourites', component: FavouriteslistComponent },
  { path: 'candidates', component: CandidlistComponent },
  { path: 'scheduled', component: ScheduledlistComponent },
  { path: 'editprofile', component: EditprofileComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
