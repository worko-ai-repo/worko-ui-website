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
  activeIndexForEmployee: number = 0;
  toggleSymbolsForEmployee: { [key: number]: boolean } = {};

  selectTab(tabId: string): void {
    this.activeTab = tabId;
  }



  toggleAccordion(index: number) {
    for (const key in this.toggleSymbols) {
      if (Object.prototype.hasOwnProperty.call(this.toggleSymbols, key)) {
        if (this.toggleSymbols[key] != this.toggleSymbols[index]) {
          this.toggleSymbols[key] = false; // Set all to false initially
        }
      }
    }
    console.log("Clicked accordion", index);
    if (this.activeIndex === index) {
      this.activeIndex = 0;
    } else {
      this.activeIndex = index;
    }
    this.toggleSymbols[index] = !this.toggleSymbols[index];
    console.log("active index:", this.activeIndex)
  }
  toggleAccordionForEmployee(index: number) {
    for (const key in this.toggleSymbolsForEmployee) {
      if (Object.prototype.hasOwnProperty.call(this.toggleSymbolsForEmployee, key)) {
        if (this.toggleSymbolsForEmployee[key] != this.toggleSymbolsForEmployee[index]) {
          this.toggleSymbolsForEmployee[key] = false; // Set all to false initially
        }
      }
    }

    console.log("Clicked accordion", index);
    if (this.activeIndexForEmployee === index) {

      this.activeIndexForEmployee = 0;
    } else {

      this.activeIndexForEmployee = index;
    }


    this.toggleSymbolsForEmployee[index] = !this.toggleSymbolsForEmployee[index];
    console.log("active index:", this.activeIndexForEmployee)
  }

}
