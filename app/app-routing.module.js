"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var students_component_1 = require("./students/students.component");
var students_edit_component_1 = require("./students/students-edit.component");
var students_grid_component_1 = require("./students/students-grid.component");
var app_routes = [
    { path: '', pathMatch: 'full', redirectTo: '/student' },
    { path: 'student', component: students_component_1.StudentsComponent },
    { path: 'student/:id', component: students_edit_component_1.StudentEditComponent },
    { path: '**', pathMatch: 'full', redirectTo: '/student' } //catch any unfound routes and redirect to home page
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule.components = [students_component_1.StudentsComponent, students_edit_component_1.StudentEditComponent, students_grid_component_1.StudentsGridComponent];
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(app_routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map