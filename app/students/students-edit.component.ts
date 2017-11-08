import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../core/data.service';
import { IStudent } from '../shared/interfaces';
import { NgModel, NgForm } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'student',
    templateUrl:`./students-edit.component.html`
})

export class StudentEditComponent implements OnInit{
    
    title: string;
    id: number;
    student: IStudent = {
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        gpa:0
    };
    errorMessage: string;
    operationText: string = 'Insert';
    deleteMessageEnabled: boolean;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private dataService: DataService) { }

    ngOnInit() {
        this.title = "Edit Students Record";
        let id = this.route.snapshot.params['id'];
        this.GetStudentById(id);
    }

    GetStudentById(id: number) {
        
        this.dataService.getStudentById(id)
            .subscribe((studentResp: IStudent) => {
                this.student = studentResp;
                this.operationText = "Update";
            },
             (error:any) => console.log(error))
    }

    submit() {
        if (this.student.id) {

            this.dataService.updateStudent(this.student)
                .subscribe((student: IStudent) => {
                    if (student) {
                        this.router.navigate(['/student']);
                    } else {
                        this.errorMessage = 'Unable to save student';
                    }
                },
                (err: any) => console.log(err));
        }
        else {
            this.dataService.insertStudent(this.student)
                .subscribe((student: IStudent) => {
                    if (student) {
                        this.router.navigate(['/student']);
                    }
                    else {
                        this.errorMessage = 'Unable to add student';
                    }
                },
                (err: any) => console.log(err));
        }
    }

    cancel(event: Event) {
        event.preventDefault();
        this.router.navigate(['/']);
    }

    delete(event: Event) {
        event.preventDefault();
        this.dataService.deleteStudent(this.student.id)
            .subscribe((status: boolean) =>{
                if (status) {
                    this.router.navigate(['/student']);
                } else {
                    this.errorMessage = 'Unable to delete student';
                }
            },
            (err) => console.log(err));
    }
}