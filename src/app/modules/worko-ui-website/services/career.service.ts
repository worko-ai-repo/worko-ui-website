import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { userInfo, corporateInfo } from '../interfaces/auth.interface';
import { AuthService } from './auth.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  /**
   * CareerService constructor.
   *
   * @param {HttpClient} http
   * @param {AuthService} authService
   */
  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * Upload CV.
   *
   * @param {any} documentDetails
   * @returns {Promise<any>}
   */
  uploadCV(documentDetails: any): Promise<any> {
    return this.http.post(API_URL + `file/gsu2u/CAREER_RESUME`, documentDetails, this.authService.getHttpOptions())
      .toPromise()
      .then(response => response as ArrayBuffer)
      //.catch(this.handleError);
  }

  // uploadFileOnS3Bucket(file: File, signedUrl: string, awsS3Tag: string): Promise<any> {
  //   return this.http.put(signedUrl, file, this.authService.getHttpOptions(true, { awsS3Tag: awsS3Tag, "fileType": file.type })).toPromise()
  // }

  // linkResumewithUser(emailId: string, awsS3fileName: string): Promise<any> {
  //   return this.http.patch(API_URL + `user/${emailId}/cv`, { resume: awsS3fileName }, this.authService.getHttpOptions())
  //     .toPromise()
  //     .then(response => response as ArrayBuffer)
  //     .catch(this.handleError);
  // }

  /**
   * Create CareerUser.
   *
   * @param {userInfo} userInfo
   * @returns {Promise<any>}
   */
  createUser(userInfo: userInfo): Promise<any> {
    return this.http.post(API_URL + `career`, userInfo, this.authService.getHttpOptions())
      .toPromise()
      
  }

  /**
   * Create CorporateUser.
   *
   * @param {corporateInfo} corporateInfo
   * @returns {Promise<any>}
   */
  createCorporateUser(corporateInfo: corporateInfo): Promise<any> {
    return this.http.post(API_URL + `corporate`, corporateInfo, this.authService.getHttpOptions())
      .toPromise()
      
  }


     /**
     * request otp for particular email
     */

     corporateEmailVerification(emailAddress:string,name:string):Promise<any>{
      return this.http.post(API_URL+`corporate/${emailAddress}/request-otp`,{fullName:name},this.authService.getHttpOptions()).toPromise();
  
    }
  
    /**
       * verify otp for particular email
       */
  
    corporateverifyOtp(emailAddress:any,otp:any):Promise<any>{
      return this.http.post(API_URL+`corporate/${emailAddress}/verify-otp`,{otp:otp},this.authService.getHttpOptions()).toPromise();
      
    }

 
}