import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  photoUrl: string;
  user: any = { filterCriteria: null, defaultScreen: null };
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

  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (this.authService.currentUser.filterCriteria) {
      this.user.filterCriteria = this.authService.currentUser.filterCriteria;
    }
    if (this.authService.currentUser.defaultScreen) {
      this.user.defaultScreen = this.authService.currentUser.defaultScreen;
    }
  }

  updateUser(user: any) {
    this.authService.currentUser.filterCriteria = user.filterCriteria;
    this.authService.currentUser.defaultScreen = user.defaultScreen;
    this.http
      .post(
        'http://10.188.78.251/ResumeRevealer/SaveUserCriteria',
        this.authService.currentUser
      )
      .subscribe(
        () => {
          this.alertifyService.success('Profile updated successfully!');
        },
        error => {
          this.alertifyService.error(error.message);
        }
      );
  }
}
