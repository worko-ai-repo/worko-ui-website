import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private meta: Meta, private titleService: Title) { }

  updateCanonicalUrl(url: string) {
    const head = document.getElementsByTagName('head')[0];
    let element = head.querySelector(`link[rel='canonical']`) as HTMLLinkElement;

    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', 'canonical');
      head.appendChild(element);
    }

    element.setAttribute('href', url);
  }

  updateRobots(content: string) {
    this.meta.updateTag({ name: 'robots', content });
  }

  urlNeedsIndexing(url: string): boolean {
    const indexableUrls = ['', '/', '/faq', '/corporate', '/about-us'];
    return indexableUrls.includes(url);
  }
}
