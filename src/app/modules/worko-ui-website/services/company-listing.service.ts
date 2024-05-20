import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
// import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class CompanyListingService {

  constructor(private http: HttpClient, private authService: AuthService) {
    console.log(' com ExampleComponent initialized');
   }
  
  /**
  * Get Company Listing.
  *
  * @returns {Promise<any>}
  */
 async getCompanyListing(pageSize: number, lastKey?: string, teamSize?: any, industryName?: any, companyName?: string): Promise<any> {
   let url = `${API_URL}company?pageSize=${pageSize}`;

   if (lastKey) {
     url += `&lastKey=${lastKey}`;
   }

   if (teamSize) {
     url += `&teamSize=${teamSize}`;
   }
   if (industryName) {
     url += `&industry=${industryName}`;
   }
   if (companyName) {
     url += `&companyName=${companyName}`;
   }
   try {
     return await this.http.get(url, this.authService.getHttpOptions()).toPromise();
   } catch (error) {
     console.error('Error fetching company listing:', error);
     throw error; // Rethrow the error to be handled by the caller
   }
 }
}
