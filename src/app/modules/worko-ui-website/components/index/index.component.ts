import { Component } from '@angular/core';
import { CompanyListingService } from '../../services/company-listing.service';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  companyList: any[] = [];
  pageSize = 50;
  lastKey: string | undefined = undefined;
  loadedOnce: boolean = true;
  filterData: any = {
    teamSize: "",
    industryType: "",
    companyName: ""
  }
  getReferral: boolean = true;
  giveReferral: boolean = false;
  assetLogos: string[] = [];
  intervalId: any;

  // For swapping Get referrals and give referrals buttons:

  async ngOnInit(): Promise<void> {
    this.getCompanyDetails();
    // setInterval(() => {
    //   this.swapValues();
    // }, 3000); 
    this.intervalId = setInterval(() => {
      this.swapValues();
    }, 3000);
    localStorage.removeItem('companyid')
    localStorage.removeItem('openGudianceTrigger')
    localStorage.removeItem('userType')
    const excludedNumbers = [83, 87, 90, 101, 103, 108, 110, 140, 147, 150, 158, 161, 177, 179, 217, 218, 224, 231, 243, 256, 289, 291, 298, 301, 308, 317, 323, 328, 334, 337, 354, 359, 362, 382, 403, 405, 431, 442, 452, 457, 477, 489, 503, 513, 520, 521, 525, 528, 531, 536, 540, 563, 566, 567, 579, 583, 585, 631, 634, 636, 638, 659, 660, 677, 689, 697, 704, 716, 720, 738, 757, 770, 796, 798, 809, 823, 828, 837, 843, 850, 852, 932, 935, 947, 949, 954, 971, 983, 984, 986, 992, 1024, 1040];

    this.assetLogos = await this.generateLogoFilenames(1, 1045, excludedNumbers);

  }

  constructor(private companyListing: CompanyListingService, private router: Router) { }

  swapValues() {
    const temp = this.getReferral;
    this.getReferral = this.giveReferral;
    this.giveReferral = temp;
  }
  // Function to stop swapping when user hover on button
  stopSwapping() {

    clearInterval(this.intervalId);
  }

  // Function to resume swapping when user hover on button
  resumeSwapping() {
    this.intervalId = setInterval(() => {
      this.swapValues();
    }, 3000);
  }

  openGetReferral() {
    // if (this.userLoggedIn) {
    //   this.redirectToEmployeeReferral();
    // } else {
    //   this.userType = "employee";
    //   this.openModal(ModalType.LOGIN_SIGNUP);
    // }
    // localStorage.setItem("userType",'employee')
    // const iframe = document.createElement('IFRAME');
    // iframe.id = 'admin-ifr';
    // iframe.style.display = "none";
    // (<HTMLIFrameElement>iframe).src = environment.crossOriginUrl;
    // document.body.appendChild(iframe);
    // this.postAdminData(environment.crossOriginUrl, 'admin');
    window.location.href = environment.crossOriginUrl + '/login?userType=employee';
    //window.location.href = 'https://app.worko.ai//employee/Referral';
  }

  async redirectToCompanyListing() {
    // this.router.navigateByUrl('/company-listing');

    window.location.href = environment.crossOriginUrl + '/companies';
  }

  async redirectToEmployeeReferral() {
    window.location.href = environment.crossOriginUrl + '/login'
  }

  //  Reviews section: carousel code starts
  reviews = [
    {
      "image": "/assets/images/card-img1.png",
      "content": "After reaching out to numerous connections on LinkedIn without much success, I turned to Worko for help. The team went above and beyond to assist me in securing referrals, and within a few weeks, I started receiving interview calls from some of the companies I applied to.",
      "name": "Sneha Gupta",
      "company": "EY"
    },
    {
      "image": "/assets/images/card-img2.png",
      "content": "Worko not only helped me secure referrals at my dream companies but also provided invaluable support during the interview process. The Interview Handholding service from a senior employee was immensely helpful and aided me greatly in my preparation.",
      "name": "Aditya Raj",
      "company": "Flipkart"
    },
    {
      "image": "/assets/images/card-img3.png",
      "content": "Worko's Peer 2 Peer hiring approach is truly revolutionary. Unlike other platforms, they never bombard me with random CVs. Instead, I find top-tier candidates perfectly matched to our requirements. Not only have I earned a significant referral bonus, but my HR team is also thrilled with the quality of candidates I refer.",
      "name": "A referee from Paytm",
      "company": "Paytm"
    },
    {
      "image": "/assets/images/card-img1.png",
      "content": "Despite applying to jobs on various portals like Naukri and IIMjobs, I wasn't making any headway. Thanks to Worko, not only did I secure strong referrals, but I also received interview calls, which was a game-changer for me.",
      "name": "Avijit Sarkar",
      "company": "Amazon"
    },
    {
      "image": "/assets/images/card-img2.png",
      "content": "When I faced rejection for not receiving a referral on Worko, I reached out to their team for assistance. I was impressed by the detailed help I received, from CV preparation to finding the right job opportunities. Thanks to Worko, I found the platform to be a much-needed blessing.",
      "name": "Rahul Kumar",
      "company": "Swiggy"
    },
    {
      "image": "/assets/images/card-img3.png",
      "content": "I initially referred candidates on Worko out of goodwill, even though my previous company lacked a referral policy. Little did I know that this act of kindness would come full circle. When I found myself laid off months later, Worko stepped in, offering their services free of charge. Their empathy, honesty, and transparency ultimately helped me secure a new job within just two months. Worko's support proved invaluable, showcasing their commitment to their users' success.",
      "name": "A Referee from Amazon",
      "company": "Amazon"
    },
    {
      "image": "/assets/images/card-img1.png",
      "content": "I want to express my gratitude for creating Worko. It's a much-needed platform today. The website experience and referral process are seamless. Your personalized approach to engaging with job seekers is commendable and will likely lead to positive word-of-mouth marketing. Achieving so much in such a short time is impressive. Best of luck to your team!",
      "name": "Amit Jetwani",
      "company": "CareEdge group"
    },
    {
      "image": "/assets/images/card-img1.png",
      "content": "Unlike other chaotic platforms, Worko's Peer 2 Peer hiring approach has made finding quality candidates a breeze. No longer do I have to sift through unfiltered resumes. With Worko, I easily find experienced and vetted candidates, maximizing my referral bonus.",
      "name": "A Referee from Muthoot Fincorp",
      "company": "Muthoot Fincorp"
    },
    {
      "image": "/assets/images/card-img2.png",
      "content": "I had been struggling to make headway in my job search, especially at the companies I aspired to work for. Worko came to my rescue, offering not only referral but also personalized guidance on resume improvement. With Worko's assistance, I finally managed to land an interview & then job at my dream company!",
      "name": "Sancheti Kaur",
      "company": "Walmart"
    },
    {
      "image": "/assets/images/card-img3.png",
      "content": "My lack of attendance at a Tier-1 college posed challenges in securing interviews at top companies. Thanks to Worko, I found someone who not only referred me to Google but also provided invaluable guidance throughout the interview process. Worko truly opened doors for me at Google.",
      "name": "Rohan Kumar",
      "company": "Google"
    },
    {
      "image": "/assets/images/card-img2.png",
      "content": "I appreciated the transparency and effort at Worko. Previously, I was referred to a few jobs but didn't receive any calls. Later on, with the help of the Worko team, I was able to find the right set of jobs for me. Their support throughout the process landed me quite a few good interviews and, eventually, a job.",
      "name": "Shruti Rai",
      "company": "Makemytrip"
    },
    {
      "image": "/assets/images/card-img3.png",
      "content": "Beyond just revolutionizing recruitment, Worko excels in providing exceptional post-referral services. I've had the opportunity to offer guidance to candidates, and the experience has been incredibly rewarding. Not only am I helping others, but I'm also being compensated generously for my time and expertise.",
      "name": "A Referee from Google",
      "company": "Google"
    }
  ]

  marginLeft: number = -25;
  marginLeftmd: number = -66;
  marginLeftsm: number = -74;
  currentIndex: number = 0;
  prevButtonDisabled: boolean = false;
  nextButtonDisabled: boolean = false;

  previousReview() {
    console.log(this.currentIndex);
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.nextButtonDisabled = false;
      this.adjustMarginLeft();
    } else {

      this.prevButtonDisabled = true;
      this.marginLeft = 3;
      this.marginLeftmd = 3;
      this.marginLeftsm = 6;
      // const lastReview = this.reviews.pop()!;
      // this.reviews.unshift(lastReview);
    }
    // this.adjustMarginLeft();
  }

  nextReview() {
    if (this.currentIndex < this.reviews.length - 3) {
      this.currentIndex++;
      this.prevButtonDisabled = false;
      this.adjustMarginLeft();
    } else {

      this.nextButtonDisabled = true;
      // const lastReview = this.reviews.pop()!;
      // this.reviews.unshift(lastReview);
      this.marginLeft = -15 - (this.currentIndex) * 50 - 55;
      this.marginLeftmd = -(this.currentIndex + 1) * 80 - 70;
      this.marginLeftsm = -(this.currentIndex + 1) * 80 - 140;
    }
    // this.adjustMarginLeft();
  }

  adjustMarginLeft() {
    this.marginLeft = -27 - this.currentIndex * 51 - this.currentIndex;
    this.marginLeftmd = -66 - this.currentIndex * 80 - this.currentIndex;
    this.marginLeftsm = -74 - this.currentIndex * 86 - this.currentIndex;
  }

  // Reviews carousel section ends

  async getCompanyDetails() {


    await this.companyListing.getCompanyListing(this.pageSize, this.lastKey, this.filterData.teamSize, this.filterData.industryType, this.filterData.companyName).then(async (response) => {
      if (response) {
        console.log("Helo11");
        //this.spinner.hide();
        // if (this.loadedOnce) {
        //   this.companyList = [];
        // }
        this.companyList = this.companyList.concat(response.data);
        this.lastKey = response.pagination.lastKey;
        this.loadedOnce = false;
        console.log(this.companyList)
        //  this.filterCompanies(); // Filter companies after updating companyList
      }
    })
      .catch(error => {
        console.error('Display Company Listing Error:', error);
        //this.spinner.hide();
      });
  }

  //logic to show assest image 
  generateLogoFilenames(start: number, end: number, excludedNumbers: any[]) {
    const logos = [];
    for (let i = start; i <= end; i++) {
      if (!excludedNumbers.includes(i)) {
        logos.push(`${i}.jpg`);
      }
    }
   
    return logos;
  }

