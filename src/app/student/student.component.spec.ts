import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { StudentComponent } from './student.component';
import { SharedDataService } from '../services/shared-data.service';
import { TimeLogService } from '../services/time-log.service';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let timeLogServiceSpy: jasmine.SpyObj<TimeLogService>;

  beforeEach(async(() => {
    timeLogServiceSpy = jasmine.createSpyObj('TimeLogService', ['getLogs']);
    timeLogServiceSpy.getLogs.and.returnValue([
      { date: '2026-02-15', timeIn: '10:00:26 PM', timeOut: '7:40:59 AM', hours: 9.683333333333334 }
    ]);

    TestBed.configureTestingModule({
      declarations: [StudentComponent],
      imports: [FormsModule],
      providers: [
        { provide: TimeLogService, useValue: timeLogServiceSpy },
        {
          provide: SharedDataService,
          useValue: {
            getStudentProfile: () => ({
              fullName: 'Claire',
              cpNumber: '',
              assignedOffice: 'CDT',
              jobDescription: 'Web Dev',
              province: '',
              townCity: '',
              barangay: '',
              profilePicture: ''
            })
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format decimal hours using round up minutes', () => {
    expect(component.formatHours(9.683333333333334)).toBe('9h 41m');
  });

  it('should display hours worked in Xh Ym format in table', () => {
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('9h 41m');
  });
});
