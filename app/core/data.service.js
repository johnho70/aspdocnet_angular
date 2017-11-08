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
var http_1 = require("@angular/http");
//Grab everything with import 'rxjs/Rx';
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.baseStudentsUrl = '/api/student';
    }
    DataService.prototype.getMessage = function () {
        return this.http.get('/api/messages')
            .map(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    DataService.prototype.getStudents = function () {
        return this.http.get(this.baseStudentsUrl)
            .map(function (res) {
            var students = res.json();
            return students;
        })
            .catch(this.handleError);
    };
    DataService.prototype.getStudentsPage = function (page, pageSize) {
        return this.http.get(this.baseStudentsUrl + "/page/" + page + "/" + pageSize)
            .map(function (res) {
            var totalRecords = +res.headers.get('x-inlinecount');
            var students = res.json();
            return {
                results: students,
                totalRecords: totalRecords
            };
        })
            .catch(this.handleError);
    };
    DataService.prototype.getStudentById = function (id) {
        return this.http.get(this.baseStudentsUrl + '/' + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.updateStudent = function (student) {
        return this.http.put(this.baseStudentsUrl + '/' + student.id, student)
            .map(function (res) {
            var data = res.json();
            console.log('updateStudent status:' + data.status);
            return data.student;
        })
            .catch(this.handleError);
    };
    DataService.prototype.insertStudent = function (student) {
        return this.http.post(this.baseStudentsUrl, student)
            .map(function (res) {
            var data = res.json();
            console.log('insertStudent status: ' + data.status);
            return data.student;
        })
            .catch(this.handleError);
    };
    DataService.prototype.deleteStudent = function (id) {
        return this.http.delete(this.baseStudentsUrl + '/' + id)
            .map(function (res) {
            var data = res.json().status;
            console.log('deleteStudent status: ' + data.status);
        })
            .catch(this.handleError);
    };
    DataService.prototype.handleError = function (error) {
        console.error('server error:', error);
        if (error instanceof http_1.Response) {
            var errMessage = '';
            try {
                errMessage = error.json().error;
            }
            catch (err) {
                errMessage = error.statusText;
            }
            return Observable_1.Observable.throw(errMessage);
        }
        return Observable_1.Observable.throw(error || 'Node.js server error');
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map