import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FeedService } from 'src/app/shared/services/feed.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit{
  feedbackForm: FormGroup;
  submitted:any = false

  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService, 
              private spinner:NgxSpinnerService,
              private feedService: FeedService){}
  
  ngOnInit(): void {
    // Used to get form values and validations
    this.feedbackForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["",  Validators.required],
      company: ["",  Validators.required],
      comments: ["",  Validators.required]
    })
  }
  get feedbackFromValue(){return this.feedbackForm.controls}

  onSubmit(){
    // On submit check for valid form and proceed further
    this.submitted = true
    if(this.feedbackForm.invalid){
      return
    }else{
      this.spinner.show();
      let data = this.feedbackForm.value
      //  Used to post data to the server
      this.feedService.postData(data).subscribe(
        res => {
          setTimeout(() => {
            this.spinner.hide();
            this.toastr.success('Feedback submitted successfully')
            this.submitted = false
            this.feedbackForm.reset();
          }, 3000);
          
        },
        err => {
          setTimeout(() => {
            this.spinner.hide();
            this.toastr.error("Something went wrong, Please try again once you connect json server")
          }, 3000);
          
        }
      )
    }
    
  }
}
