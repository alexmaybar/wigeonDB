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
}
