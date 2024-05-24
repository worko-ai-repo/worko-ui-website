import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalType } from '../../interfaces/shared.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { CareerService } from '../../services/career.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

  fileToUpload: File | null = null;
  fileString: string = "";
  fileName: string = "";
  fileType: string = "";
  fileErr: string = "";
  uploadedCvName: string = "";
  CvCloudFileName:string="";
  form!: NgForm;
aboutUsForm={
  name:'',
  email:"",
  contactNumber:"",
 description:"",
}
aboutUsData:any;
@ViewChild(ModalComponent) modal!: ModalComponent;
modalType = ModalType;
modalMessage: string = "";
modalTitle: string = "";
showModal: ModalType | undefined;
successmessage: string='';
successtitle: string='';
uploadedCvCloudName:any='';
docResult:any;
constructor(private careerService:CareerService,private spinner: NgxSpinnerService, private authService: AuthService){}

  createAboutUs(form:NgForm){
    debugger
    this.uploadCv()
  
  }
async aboutUs(){
  try{
    this.spinner.show();
  this.aboutUsData={
    userFullName:this.aboutUsForm.name,
    userEmail:this.aboutUsForm.email,
    userContactNumber:this.aboutUsForm.contactNumber,
    userMessage:this.aboutUsForm.description,
    userCvFileName:this.fileName,
    userCvCloudFileName:this.uploadedCvCloudName,

   }
   console.log(this.aboutUsData)
   debugger
   let response=await this.careerService.createUser(this.aboutUsData)
  // this.uploadCVonS3Bucket(this.docResult)
  if(response){
   this.spinner.hide();
   this.modelOpen()
  }
  }catch(error:any){
    this.spinner.hide();
    console.log(error)
    console.log(error.status)
    if(error.status==409){
      this.successtitle="Error"
      this.openModal(ModalType.SUCCESS_MESSAGE)
    }
    else{
   
    this.successmessage="Something went wrong. Please try again after sometime"
    this.successtitle="Error"
    this.openModal(ModalType.SUCCESS_MESSAGE)
    }
  }
}

  async uploadCv(){
    this.spinner.show()
  try {
   let documentDetails = {
       
    careerCVFileName: this.fileName,
    careerCVFileMimeType: this.fileType
      }
      console.log(documentDetails)
      this.docResult = await this.careerService.uploadCV(documentDetails);
      console.log(this.docResult);

      this.uploadedCvCloudName = this.docResult.cloudFileName;
      this.aboutUs();
     // this.uploadCVonS3Bucket(docResult);

    } catch(error){
      console.log("error"+error)
      this.spinner.hide();
      this.successmessage="Something went wrong. Please try again after sometime"
      this.successtitle="Error"
      this.openModal(ModalType.SUCCESS_MESSAGE)
    }
 

}
uploadCVonS3Bucket(docResult: any) {
  debugger
  try {
    this.authService.uploadFileOnS3Bucket(this.fileToUpload!, docResult.awsS3SignedUrl, docResult.awsS3Tag)
      .then(async () => {
        console.log('File uploaded successfully.');
       
        //try {
           //this.CvCloudFileName = await this.authService.linkResumewithUser(this.aboutUsForm.email, this.uploadedCvCloudName);
      
        
            //this.aboutUs()
        
          
        // } catch (error: any) {
        //   debugger;
        //   if (error && error.error.message) {
        //     // this.errorMessage = error.error.message;
        //     this.spinner.hide();
        //     //this.setErrorMessage('File Link error linkResumewithUser:- ' + error.error.message);
        //   }
        //   this.spinner.hide();
        //   console.error('File Link error linkResumewithUser:', error);
        //   this.successmessage="Something went wrong. Please try again after sometime"
        //   this.successtitle="Error"
        //   this.openModal(ModalType.SUCCESS_MESSAGE)
        // }

      })
      .catch(error => {
        this.spinner.hide();
        console.error('File upload error:', error);
        this.successmessage="Something went wrong. Please try again after sometime"
        this.successtitle="Error"
        this.openModal(ModalType.SUCCESS_MESSAGE)


      });

  } catch (error) {
    console.log(error)
    this.spinner.hide();
    this.successmessage="Something went wrong. Please try again after sometime"
    this.successtitle="Error"
    this.openModal(ModalType.SUCCESS_MESSAGE)
  }
}


handleFileInput(event: Event): void {
  const inputElement = event.target as HTMLInputElement;

  if (inputElement.files) {
    const files: FileList | null = inputElement.files;

    if (files && files.length > 0) {
      const file: File = files[0];

      // Check if the file type is PDF
      if (file.type === 'application/pdf') {
        // Process the PDF file as needed
        this.fileErr = "";
        this.fileToUpload = file;
        this.fileName = file.name;
        this.fileType = file.type;
        console.log('Selected PDF file:', file);
        console.log(this.fileType)
      } else {
        // Display an error for invalid file type
        this.spinner.hide();
        console.error('Invalid file type. Please upload a PDF file.');
        this.fileErr = "Invalid file type. Please upload a PDF file."
        this.fileName = "";
        // Optionally, you can reset the input to clear the invalid selection
        inputElement.value = '';
        this.fileToUpload = null;
        // this.successmessage="Something went wrong. Please try again after sometime"
        // this.successtitle="Error"
        // this.openModal(ModalType.SUCCESS_MESSAGE)
      }
    }
  }
}


modelOpen(){
  
  this.successmessage="Thank you for submitting your CV! We'll be in touch if there's a suitable opportunity matching your skills and experience.";
  this.successtitle="Congratulations!";
  this.openModal(ModalType.SUCCESS_MESSAGE)
}

cancel(){

  this.closeModal();
  this.successmessage="";
  this.successtitle=""
  //this.fileName="",

// this.aboutUsForm={
//   name:'',
//   email:"",
//   contactNumber:"",
//  description:"",

// }
console.log(this.form)
    this.form.reset(this.aboutUsForm.name)
  
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
  // this.referrralComponent.showReferrelRow = true;
  this.modal.cancel();
}

}
