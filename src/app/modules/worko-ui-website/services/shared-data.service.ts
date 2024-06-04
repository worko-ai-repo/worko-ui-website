import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  companySk: any;
  guidanceTrigger:any;
  iWindow:any
  storageData:any
  userType:any

  constructor() {
   
   }
   
  postCrossDomainMessage(link:any, portal = 'admin') {
   // debugger
    this.companySk = localStorage.getItem('companyid')
    this.guidanceTrigger=localStorage.getItem('openGudianceTrigger')
    this.userType=localStorage.getItem('userType')
    console.log(localStorage.getItem('openGudianceTrigger'))
    console.log(localStorage.getItem('companyid'))

    let postURL: any;
    let iframeId: any;
    if (portal === 'admin') {
        postURL = environment.localUrl;
        iframeId = 'admin-ifr';
    }
    const iframe = document.getElementById(iframeId);
    console.log(iframe);
    if (iframe == null) { return; }
  this.iWindow = (iframe as HTMLIFrameElement).contentWindow;
  if(localStorage.getItem('companyid')){
    console.log("company")
    this.storageData = this.companySk;
    
  }else if(localStorage.getItem('openGudianceTrigger')){
   console.log("gudiance")
    this.storageData = this.guidanceTrigger;
  }else{
    console.log("userType")
    this.storageData=this.userType

  }
    
    console.log(this.storageData);
   

  
      this. iWindow.postMessage(this.storageData, environment.crossOriginUrl);
  
     
   
}
}
