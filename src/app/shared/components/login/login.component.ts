import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup
  submitted:any = false;
  tooltipData:any
  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private toastr: ToastrService,
              private spinner:NgxSpinnerService,
              private authService: AuthService,
              private router: Router){}

  ngOnInit(): void {
    this.tooltipData = ``
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["",  Validators.required],
    })
    this.loginService.getData().subscribe(
      res => {
        // this.users = res
      },
      err => {
        console.log(err)
      }
    )
  }
  get loginformValue(){return this.loginForm.controls}

  onLogin(){
    this.submitted = true
    if(this.loginForm.invalid){
      return
    }else{
      let username = this.loginForm.controls['username'].value
      let password = this.loginForm.controls['password'].value
      //  fetch form values and get access based on  subscription
      this.loginService.login(username, password).subscribe(
        res => {
          console.log(res)
          let user = res
          this.spinner.show();
          setTimeout(() => {
            this.spinner.hide();
            if(user){
              this.authService.getLoggedInData(user)
              this.submitted = false
              this.loginForm.reset()
              this.router.navigate(['/dashboard']);
            }else{
              this.toastr.error('Username/Password is incorrect')
            }
          }, 3000);
        }
      )
    }
    
  }
} 
