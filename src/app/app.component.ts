import { Component, OnInit } from '@angular/core';
import { AlertifyService } from './_services/alertify.service';
import { User } from './_models/user';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private alertifyService: AlertifyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.alertifyService.position();
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.authService.currentUser = user;
    }
  }
}
