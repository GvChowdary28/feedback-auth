import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/_model/user';
import { AuthService } from '../../services/auth.service';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LogoutComponent } from '../logout/logout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  modalRef?: BsModalRef;
  user?: User | null;
  userSub!:Subscription

  constructor(private authService: AuthService,
    private router: Router,
    private modalService: BsModalService){}

  public currentUser: any;
  public isAuthenticated$ = this.authService.isAuthenticated$;

  ngOnInit(): void {
    //  Check for is Auth and make dynamic change in the header
    this.isAuthenticated$.subscribe(authenticated => {
      if (authenticated) {
        this.currentUser = authenticated; 
      } else {
        this.currentUser = null;
      }
    });
  }
  onLogout(){
    //  open modal popup and based on button click trigger the reaction 
    this.modalRef = this.modalService.show(LogoutComponent);
    this.modalRef.content.responseMessage.subscribe(
      (res:any) => {
        console.log(res)
        if(res.status == "No"){
          this.modalRef?.hide()
        }
        else{
          this.modalRef?.hide()
          
          this.currentUser = null
          this.router.navigate(['/login']);
          this.authService.logout()
        }
      }
    )
    
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
