"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var data_service_1 = require("../core/data.service");
var StudentsComponent = (function () {
    function StudentsComponent(router, dataservice) {
        this.router = router;
        this.dataservice = dataservice;
        this.students = [];
        this.filteredStudents = [];
        this.totalRecords = 0;
        this.pageSize = 10;
    }
    StudentsComponent.prototype.ngOnInit = function () {
        this.title = "Students Record";
        //this.getStudents();
        this.getStudentsPage(1);
    };
    StudentsComponent.prototype.filterChanged = function (filterText) {
        if (filterText && this.students) {
            var props = ['firstName', 'lastName'];
            //this.filteredStudents = this.dataFilter.filter(this.students, props, filterText);
        }
        else {
            this.filteredStudents = this.students;
        }
    };
    StudentsComponent.prototype.getStudents = function () {
        var _this = this;
        this.dataservice.getStudents()
            .subscribe(function (students) {
            _this.students = students;
        }, function (err) { return console.log(err); });
    };
    StudentsComponent.prototype.pageChanged = function (page) {
        this.getStudentsPage(page);
    };
    StudentsComponent.prototype.getStudentsPage = function (page) {
        var _this = this;
        this.dataservice.getStudentsPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe(function (response) {
            _this.students = _this.filteredStudents = response.results;
            _this.totalRecords = response.totalRecords;
        }, function (err) { return console.log(err); }, function () { return console.log('getstudentsPage() retrieved students'); });
    };
    return StudentsComponent;
}());
StudentsComponent = __decorate([
    core_1.Component({
        selector: 'students',
        templateUrl: "./students.component.html"
    }),
    __metadata("design:paramtypes", [router_1.Router,
        data_service_1.DataService])
], StudentsComponent);
exports.StudentsComponent = StudentsComponent;
//# sourceMappingURL=students.component.js.map