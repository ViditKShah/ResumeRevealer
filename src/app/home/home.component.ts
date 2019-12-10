import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('registerForm') registerForm: NgForm;
  user: any = {
    emailId: '',
    password: '',
    name: '',
    role: null,
    filterCriteria: null,
    defaultScreen: null
  };
  roles = [
    { value: '1', display: 'Recruiter' },
    { value: '2', display: 'Interviewer' }
  ];
  filters = [
    { value: '1', display: 'By Designation' },
    { value: '2', display: 'By Technology' },
    { value: '3', display: 'By Years of Experience' }
  ];
  homePages = [
    { value: '1', display: 'Candidates' },
    { value: '2', display: 'Favourites' },
    { value: '3', display: 'Scheduled' }
  ];
  registerMode = false;
  postRegisterMode = false;

  constructor(
    private alertifyService: AlertifyService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
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

  registerModeOn() {
    this.registerMode = true;
  }

  registerUser(user: any) {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, user);
      this.authService.register(this.user).subscribe(
        () => {
          this.alertifyService.success('Registration successful!');
        },
        error => {
          this.alertifyService.error(error.message);
        },
        () => {
          this.postRegisterMode = true;
        }
      );
    }
  }
}
