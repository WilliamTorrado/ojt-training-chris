import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsMgmtComponent } from './skills-mgmt.component';

describe('SkillsMgmtComponent', () => {
  let component: SkillsMgmtComponent;
  let fixture: ComponentFixture<SkillsMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
