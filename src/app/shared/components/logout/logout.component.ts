import { Component, TemplateRef, EventEmitter  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  modalRef?: BsModalRef;
  public responseMessage: EventEmitter<any> = new EventEmitter()
  constructor(private modalService: BsModalService) {}
  //  trigger the pop up and pass data to parent
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  //  trigger the pop up and pass data to parent
  logout(value:any){
    if(value == "no"){
      this.triggerEvent({status:"No"})
    }else{
      this.triggerEvent({status:"Yes"})
    }
    
  }
  triggerEvent(item:any){
    this.responseMessage.emit(item)
  }
}
