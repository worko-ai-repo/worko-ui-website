import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { WorkoUiWebsiteComponent } from './worko-ui-website.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

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
    ]
    }
  ]

@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    WorkoUiWebsiteComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class WorkoUiWebsiteModule { }
