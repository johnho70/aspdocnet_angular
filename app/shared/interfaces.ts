import { ModuleWithProviders} from '@angular/core';

export interface IStudent{
    id?:string;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    gpa: number;
}

export interface IRouting {
    routes: ModuleWithProviders,
    components: any[]
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}

export interface IStudentResponse {
    status: boolean;
    student: IStudent;
}