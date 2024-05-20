import { Component, ViewChild } from '@angular/core';
import { CareerService } from '../../services/career.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalComponent } from '../modal/modal.component';
import { ModalType } from '../../interfaces/shared.interface';
@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrl: './corporate.component.scss'
})
export class CorporateComponent {
  successmessage: string="";
  successtitle: string="";

  constructor(private careerService: CareerService, private spinner: NgxSpinnerService) { }
  @ViewChild(ModalComponent) modal!: ModalComponent;
  modalType = ModalType;
  modalMessage: string = "";
  modalTitle: string = "";
  showModal: ModalType | undefined;
  invalidCode:boolean= false;
  isVerified:boolean=true;
  corporateForm = {
    name: '',
    email: "",
    contactNumber: "",
    description: "",
    companyName: "",
    designation: "",
   // paymentCode: ""
  }
  form: any;
  corporateData: any;
  async createCorporate(form: any) {
    this.spinner.show();
    try {
      this.corporateData = {
        userFullName: this.corporateForm.name,
        userEmail: this.corporateForm.email,
        contactNumber: this.corporateForm.contactNumber,
        isContactNumberVerified: false,
        companyName: this.corporateForm.companyName,
        userDesignation: this.corporateForm.designation,
        userMessage: this.corporateForm.description
      }
      console.log(this.corporateData)
      //debugger
      let response = await this.careerService.createCorporateUser(this.corporateData)
      if(response){
        this.spinner.hide();
      this.modelOpen()
      }

    } catch (error:any) {
      this.spinner.hide();
      console.log(error)
      //this.successmessage="Something went wrong. Please try again after sometime"
      if(error.status==409){
      this.successtitle="Error"
      this.openModal(ModalType.SUCCESS_MESSAGE)
      }else{
        this.successmessage= "Something went wrong. Please try again after sometime"
        this.successtitle="Error"
        this.openModal(ModalType.SUCCESS_MESSAGE)
      }
    }

  }
  verifyOTP(){
    this.isVerified=!this.isVerified
  }
  openOtpModal(){

  }

  modelOpen(){
  debugger
    //this.successmessage="Thank you for expressing interest in Worko.ai! Our team will reach out to you shortly to discuss how we can help streamline your hiring process and promote P2P hiring within your organization. Stay tuned!";
    this.successtitle="Congratulations!";
    this.openModal(ModalType.SUCCESS_MESSAGE)
  }
  
  cancel(){
  
    this.closeModal();
    window.location.reload();
  }


  /**
  * Open modal.
  *
  * @param {ModalType} modalType
  * @param {string} [message = ""]
  * @param {string} [title = ""]
  * @returns {void}
  */
  openModal(modalType: ModalType, message: string = "", title: string = ""): void {
    this.showModal = modalType;
    this.modalMessage = message;
    this.modalTitle = title;
    this.modal.open();
  }
  /**
   * Close modal.
   *
   * @returns {void}
   */
  closeModal(): void {
    
    this.modal.cancel();
  }
}
