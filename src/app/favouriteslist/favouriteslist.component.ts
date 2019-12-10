import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favouriteslist',
  templateUrl: './favouriteslist.component.html',
  styleUrls: ['./favouriteslist.component.css']
})
export class FavouriteslistComponent implements OnInit {
  @ViewChild('scheduleForm') scheduleForm: NgForm;
  @ViewChild('shareForm') shareForm: NgForm;

  url = environment.apiUrl;
  apiUrl = environment.apiUrl;
  currentCandidate: any;
  candidates: any;
  date: Date;
  scheduledDisplay = 'none';
  shareDisplay = 'none';
  favouritesStatus = false;
  schedule = { scheduleDateTime: null, interviewer: '' };
  share = { emailTo: '', emailCc: '', emailSubject: '', emailBody: '' };
  interviewers = [{ id: null, name: 'Select interviewer', emailId: null }];
  statusColors = ['#4bb543', 'yellow', 'red'];

  constructor(
    private http: HttpClient,
    private alertifyService: AlertifyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getCandidates();
    this.getInterviewers();
    this.schedule.interviewer = null;
  }

  getStatusDotColor(candidateStatus: any) {
    if (!candidateStatus) {
      return this.statusColors[0];
    } else if (candidateStatus === '1' || candidateStatus === '2') {
      return this.statusColors[1];
    } else {
      return this.statusColors[2];
    }
  }

  getCandidates() {
    this.http
      .get<any>(
        this.url + 'GetAllCandidates?userId=' + this.authService.currentUser.id
      )
      .subscribe(response => {
        this.candidates = response.filter(x => x.isfavorite === true);
      });
  }

  getInterviewers() {
    this.http.get<any>(this.apiUrl + 'GetInterviewers').subscribe(response => {
      response.forEach((item: { id: any; name: any; emailId: any }) => {
        this.interviewers.push({
          id: item.id,
          name: item.name,
          emailId: item.emailId
        });
      });
    });
  }

  addToFavourites(email: any, isFavourite: boolean) {
    this.http
      .post(
        // tslint:disable-next-line: max-line-length
        this.url +
          'SaveIsFavorite?userId=' +
          this.authService.currentUser.id +
          '&emailId=' +
          email +
          '&isFavorite=' +
          !isFavourite,
        {}
      )
      .subscribe(response => {
        if (response) {
          if (!isFavourite) {
            this.alertifyService.success('Added to favourites successfully!');
          } else {
            this.alertifyService.success(
              'Removed from favourites successfully!'
            );
          }
          this.getCandidates();
        }
      });
  }

  scheduleInterview(schedule: any) {
    schedule.path = this.currentCandidate.path;
    schedule.status = '1';
    const interviewer = this.interviewers.filter(
      x => x.id != null && x.id.toString() === schedule.interviewer.toString()
    );
    let emailId;
    if (interviewer.length > 0) {
      emailId = interviewer[0].emailId;
    }
    const scheduleObj = {
      toPerson: emailId,
      fromPerson: this.authService.currentUser.emailId,
      filePath: schedule.path,
      subject: 'Test subject',
      body: 'Test body'
    };
    this.http
      .post(this.apiUrl + 'ScheduleCandidate', schedule)
      .subscribe(response1 => {
        if (response1) {
          this.http
            .post(this.url + 'ShareTheResume', scheduleObj)
            .subscribe(response2 => {
              if (response2) {
                this.alertifyService.success(
                  'Interview scheduled successfully!'
                );
              }
            });
        }
      });
    this.closeScheduledModalDialog();
  }

  shareResume(share: any) {
    this.closeShareModalDialog();
    this.alertifyService.success('Resume shared successfully!');
  }

  openScheduledModalDialog(candidate: any) {
    this.currentCandidate = candidate;
    this.scheduledDisplay = 'block';
  }

  closeScheduledModalDialog() {
    this.scheduledDisplay = 'none';
  }

  openShareModalDialog() {
    this.shareDisplay = 'block';
  }

  closeShareModalDialog() {
    this.shareDisplay = 'none';
  }
}
