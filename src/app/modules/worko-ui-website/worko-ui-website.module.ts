import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { WorkoUiWebsiteComponent } from './worko-ui-website.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { RefundPolicyComponent } from './components/refund-policy/refund-policy.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { FaqComponent } from './components/faq/faq.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CorporateComponent } from './components/corporate/corporate.component';
import { IndexComponent } from './components/index/index.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


export const routes: Routes = [
  {
    path: '',
    component: WorkoUiWebsiteComponent,
    children: [
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
      },
      {
        path: 'contact-us',
        component: ContactUsComponent
      },
      {
        path: 'refund-policy',
        component: RefundPolicyComponent
      },
      {
        path: 'terms-of-service',
        component: TermsOfServiceComponent
      },
      {
        path : 'faq',
        component: FaqComponent
      },
      {
        path : 'corporate',
        component: CorporateComponent,
        data: {
          title: 'Enhance Your Hiring with Peer-to-Peer Referrals',
          description: 'Join Worko’s Peer-to-Peer Referral Network to streamline your hiring process. Connect with top talent through verified referrals and boost your recruitment efficiency.',
          tags: 'Worko.ai, Peer-to-Peer Referrals, Recruitment Solutions, Employee Referrals, Talent Acquisition, Hiring Network, Worko Corporate Services, Streamlined Recruitment, Verified Referrals'
        }
      },
      {
        path : 'about-us',
        component: AboutUsComponent
      },
    ]
    }
  ]

@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    WorkoUiWebsiteComponent,
    NavbarComponent,
    FooterComponent,
    ContactUsComponent,
    RefundPolicyComponent,
    TermsOfServiceComponent,
    FaqComponent,
    AboutUsComponent,
    CorporateComponent,
    IndexComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ]
})
export class WorkoUiWebsiteModule { }
