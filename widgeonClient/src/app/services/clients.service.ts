import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ClientService {
  constructor(private http: HttpClient) {}

  runQuery(myQuery: any) {
    const res = this.http.get('http://localhost:3000/api/query', {
      headers: new HttpHeaders({ query: myQuery }),
    });
    return res;
  }

  addInstructor(myInstructor: any) {
    const res = this.http.get('http://localhost:3000/api/addInstructor', {
      headers: new HttpHeaders({
        first_name: myInstructor.fName,
        last_name: myInstructor.lName,
        email: myInstructor.email,
        desired_load: myInstructor.desiredLoad,
      }),
    });
    return res;
  }

  addCourse(myCourse: any) {
    const res = this.http.get('http://localhost:3000/api/addCourse', {
      headers: new HttpHeaders({
        course_title: myCourse.title,
        course_id: myCourse.id,
        department: myCourse.department,
        num_credits: myCourse.numCredits,
      }),
    });
    return res;
  }

  addSection(mySection: any) {
    const res = this.http.get('http://localhost:3000/api/addSection', {
      headers: new HttpHeaders({
        semester: mySection.semester,
        section_num: mySection.sectionNum,
        year: mySection.year,
        course_id: mySection.id,
        mod: mySection.classMod,
      }),
    });
    return res;
  }

  addNonInstruct(myNonInstruct: any) {
    const res = this.http.get('http://localhost:3000/api/addNonInstruct', {
      headers: new HttpHeaders({
        instructor_id: myNonInstruct.instructorId,
        task: myNonInstruct.task,
        teu: myNonInstruct.nonInstructTeu,
        semester: myNonInstruct.semester,
        year: myNonInstruct.year,
      }),
    });
    return res;
  }

  bronzeAge() {
    const res = this.http.get('http://localhost:3000/api/bronzeAge');
    return res;
  }

  phase1() {
    const res = this.http.get('http://localhost:3000/api/phase1');
    return res;
  }

  phase2() {
    const res = this.http.get('http://localhost:3000/api/phase2');
    return res;
  }

  phase3() {
    const res = this.http.get('http://localhost:3000/api/phase3');
    return res;
  }

  phase4() {
    const res = this.http.get('http://localhost:3000/api/phase4');
    return res;
  }

  phase5() {
    const res = this.http.get('http://localhost:3000/api/phase5');
    return res;
  }

  stoneAge() {
    const res = this.http.get('http://localhost:3000/api/stoneAge');
    return res;
  }

  deleteRecord(table: any, key: any) {
    const res = this.http.get('http://localhost:3000/api/deleteRecord', {
      headers: new HttpHeaders({
        table: table,
        key: key,
      }),
    });
    return res;
  }
}
