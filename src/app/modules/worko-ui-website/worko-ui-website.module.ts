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
        component: CorporateComponent
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
    IndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class WorkoUiWebsiteModule { }
