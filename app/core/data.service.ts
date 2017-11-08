import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IStudent, IPagedResults } from '../shared/interfaces';

@Injectable()
export class DataService {

    baseStudentsUrl: string = '/api/student';

    constructor(private http: Http) { }

    getMessage() : Observable<string> {
        return this.http.get('/api/messages')
            .map((res: Response) => res.json().data)
            .catch(this.handleError);
    }

    getStudents(): Observable<IStudent[]> {
        return this.http.get(this.baseStudentsUrl)
            .map((res: Response) => {
                let students = res.json();
                return students;
            })
            .catch(this.handleError);
    }
    getStudentsPage(page: number, pageSize: number): Observable<IPagedResults<IStudent[]>> {
        return this.http.get(`${this.baseStudentsUrl}/page/${page}/${pageSize}`)
            .map((res: Response) => {
                const totalRecords = +res.headers.get('x-inlinecount');
                let students = res.json();
                return {
                    results: students,
                    totalRecords: totalRecords
                };
            })
            .catch(this.handleError);
    }

    getStudentById(id: number): Observable<IStudent> {
        return this.http.get(this.baseStudentsUrl+'/'+id)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    updateStudent(student: IStudent): Observable<IStudent> {
        return this.http.put(this.baseStudentsUrl + '/' + student.id, student)
            .map((res: Response) => {
                const data = res.json();
                console.log('updateStudent status:' + data.status);
                return data.student;
            })
            .catch(this.handleError);
    }

    insertStudent(student: IStudent): Observable<IStudent> {
        return this.http.post(this.baseStudentsUrl, student)
            .map((res: Response) => {
                const data = res.json();
                console.log('insertStudent status: ' + data.status);
                return data.student;
            })
            .catch(this.handleError);
    }

    deleteStudent(id: string): Observable<boolean> {
        return this.http.delete(this.baseStudentsUrl + '/' + id)
            .map((res: Response) => {
                const data = res.json().status;
                console.log('deleteStudent status: ' + data.status);
            })
            .catch(this.handleError);
    }
    handleError(error: any) {
        console.error('server error:', error);
        if (error instanceof Response) {
            let errMessage = '';
            try {
                errMessage = error.json().error;
            } catch (err) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Node.js server error');
    }
}