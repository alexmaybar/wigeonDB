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
  curProp: any = null;

  classMods: any = null;
  courseIDs: any = null;
  instructorIDs: any = null;
  instructorNames: any = null;

  dialog: any = null;
  toEdit: any = null;
  newData: any = null;

  status: any = null;
  teachesID: any = 1;

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
    this.dialog = document.getElementById('dialog');
  }

  currentType = 'instructor';

  indicator: string = '';
  formatErrors: any = [];
  response: any = null;

  refreshInstructor() {
    this.cs.runQuery('SELECT * FROM Instructor').subscribe((res) => {
      this.data = res;
      if (this.curProp != null) {
        this.sort(this.curProp);
      }
    });
  }

  refreshCourse() {
    this.cs.runQuery('SELECT * FROM Course').subscribe((res) => {
      this.data = res;
      if (this.curProp != null) {
        this.sort(this.curProp);
      }
    });
  }

  refreshSection() {
    this.cs
      .runQuery(
        'SELECT * FROM Section NATURAL JOIN Course NATURAL LEFT OUTER JOIN Teaches'
      )
      .subscribe((res) => {
        this.data = res;
        if (this.curProp != null) {
          this.sort(this.curProp);
        }
      });
  }

  refreshNonInstruct() {
    this.cs.runQuery('SELECT * FROM Non_Instruct').subscribe((res) => {
      //console.log(res);
      this.data = res;
      if (this.curProp != null) {
        this.sort(this.curProp);
      }
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
      this.getInstructorIds();
    } else if (this.currentType == 'nonInstruct') {
      this.refreshNonInstruct();
      this.getInstructorIds();
    }
  }

  add() {
    this.indicator = 'waiting...';
    if (this.currentType == 'instructor') {
      let valid = this.validateInstructor(this.instructor);
      if (valid.length != 0) {
        this.indicator = '';
        this.formatErrors = valid;
      } else {
        this.cs.addInstructor(this.instructor).subscribe((res: any) => {
          this.indicator = res.response;
          if (this.indicator == 'Success') {
            this.resetInstructor();
          }
          this.refreshInstructor();
        });
      }
    } else if (this.currentType == 'course') {
      let valid = this.validateCourse(this.course);
      if (valid.length != 0) {
        this.indicator = '';
        this.formatErrors = valid;
      } else {
        this.cs.addCourse(this.course).subscribe((res: any) => {
          this.indicator = res.response;
          if (this.indicator == 'Success') {
            this.resetCourse();
          }
          this.refreshCourse();
        });
      }
    } else if (this.currentType == 'courseSection') {
      let valid = this.validateCourseSection(this.courseSection);
      if (valid.length != 0) {
        this.indicator = '';
        this.formatErrors = valid;
      } else {
        this.cs.addSection(this.courseSection).subscribe((res: any) => {
          this.indicator = res.response;
          if (this.indicator == 'Success') {
            this.resetCourseSection();
          }
          this.refreshSection();
        });
      }
    } else if (this.currentType == 'nonInstruct') {
      let valid = this.validateNonInstruct(this.nonInstruct);
      if (valid.length != 0) {
        this.indicator = '';
        this.formatErrors = valid;
      } else {
        this.cs.addNonInstruct(this.nonInstruct).subscribe((res: any) => {
          this.indicator = res.response;
          if (this.indicator == 'Success') {
            this.resetNonInstruct();
          }
          this.refreshNonInstruct();
        });
      }
    }
  }

  deleteRecord(index: number) {
    //console.log('delete');
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
      this.cs
        .deleteRecord(
          'Non_Instruct',
          String(this.data[index]['non_instruct_id'])
        )
        .subscribe((res: any) => {
          this.indicator = res.response;
          this.refreshNonInstruct();
        });
    }
  }

  editRecord(index: number) {
    this.toEdit = this.data[index];
    this.newData = {
      ...this.toEdit,
    };
    if (this.currentType == 'instructor') {
      this.newData.desired_load = Math.floor(this.newData.desired_load / 3.4);
    }
    this.status = '';
    this.dialog.showModal();
  }

  closeDialog() {
    this.dialog.close();
  }

  sort(prop: any) {
    this.curProp = prop;
    this.data.sort((a: any, b: any) => (a[prop] > b[prop] ? 1 : -1));
  }

  unassignInstructor() {
    let s: string = String(this.toEdit.section_id);
    let o: string = String(this.toEdit.instructor_id);
    this.cs.addTeaches(s, o, 'delete').subscribe((res: any) => {
      this.status = res.response;
      this.refreshSection();
      this.newData.instructor_id = '';
      this.toEdit = {
        ...this.newData,
      };
    });
  }

  assignInstructor() {
    let s: string = String(this.toEdit.section_id);
    let o: string = String(this.toEdit.instructor_id);
    let n: string = String(this.newData.instructor_id);
    this.cs.addTeaches(s, o, n).subscribe((res: any) => {
      this.status = res.response;
      this.refreshSection();
      this.toEdit = {
        ...this.newData,
      };
    });
  }

  update(table: any) {
    if (table == 'Instructor') {
      this.cs
        .updateTable('Instructor', JSON.stringify(this.newData))
        .subscribe((res: any) => {
          this.status = res.response;
          this.refreshInstructor();
        });
    } else if (table == 'Course') {
      this.cs
        .updateTable('Course', JSON.stringify(this.newData))
        .subscribe((res: any) => {
          this.status = res.response;
          this.refreshCourse();
        });
    } else if (table == 'Section') {
      this.cs
        .updateTable('Section', JSON.stringify(this.newData))
        .subscribe((res: any) => {
          this.status = res.response;
          this.refreshSection();
        });
    } else if (table == 'Non_Instruct') {
      this.cs
        .updateTable('Non_Instruct', JSON.stringify(this.newData))
        .subscribe((res: any) => {
          this.status = res.response;
          this.refreshNonInstruct();
        });
    }

    this.toEdit = {
      ...this.newData,
    };
    if (this.currentType == 'instructor') {
      this.toEdit.desired_load = this.newData.desired_load * 3.4;
    }
  }

  validateInstructor(instructor: any) {
    let emailRegEx: RegExp = /^[A-Za-z0-9+_.-]+@(.+)$/;
    let res = [];
    if (!instructor.fName) {
      res.push('First Name must not be empty');
    }
    if (!instructor.lName) {
      res.push('Last Name must not be empty');
    }
    if (!emailRegEx.test(instructor.email)) {
      res.push('Invalid Email');
    }
    if (instructor.desiredLoad < 1 || instructor.desiredLoad > 10) {
      res.push('Desired Load out of bounds (1-10)');
    }
    return res;
  }

  validateCourse(course: any) {
    let courseIdRegEx: RegExp = /^[0-9][0-9][0-9][0-9]$/;
    let res = [];
    if (!course.title) {
      res.push('Course title must not be empty');
    }
    if (!course.department) {
      res.push('Department must not be empty');
    }
    if (!courseIdRegEx.test(course.id)) {
      res.push('Course ID must be a 4 digit code');
    }
    if (course.numCredits < 1 || course.numCredits > 4) {
      res.push('Credit Number out of bounds (1-4)');
    }
    return res;
  }

  validateCourseSection(section: any) {
    let yearRegEx: RegExp = /^[0-9][0-9][0-9][0-9]$/;
    let res = [];
    if (section.sectionNum < 1) {
      res.push('Section Number must be greater than 0');
    }
    if (!section.id) {
      res.push('Course ID Required');
    }
    if (!section.semester) {
      res.push('Semester Required');
    }
    if (!section.year) {
      res.push('Year Required');
    }
    if (!yearRegEx.test(section.year)) {
      res.push('Year must be a 4 digit number');
    }
    return res;
  }

  validateNonInstruct(nonInstruct: any) {
    let yearRegEx: RegExp = /^[0-9][0-9][0-9][0-9]$/;
    let res = [];
    if (!nonInstruct.task) {
      res.push('Task Description Required');
    }
    if (!nonInstruct.semester) {
      res.push('Semester Required');
    }
    if (!nonInstruct.year) {
      res.push('Year Required');
    }
    if (!yearRegEx.test(nonInstruct.year)) {
      res.push('Year must be a 4 digit number');
    }
    return res;
  }

  isString(val: any): boolean {
    return typeof val === 'string';
  }
}
