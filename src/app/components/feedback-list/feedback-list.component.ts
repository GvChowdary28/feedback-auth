import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FeedService } from 'src/app/shared/services/feed.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent {
  registerForm: FormGroup;
  submitted = false;
  feedbackData:any
  showData:any
  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private authService: AuthService,
              private feedService: FeedService,) { }

  ngOnInit() {
    this.fetchData()
  }
  //  To fetch data from the server
  fetchData(){
    let userData = this.authService.userData
    // based on role access the dashboard component
    if(userData.role == "admin"){
      this.showData = true
      this.feedService.getData().subscribe(
        res => {
          this.feedbackData = res
        },
        err => {
          this.toastr.error('Something went wrong please try agian later')
        }
      )
    }
    
  }
}
