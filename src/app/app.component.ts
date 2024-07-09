import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { SeoService } from './modules/worko-ui-website/services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'worko-ui-website';

  constructor(
    private seoService: SeoService,
    private router: Router,
    private titleService: Title, 
    private metaService: Meta,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // Handling initial navigation here
    this.handleSeoForCurrentUrl(this.router.url);
    // this.setDefaultMetaData();
    // this.updateMetaDataOnNavigation();

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.seoService.updateCanonicalUrl(window.location.href);

      if (this.seoService.urlNeedsIndexing(event.urlAfterRedirects)) {
        this.seoService.updateRobots('index, follow');
      } 
      // else {
      //   this.seoService.updateRobots('noindex, nofollow');
      // }
    });
  }

  private handleSeoForCurrentUrl(url: string) {
    this.seoService.updateCanonicalUrl(window.location.href);
    if (this.seoService.urlNeedsIndexing(url)) {
      this.seoService.updateRobots('index, follow');
    } 
    // else {
    //   this.seoService.updateRobots('noindex, nofollow');
    // }
  }

  // setDefaultMetaData() {
  //   const domain = environment.localUrl;
  //   const defaultImage = `${domain}/assets/worko-logo-ai.png`;
  //   const defaultTitle = 'Find Your Dream Job | Trusted Referrals | Expert Career Guidance | Interview Support | Verified Candidates | Top Profiles | worko.ai';
  //   const defaultDescription = 'Worko is your trusted platform for job referrals, career guidance, and interview support. Connect with employees from top companies, get vetted referrals, and maximize your chances of landing your dream job.';
  //   const defaultTags = 'job referrals, career guidance, interview support, job search, job opportunities, career advice, professional network, Worko.ai, referral bonuses, job placements';
  //   const defaultImageWidth = '1200';
  //   const defaultImageHeight = '630';

  //   this.titleService.setTitle(defaultTitle);
  //   this.metaService.addTags([
  //     { name: 'description', content: defaultDescription },
  //     { property: 'og:title', content: defaultTitle },
  //     { property: 'og:description', content: defaultDescription },
  //     { property: 'og:image', content: defaultImage },
  //     { property: 'og:type', content: 'website' },
  //     { property: 'og:image:width', content: defaultImageWidth },
  //     { property: 'og:image:height', content: defaultImageHeight },
  //     { property: 'og:url', content: domain },
  //     { name: 'keywords', content: defaultTags },
  //     { name: 'twitter:card', content: 'summary_large_image' },
  //     { name: 'twitter:title', content: defaultTitle },
  //     { name: 'twitter:description', content: defaultDescription },
  //     { name: 'twitter:image', content: defaultImage },
  //     { name: 'twitter:site', content: '@Worko_ai' },
  //     { name: 'twitter:creator', content: '@Worko_ai' }
  //   ]);
  // }

  // updateMetaDataOnNavigation() {
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd),
  //     map(() => this.activatedRoute),
  //     map(route => {
  //       while (route.firstChild) route = route.firstChild;
  //       return route;
  //     }),
  //     filter(route => route.outlet === 'primary'),
  //     mergeMap(route => route.data)
  //   ).subscribe((data:any) => {
  //     const domain = environment.localUrl;
  //     const defaultImage = `${domain}/assets/worko-logo-ai.png`;
  //     const defaultTitle = 'Find Your Dream Job | Trusted Referrals | Expert Career Guidance | Interview Support | Verified Candidates | Top Profiles | worko.ai';
  //     const defaultDescription = 'Worko.ai is your trusted platform for job referrals, career guidance, and interview support. Connect with employees from top companies, get vetted referrals, and maximize your chances of landing your dream job.';
  //     const defaultTags = 'job referrals, career guidance, interview support, job search, job opportunities, career advice, professional network, Worko.ai, referral bonuses, job placements';
  //     const defaultImageWidth = '1200';
  //     const defaultImageHeight = '630';

  //     const title = data.title || defaultTitle;
  //     const description = data.description || defaultDescription;
  //     const tags = data.tags || defaultTags;
  //     const image = defaultImage; // Always use the default image

  //     this.titleService.setTitle(title);
  //     this.metaService.updateTag({ name: 'description', content: description });
  //     this.metaService.updateTag({ property: 'og:title', content: title });
  //     this.metaService.updateTag({ property: 'og:description', content: description });
  //     this.metaService.updateTag({ property: 'og:image', content: image });
  //     this.metaService.updateTag({ property: 'og:type', content: 'website' });
  //     this.metaService.updateTag({ property: 'og:image:width', content: defaultImageWidth });
  //     this.metaService.updateTag({ property: 'og:image:height', content: defaultImageHeight });
  //     this.metaService.updateTag({ property: 'og:url', content: domain });
  //     this.metaService.updateTag({ name: 'keywords', content: tags });
  //     this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  //     this.metaService.updateTag({ name: 'twitter:title', content: title });
  //     this.metaService.updateTag({ name: 'twitter:description', content: description });
  //     this.metaService.updateTag({ name: 'twitter:image', content: image });
  //     this.metaService.updateTag({ name: 'twitter:site', content: '@Worko_ai' });
  //     this.metaService.updateTag({ name: 'twitter:creator', content: '@Worko_ai' });
  //   });
  // }
}
