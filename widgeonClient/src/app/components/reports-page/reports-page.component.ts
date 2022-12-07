import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/clients.service';

@Component({
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent implements OnInit {

  constructor(private cs: ClientService) { }
  reportCourseOfferingTime: any = null;
  reportCourseWithNoTime: any = null;
  reportInstructorTimes: any = null;
  reportCourseInstructorPair: any = null;
  reportCourseWithNoInstructor: any = null;
  data: any = null;


  ngOnInit(): void {
    this.getCourseOfferingTime();
    this.getCourseWithNoTime();
    this.getInstructorTimes();
    this.getCourseInstructorPair();
    this.getCourseWithNoInstructor();
  }

  getCourseOfferingTime() {
    this.cs.runQuery('select course_id, section_num, semester, year, start_time, end_time from Section natural join Timeslot;')
    .subscribe((res) => {
      console.log(res);
      this.reportCourseOfferingTime = res;
    });
  }

  getCourseWithNoTime() {
    this.cs.runQuery('select * from Section where class_mod is NULL;')
    .subscribe((res) => {
      console.log(res);
      this.reportCourseWithNoTime = res;
    });
  }

  getInstructorTimes() {
    this.cs.runQuery('with instructorTeaches(instructor_id, first_name, last_name, section_id) as (select instructor_id, first_name, last_name, section_id from Teaches natural join Instructor) select instructor_id, first_name, last_name, start_time, end_time from instructorTeaches natural join Section natural join Timeslot;')
    .subscribe((res) => {
      console.log(res);
      this.reportInstructorTimes = res;
    });
  }

  getCourseInstructorPair() {
    this.cs.runQuery('SELECT first_name, last_name, instructor_id, course_id, section_num, semester, year FROM Instructor NATURAL JOIN Section NATURAL JOIN Teaches;')
    .subscribe((res) => {
      console.log(res);
      this.reportCourseInstructorPair = res;
    });
  }

  getCourseWithNoInstructor() {
    this.cs.runQuery('select course_id, section_num, semester, year from Section left outer join Teaches using(section_id) where instructor_id is NULL;')
    .subscribe((res) => {
      console.log(res);
      this.reportCourseWithNoInstructor = res;
    });
  }


}
