import { Component, ViewChild } from '@angular/core';
import { CareerService } from '../../services/career.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalComponent } from '../modal/modal.component';
import { ModalType } from '../../interfaces/shared.interface';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrl: './corporate.component.scss'
})
export class CorporateComponent {
  successmessage: string="";
  successtitle: string="";
  isResendDisabled: boolean=false;
  countdown!: number;

  constructor(private careerService: CareerService, private spinner: NgxSpinnerService) { }
  @ViewChild('corporate')
  corporateFormDirective!: NgForm;
  @ViewChild(ModalComponent) modal!: ModalComponent;
  modalType = ModalType;
  modalMessage: string = "";
  modalTitle: string = "";
  showModal: ModalType | undefined;
  invalidCode:boolean= false;
  isVerified:boolean=true;
  isOtpSent:boolean=true;
  isResentOtp:boolean=true;
  isContactNumberVerified:boolean=false;
  minutes!: string;
  seconds!: string;
  corporateForm = {
    name: '',
    email: "",
    contactNumber: "",
    description: "",
    companyName: "",
    designation: "",
   paymentCode: ""
  }
  form!: NgForm;
  corporateData: any;
  async createCorporate(form: NgForm) {
    this.spinner.show();
    try {
      this.corporateData = {
        userFullName: this.corporateForm.name,
        userEmail: this.corporateForm.email,
        contactNumber: this.corporateForm.contactNumber,
        isContactNumberVerified:this.isContactNumberVerified,
        companyName: this.corporateForm.companyName,
        userDesignation: this.corporateForm.designation,
        userMessage: this.corporateForm.description
      }
      // console.log(this.corporateData)
      //debugger
      let response = await this.careerService.createCorporateUser(this.corporateData)
      if(response){
        this.spinner.hide();
        this.corporateFormDirective.resetForm()
      this.modelOpen()
      }

    } catch (error:any) {
      this.spinner.hide();
      // console.log(error)
      //this.successmessage="Something went wrong. Please try again after sometime"
      if(error.status==409){
      this.successtitle="Error"
      this.corporateFormDirective.resetForm()
      this.openModal(ModalType.SUCCESS_MESSAGE)
      }else{
        this.successmessage= "Something went wrong. Please try again after sometime"
        this.corporateFormDirective.resetForm()
        this.successtitle="Error"
        this.openModal(ModalType.SUCCESS_MESSAGE)
      }
    }

  }

/*api to send request for otp*/
  async sendEmail(){
    try{
  let response= await this.careerService.corporateEmailVerification(this.corporateForm.email,this.corporateForm.name);
  if(response.id){
    // console.log(response.id)
    // console.log("success");
    this.isOtpSent=!this.isOtpSent
    this.successmessage= "We have sent a code by email to "+this.corporateForm.email
    this.successtitle="Verify E-MAIL"
    this.openModal(ModalType.SUCCESS_MESSAGE)
    this.startResendCountdown();
    
  }else{
    this.successmessage= "Something went wrong. Please try again after sometime"
    this.successtitle="Error"
    this.openModal(ModalType.SUCCESS_MESSAGE)
  }
}catch(error){
  this.successmessage= "Something went wrong. Please try again after sometime"
  this.successtitle="Error"
  this.openModal(ModalType.SUCCESS_MESSAGE)
}
  }

  /*api to verify otp */
  async verifyOTP(){
    try{
     // debugger
    let response= await this.careerService.corporateverifyOtp(this.corporateForm.email,this.corporateForm.paymentCode);
    // console.log(response.verificationStatus)
    if(response.verificationStatus==true){
     
      this.isResentOtp=!this.isResentOtp
      this.isVerified=!this.isVerified;
      this.isContactNumberVerified=true;
      this.successmessage= "OTP is verified successfully"
      this.successtitle="Success!"
      this.openModal(ModalType.SUCCESS_MESSAGE)
      
    }else{
      this.corporateForm.paymentCode="";
      this.successmessage= "OTP is incorrect.Please try again with resend"
      this.successtitle="Error"
      this.openModal(ModalType.SUCCESS_MESSAGE)
    }
  }catch(error){
    this.successmessage= "Something went wrong. Please try again after sometime"
    this.successtitle="Error"
    this.openModal(ModalType.SUCCESS_MESSAGE)
  }
   
  }

  async verifyResentOTP(){
    try{
      let response= await this.careerService.corporateEmailVerification(this.corporateForm.email,this.corporateForm.name);
      if(response.id){
        // console.log(response.id)
        // console.log("success");
        this.successmessage= "We have sent a code by email to "+this.corporateForm.email
        this.successtitle="Verify E-MAIL"
        this.openModal(ModalType.SUCCESS_MESSAGE)
        this.startResendCountdown();
       
        //this.isOtpSent=!this.isOtpSent
        
      }else{
        this.successmessage= "Something went wrong. Please try again after sometime"
        this.successtitle="Error"
        this.openModal(ModalType.SUCCESS_MESSAGE)
      }
    }catch(error){
      this.successmessage= "Something went wrong. Please try again after sometime"
      this.successtitle="Error"
      this.openModal(ModalType.SUCCESS_MESSAGE)
    }
  }
  // startResendCountdown() {
  //   this.isResendDisabled = true;
  //   this.countdown = 90;
  //   const interval = setInterval(() => {
  //     this.countdown--;
  //     if (this.countdown <= 0) {
  //       clearInterval(interval);
  //       this.isResendDisabled = false;
  //     }
  //   }, 1000);
  // }

  startResendCountdown() {
    this.isResendDisabled = true;
    this.countdown = 90; // 1 minute 30 seconds
    this.updateCountdownDisplay();
    const interval = setInterval(() => {
      this.countdown--;
      this.updateCountdownDisplay();
      if (this.countdown <= 0) {
        clearInterval(interval);
        this.isResendDisabled = false;
      }
    }, 1000);
  }

  updateCountdownDisplay() {
    this.minutes = String(Math.floor(this.countdown / 60)).padStart(2, '0');
    this.seconds = String(this.countdown % 60).padStart(2, '0');
  }


  modelOpen(){
//  debugger
    //this.successmessage="Thank you for expressing interest in Worko.ai! Our team will reach out to you shortly to discuss how we can help streamline your hiring process and promote P2P hiring within your organization. Stay tuned!";
    this.successtitle="Congratulations!";
    this.openModal(ModalType.SUCCESS_MESSAGE)
  }
  
  cancel(){
  
    this.closeModal();
    this.successmessage="";
    this.successtitle=""
    //window.location.reload();
  
  
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