//sending data through url
  async openReferralPage(item: any) {



    const companySk = item.replace(/^ID#/, '');
    const Type = "referral";

    const url = `${environment.crossOriginUrl}/companies?companyID=${companySk}&Type=${Type}`;
    window.location.href = url;
  }


//sending data through url
  openGudiancePage(item: any) {


    const companySk = item.replace(/^ID#/, '');
    console.log(companySk)

    const Type = "guidance";

    const url = `${environment.crossOriginUrl}/companies?companyID=${companySk}&Type=${Type}`;

    window.location.href = url;

  }
  //  List of purposes in purpose section:
  purposeList = [
    {
      image: '/assets/images/purpose1.png', title: "Peer-to-Peer Hiring", text: "We facilitate connections between candidates and employees, helping candidates secure referrals and employees maximise referral bonuses."
    },
    {
      image: '/assets/images/purpose2.png', title: " Interview Hand Holding", text: "During the hiring process, have an internal employee vouch and follow-up for you and provide guidance at each step"
    },
    {
      image: '/assets/images/purpose3.png', title: "Feedback & Transparency", text: "We offer comprehensive job application analysis, recruiter feedback for every referral, and an application status report"
    },
    {
      image: '/assets/images/purpose4.png', title: "Career Guidance", text: "While candidates can get guidance from industry experts, employees can offer their services and earn, creating a win-win path to success."
    },
    {
      image: '/assets/images/purpose5.png', title: "Smart Matching Algorithm", text: "Our advanced algorithm provides detailed feedback and scores to candidates, highlighting their suitability. It informs employees why a referral would be ideal, enhancing the quality of recommendations"
    },
    {
      image: '/assets/images/purpose6.png', title: " Access to Hidden Job", text: "Get access to hidden jobs that are not available on any other platform"
    }
  ]


  //  List of bennefits for benefits section:
  refereeBenefits = [
    {
      image: '/assets/images/rbenefits1.png', text: " Get pre-vetted candidates for referral through our smart matching algorithm."
    },
    {
      image: '/assets/images/rbenefits2.png', text: "Refer best of talent and maximise corporate referral bonus."
    },
    {
      image: '/assets/images/rbenefits3.png', text: " Earn through mock interviews, referrals and mentorship."
    },
    {
      image: '/assets/images/rbenefits4.png', text: "Extend a hand today, and when you need it, the universe echoes your kindness."
    },
    {
      image: '/assets/images/rbenefits5.png', text: " Your anonymity, assured and preserved"
    },
  ]

  candidateBenefits = [
    {
      image: '/assets/images/cbenefits1.png', text: "Get reviewed and referred by the best employees."
    },
    {
      image: '/assets/images/cbenefits2.png', text: " Increase chances of interview calls by 20X!"
    },
    {
      image: '/assets/images/cbenefits3.png', text: " Support and guidance from an internal employee throughout the hiring process."
    },
    {
      image: '/assets/images/cbenefits4.png', text: " AI-powered profile analysis to provide feedback and guidance on the right job"
    },
    {
      image: '/assets/images/cbenefits5.png', text: " Get resume reviewed, career guidance, mock interview from senior industry professionals"
    },
  ]

}

