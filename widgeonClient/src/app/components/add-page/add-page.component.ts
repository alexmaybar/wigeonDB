import { CssSelector } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/clients.service';

@Component({
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {
  constructor(private router: Router, private cs: ClientService) {}

  instructor = {
    fName: 'Jon',
    lName: 'Doe',
    email: 'jonDoe@bethel.edu',
    desiredLoad: '7',
  };

  course = {
    title: 'Basket Weaving',
    id: '1101',
    department: 'Art',
    numCredits: '3',
  };

  courseSection = {
    id: '',
    sectionNum: '',
    classMod: '',
    semester: '',
    year: '',
  };

  nonInstruct = {
    task: '',
    instructorId: '',
    nonInstructTeu: '',
    semester: '',
    year: '',
  };

  ngOnInit(): void {}

  currentType = 'instructor';

  indicator = '';
  response: any = null;

  getInstructor() {
    return JSON.stringify(this.instructor);
  }
  getCourse() {
    return JSON.stringify(this.course);
  }
  getCourseSection() {
    return JSON.stringify(this.courseSection);
  }
  getNonInstruct() {
    return JSON.stringify(this.nonInstruct);
  }
  getResponse() {
    return this.response;
  }

  add() {
    this.indicator = 'waiting...';
    if (this.currentType == 'instructor') {
      this.cs.addInstructor(this.instructor).subscribe((res) => {
        this.response = res;
        console.log(res);
      });
    } else if (this.currentType == 'course') {
      this.cs.addCourse(this.course).subscribe((res) => {
        this.response = res;
        console.log(res);
      });
    } else if (this.currentType == 'courseSection') {
      this.cs.addSection(this.courseSection).subscribe((res) => {
        this.response = res;
        console.log(res);
      });
    } else if (this.currentType == 'nonInstruct') {
      this.cs.addNonInstruct(this.nonInstruct).subscribe((res) => {
        this.response = res;
        console.log(res);
      });
    }
    this.indicator = 'Done!';
  }
}
