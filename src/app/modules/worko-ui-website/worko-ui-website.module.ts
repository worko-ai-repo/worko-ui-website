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

export const routes: Routes = [
  {
    path: '',
    component: WorkoUiWebsiteComponent,
    children: [
      // {
      //   path: 'index',
      //   component: HomeComponent
      // },
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
    TermsOfServiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class WorkoUiWebsiteModule { }
