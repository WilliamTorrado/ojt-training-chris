import { Component, OnInit } from '@angular/core';
import { TimeLogService, TimeLog } from '../services/time-log.service';
import { SharedDataService, StudentProfile } from '../services/shared-data.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { formatHoursMinutes } from '../utils/time-format.util';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  records: TimeLog[] = [];
  filteredRecords: TimeLog[] = [];
  profile: StudentProfile = {
    fullName: '',
    cpNumber: '',
    assignedOffice: '',
    jobDescription: '',
    province: '',
    townCity: '',
    barangay: '',
    profilePicture: ''
  };

  filterDate: string = '';
  filterTime: string = '';

  constructor(private timeLogService: TimeLogService, private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.records = this.timeLogService.getLogs();
    this.filteredRecords = [...this.records];
    this.profile = this.sharedDataService.getStudentProfile();
  }

  // =============================
  // FILTERING
  // =============================
  applyFilters(): void {
    this.filteredRecords = this.records.filter(log => {

      const matchDate =
        !this.filterDate || log.date.includes(this.filterDate);

      const matchTime =
        !this.filterTime ||
        log.timeIn.includes(this.filterTime) ||
        log.timeOut.includes(this.filterTime);

      return matchDate && matchTime;
    });
  }

  clearFilters(): void {
    this.filterDate = '';
    this.filterTime = '';
    this.filteredRecords = [...this.records];
  }

  // =============================
  // FORMAT HOURS
  // =============================
  formatHours(decimalHours: number): string {
    return formatHoursMinutes(decimalHours);
  }

  // =============================
  // EXPORT TO PDF
  // =============================
  exportToPDF() {
    const doc = new jsPDF();
    const name = this.profile.fullName || '-';
    const office = this.profile.assignedOffice || '-';
    const jobDescription = this.profile.jobDescription || '-';

    doc.setFontSize(14);
    doc.text('OJT Time Records', 14, 12);
    doc.setFontSize(10);
    doc.text(`Name: ${name}`, 14, 20);
    doc.text(`Assigned Office: ${office}`, 14, 26);
    doc.text(`Job Description: ${jobDescription}`, 14, 32);

    const tableData = this.filteredRecords.map(log => [
      name,
      office,
      jobDescription,
      log.date,
      log.timeIn,
      log.timeOut,
      this.formatHours(log.hours)
    ]);

    (doc as any).autoTable({
      startY: 38,
      head: [['Name', 'Office', 'Job Description', 'Date', 'Time In', 'Time Out', 'Hours Worked']],
      body: tableData
    });

    doc.save('OJT_Time_Records.pdf');
  }
}
