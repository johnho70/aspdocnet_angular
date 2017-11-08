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
var StudentsGridComponent = (function () {
    function StudentsGridComponent() {
        this.students = [];
        //sort(prop: string) {
        //    this.sorter.sort(this.students, prop);
        //}
    }
    //constructor(private sorter: Sorter, public trackby: TrackByService) { }
    StudentsGridComponent.prototype.ngOnInit = function () {
    };
    return StudentsGridComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], StudentsGridComponent.prototype, "students", void 0);
StudentsGridComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'students-grid',
        templateUrl: "./students-grid.component.html",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], StudentsGridComponent);
exports.StudentsGridComponent = StudentsGridComponent;
//# sourceMappingURL=students-grid.component.js.map