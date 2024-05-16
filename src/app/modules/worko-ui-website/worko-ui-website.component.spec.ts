import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoUiWebsiteComponent } from './worko-ui-website.component';

describe('WorkoUiWebsiteComponent', () => {
  let component: WorkoUiWebsiteComponent;
  let fixture: ComponentFixture<WorkoUiWebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoUiWebsiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoUiWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
