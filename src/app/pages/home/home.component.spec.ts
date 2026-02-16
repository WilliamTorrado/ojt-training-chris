import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { TimeLogService } from '../../services/time-log.service';
import { SharedDataService } from '../../services/shared-data.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let timeLogServiceSpy: jasmine.SpyObj<TimeLogService>;

  beforeEach(async(() => {
    timeLogServiceSpy = jasmine.createSpyObj('TimeLogService', [
      'getLogs',
      'getTimeIn',
      'setTimeIn',
      'addLog',
      'clearTimeIn'
    ]);
    timeLogServiceSpy.getLogs.and.returnValue([
      { date: '2026-02-15', timeIn: '10:00:26 PM', timeOut: '7:40:59 AM', hours: 9.683333333333334 }
    ]);
    timeLogServiceSpy.getTimeIn.and.returnValue(null);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [FormsModule],
      providers: [
        { provide: TimeLogService, useValue: timeLogServiceSpy },
        { provide: SharedDataService, useValue: { internName$: of('WELCOME INTERN') } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format decimal hours using round up minutes', () => {
    expect(component.formatHours(9.683333333333334)).toBe('9h 41m');
  });

  it('should display latest hours worked in Xh Ym format', () => {
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Hours Worked:');
    expect(text).toContain('9h 41m');
  });
});
