import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  searchCriteria: string;

  constructor(
    private alertifyService: AlertifyService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(
      () => {
        this.alertifyService.success('Logged in successfully!');
      },
      error => {
        this.alertifyService.error(error.message);
      },
      () => {
        if (this.authService.currentUser && this.authService.currentUser.name) {
          if (this.authService.currentUser.defaultScreen) {
            if (+this.authService.currentUser.defaultScreen === 1) {
              this.router.navigate(['/candidates']);
            } else if (+this.authService.currentUser.defaultScreen === 2) {
              this.router.navigate(['/favourites']);
            } else if (+this.authService.currentUser.defaultScreen === 3) {
              this.router.navigate(['/scheduled']);
            }
          }
        }
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logOut() {
    this.model = {};
    localStorage.removeItem('user');
    this.authService.currentUser = null;
    this.alertifyService.message('Logged out successfully!');
    this.router.navigate(['/home']);
  }

  search() {
    this.authService.searchCriteria = this.searchCriteria;
    if (this.router.url === '/candidates') {
      this.router.navigateByUrl('http://localhost:4200/candidates');
    } else {
      this.router.navigate(['/candidates']);
    }
  }
}
