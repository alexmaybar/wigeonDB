import { NgClass } from '@angular/common';
import { CssSelector } from '@angular/compiler';
import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/clients.service';

@Component({
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {
  constructor(private router: Router, private cs: ClientService) {}

  data: any = null;

  classMods: any = null;
  courseIDs: any = null;
  instructorIDs: any = null;
  instructorNames: any = null;

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

  ngOnInit(): void {
    this.refreshInstructor();
  }

  currentType = 'instructor';

  indicator = '';
  response: any = null;

  refreshInstructor() {
    this.cs.runQuery('SELECT * FROM Instructor').subscribe((res) => {
      this.data = res;
    });
  }

  refreshCourse() {
    this.cs.runQuery('SELECT * FROM Course').subscribe((res) => {
      this.data = res;
    });
  }

  refreshSection() {
    this.cs
      .runQuery('SELECT * FROM Section NATURAL JOIN Course')
      .subscribe((res) => {
        this.data = res;
      });
  }

  refreshNonInstruct() {
    this.cs.runQuery('SELECT * FROM Non_Instruct').subscribe((res) => {
      console.log(res);
      this.data = res;
    });
  }

  getInstructor() {
    return JSON.stringify(this.instructor);
  }
  resetInstructor() {
    this.instructor = {
      fName: '',
      lName: '',
      email: '',
      desiredLoad: '',
    };
  }
  getCourse() {
    return JSON.stringify(this.course);
  }
  resetCourse() {
    this.course = {
      title: '',
      id: '',
      department: '',
      numCredits: '',
    };
  }
  getCourseSection() {
    return JSON.stringify(this.courseSection);
  }
  resetCourseSection() {
    this.courseSection = {
      id: '',
      sectionNum: '',
      classMod: '',
      semester: '',
      year: '',
    };
  }
  getNonInstruct() {
    return JSON.stringify(this.nonInstruct);
  }
  resetNonInstruct() {
    this.nonInstruct = {
      task: '',
      instructorId: '',
      nonInstructTeu: '',
      semester: '',
      year: '',
    };
  }

  getClassMods() {
    this.cs.runQuery('SELECT class_mod FROM Timeslot').subscribe((res: any) => {
      let mods = [];
      for (let i of res) {
        mods.push(Object.values(i)[0]);
      }
      this.classMods = mods;
    });
  }

  getCourseIds() {
    this.cs.runQuery('SELECT course_id FROM Course').subscribe((res: any) => {
      let course_ids = [];
      for (let i of res) {
        course_ids.push(Object.values(i)[0]);
      }
      this.courseIDs = course_ids;
      this.courseIDs.sort();
    });
  }

  getInstructorIds() {
    this.cs
      .runQuery('SELECT instructor_id, first_name, last_name FROM Instructor')
      .subscribe((res: any) => {
        let instructor_ids = [];
        let instructor_names = [];
        for (let i of res) {
          instructor_ids.push(Object.values(i)[0]);
          instructor_names.push(
            Object.values(i)[1] + ',' + Object.values(i)[2]
          );
        }
        this.instructorIDs = instructor_ids;
        this.instructorNames = instructor_names;
      });
  }

  change() {
    if (this.currentType == 'instructor') {
      this.refreshInstructor();
    } else if (this.currentType == 'course') {
      this.refreshCourse();
    } else if (this.currentType == 'courseSection') {
      this.refreshSection();
      this.getClassMods();
      this.getCourseIds();
    } else if (this.currentType == 'nonInstruct') {
      this.refreshNonInstruct();
      this.getInstructorIds();
    }
  }

  add() {
    this.indicator = 'waiting...';
    if (this.currentType == 'instructor') {
      this.cs.addInstructor(this.instructor).subscribe((res: any) => {
        this.indicator = res.response;
        if (this.indicator == 'Success') {
          this.resetInstructor();
        }
        this.refreshInstructor();
      });
    } else if (this.currentType == 'course') {
      this.cs.addCourse(this.course).subscribe((res: any) => {
        this.indicator = res.response;
        if (this.indicator == 'Success') {
          this.resetCourse();
        }
        this.refreshCourse();
      });
    } else if (this.currentType == 'courseSection') {
      this.cs.addSection(this.courseSection).subscribe((res: any) => {
        this.indicator = res.response;
        if (this.indicator == 'Success') {
          this.resetCourseSection();
        }
        this.refreshSection();
      });
    } else if (this.currentType == 'nonInstruct') {
      this.cs.addNonInstruct(this.nonInstruct).subscribe((res: any) => {
        this.indicator = res.response;
        if (this.indicator == 'Success') {
          this.resetNonInstruct();
        }
        this.refreshNonInstruct();
      });
    }
  }

  deleteRecord(index: number) {
    console.log('delete');
    this.indicator = 'delete waiting...';
    if (this.currentType == 'instructor') {
      this.cs
        .deleteRecord('Instructor', String(this.data[index]['instructor_id']))
        .subscribe((res: any) => {
          this.indicator = res.response;
          this.refreshInstructor();
        });
    } else if (this.currentType == 'course') {
      this.cs
        .deleteRecord('Course', String(this.data[index]['course_id']))
        .subscribe((res: any) => {
          this.indicator = res.response;
          this.refreshCourse();
        });
    } else if (this.currentType == 'courseSection') {
      this.cs
        .deleteRecord('Section', String(this.data[index]['section_id']))
        .subscribe((res: any) => {
          this.indicator = res.response;
          this.refreshSection();
        });
    } else if (this.currentType == 'nonInstruct') {
    }
  }

  sort(prop: any) {
    this.data.sort((a: any, b: any) => (a[prop] > b[prop] ? 1 : -1));
  }
}
