import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-scheduledlist',
  templateUrl: './scheduledlist.component.html',
  styleUrls: ['./scheduledlist.component.css']
})
export class ScheduledlistComponent implements OnInit {
  @ViewChild('l1Form') scheduleForm: NgForm;
  @ViewChild('l2Form') shareForm: NgForm;

  url = environment.apiUrl;
  apiUrl = environment.apiUrl;
  scheduledL1 = { l1Comments: '' };
  scheduledL2 = { l2Comments: '' };
  l1Display = 'none';
  l2Display = 'none';
  isl1ShortlistedClicked = false;
  isl1RejectedClicked = false;
  isl2ShortlistedClicked = false;
  isl2RejectedClicked = false;
  scheduledCandidates: any;
  currentCandidate: any;

  constructor(
    private http: HttpClient,
    private alertifyService: AlertifyService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.getScheduledCandidates();
  }

  getScheduledCandidates() {
    this.http
      .get<any>(
        this.url + 'GetAllCandidates?userId=' + this.authService.currentUser.id
      )
      .subscribe(response => {
        this.scheduledCandidates = response.filter(
          x =>
            x.status &&
            (x.status.toString() === '1' || x.status.toString() === '2')
        );
      });
  }

  setWidth(candidateStatus: any, l1Comments: any, l2Comments: any) {
    if (candidateStatus.toString() === '1') {
      return '35%';
    } else if (candidateStatus.toString() === '2' && l2Comments) {
      return '100%';
    } else if (candidateStatus.toString() === '2' && l1Comments) {
      return '70%';
    }
  }

  setL2Background(candidateStatus: any, l1Comments: any, l2Comments: any) {
    if (candidateStatus.toString() === '2' && l2Comments) {
      return '#dd4814';
    } else if (candidateStatus.toString() === '2' && l1Comments) {
      return '#dd4814';
    }
  }

  setSelectedBackground(
    candidateStatus: any,
    l1Comments: any,
    l2Comments: any
  ) {
    if (candidateStatus.toString() === '2' && l2Comments) {
      return '#dd4814';
    }
  }

  openL1ModalDialog(candidate: any) {
    this.l1Display = 'block';
    this.currentCandidate = candidate;
    this.scheduledL1.l1Comments = this.currentCandidate.l1Comments;
  }

  closeL1ModalDialog() {
    this.l1Display = 'none';
  }

  openL2ModalDialog(candidate: any) {
    this.l2Display = 'block';
    this.currentCandidate = candidate;
    this.scheduledL2.l2Comments = this.currentCandidate.l2Comments;
  }

  closeL2ModalDialog() {
    this.l2Display = 'none';
  }

  rejectedClick(level: string) {
    if (level === 'l1') {
      this.currentCandidate.l1Comments = this.scheduledL1.l1Comments;
      this.currentCandidate.l1UserId = this.authService.currentUser.id;
      this.isl1RejectedClicked = true;
    } else if (level === 'l2') {
      this.currentCandidate.l2Comments = this.scheduledL2.l2Comments;
      this.currentCandidate.l2UserId = this.authService.currentUser.id;
      this.isl2RejectedClicked = true;
    }
    this.currentCandidate.status = '3';
    this.http
      .post(this.url + 'ScheduleCandidate', this.currentCandidate)
      .subscribe(response => {
        this.getScheduledCandidates();
      });
  }

  shortlistedClick(level: string) {
    if (level === 'l1') {
      this.currentCandidate.l1Comments = this.scheduledL1.l1Comments;
      this.currentCandidate.l1UserId = this.authService.currentUser.id;
      this.isl1ShortlistedClicked = true;
    } else if (level === 'l2') {
      this.currentCandidate.l2Comments = this.scheduledL2.l2Comments;
      this.currentCandidate.l2UserId = this.authService.currentUser.id;
      this.isl2ShortlistedClicked = true;
    }
    this.currentCandidate.status = '2';
    this.http
      .post(this.url + 'ScheduleCandidate', this.currentCandidate)
      .subscribe(response => {
        this.getScheduledCandidates();
      });
  }

  l1Updates(scheduledL1: any) {
    this.closeL1ModalDialog();
    this.alertifyService.success('L1 feedback updated successfully!');
  }

  l2Updates(scheduledL2: any) {
    this.closeL2ModalDialog();
    this.alertifyService.success('L2 feedback updated successfully!');
  }
}
