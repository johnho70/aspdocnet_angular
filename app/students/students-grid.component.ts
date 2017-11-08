import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { IStudent } from '../shared/interfaces';
import { Sorter } from '../core/sorter';
import { TrackByService } from '../core/trackby.service';

@Component({
    moduleId: module.id,
    selector: 'students-grid',
    templateUrl: `./students-grid.component.html`,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class StudentsGridComponent implements OnInit {
    @Input() students: IStudent[] = [];

    //constructor(private sorter: Sorter, public trackby: TrackByService) { }

    ngOnInit() {
    }

    //sort(prop: string) {
    //    this.sorter.sort(this.students, prop);
    //}
}