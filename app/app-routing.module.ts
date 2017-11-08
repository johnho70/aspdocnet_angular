import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentsComponent } from './students/students.component';
import { StudentEditComponent } from './students/students-edit.component';
import { StudentsGridComponent } from './students/students-grid.component';

const app_routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/student' },
    { path: 'student', component: StudentsComponent },
    { path: 'student/:id', component: StudentEditComponent }, 
    { path: '**', pathMatch: 'full', redirectTo: '/student' }//catch any unfound routes and redirect to home page
];

@NgModule({
    imports: [RouterModule.forRoot(app_routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
    static components = [StudentsComponent, StudentEditComponent, StudentsGridComponent ];
}