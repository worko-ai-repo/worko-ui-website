import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {

  activeTab: string = 'tab1';
  toggleSymbols: { [key: number]: boolean } = {};
  activeIndex: number = 0;

  selectTab(tabId: string): void {
    this.activeTab = tabId;
  }

  

  toggleAccordion(index: number) {
    console.log("Clicked accordion",index);
    if (this.activeIndex === index) {
      this.activeIndex = 0;
    } else {
      this.activeIndex = index;
    }
    this.toggleSymbols[index] = !this.toggleSymbols[index];
    console.log("active index:", this.activeIndex)
  }

}
