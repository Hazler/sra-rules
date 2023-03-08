import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionComponent as SectionComponent } from './section.component';

describe('SubSectionComponent', () => {
  let component: SectionComponent;
  let fixture: ComponentFixture<SectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
