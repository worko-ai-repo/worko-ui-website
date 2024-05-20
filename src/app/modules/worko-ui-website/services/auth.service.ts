import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
    console.log('auth ExampleComponent initialized');
  }


  /**
  * Get Http Options.
  *
  * @param {boolean} [authorization = true]
  * @param {any} [params = {}]
  * @returns {any}
  */
  getHttpOptions(authorization: boolean = true, params: any = {}): any {
    let headers: any = {  };
    if(!params){
     headers={'Content-Type': 'application/json'}
    }

    if (authorization) {
    //   headers.Authorization = `Bearer ${this.cognitoService.getAccessToken()}`;
    headers.Authorization = "Bearer ";
      if (headers.Authorization == "Bearer ") {
        headers.Authorization = 'Bearer dummyTokenWeArePassing';
      }
      // console.log(headers.Authorization, "AccessToken");
    }
    // headers['Access-Control-Allow-Origin'] = '*';

    if (params?.xTenantId) {
      headers['X-TenantID'] = `${params.xTenantId}`;
    }

    if (params?.stateId) {
      headers['stateId'] = `${params.stateId}`;
    }

    if (params?.schoolId) {
      headers['schoolId'] = `${params.schoolId}`;
    }

    if (params?.awsS3Tag) {
      headers = { 'Content-Type': params["fileType"] };
      headers['x-amz-tagging'] = `${params.awsS3Tag}`;
    }

    const httpOptions = {
      headers: new HttpHeaders(headers),
    };

    // if (params?.params) {
    //   httpOptions['params'] = params.params;
    // }

    return httpOptions;
  }

  uploadFileOnS3Bucket(file: File, signedUrl: string, awsS3Tag: string): Promise<any> {
    return this.http.put(signedUrl, file, this.getHttpOptions(false, { awsS3Tag: awsS3Tag, "fileType": file.type  })).toPromise()
  }
}
