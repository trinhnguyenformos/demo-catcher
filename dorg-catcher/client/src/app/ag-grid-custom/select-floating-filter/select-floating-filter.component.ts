import {Component} from "@angular/core";

import {IFloatingFilter, IFloatingFilterParams, TextFilter, TextFilterModel} from "ag-grid-community";
import {AgFrameworkComponent} from "ag-grid-angular";

export interface SelectFloatingFilterParams extends IFloatingFilterParams {
    value: any
    optionValues: any[]
}

@Component({
    templateUrl: './select-floating-filter.component.html',
    styleUrls: ['./select-floating-filter.component.css']
})
export class SelectFloatingFilter implements IFloatingFilter, AgFrameworkComponent<SelectFloatingFilterParams> {

    private params: SelectFloatingFilterParams;

    optionValues: any[];
    currentValue: any;

    agInit(params: SelectFloatingFilterParams): void {
        this.params = params;
        this.optionValues = this.params.optionValues;
        this.currentValue = '';
    }

    valueChanged() {
        let valueToUse = (this.currentValue === '') ? null : this.currentValue;
            this.params.parentFilterInstance( function(instance) {
                (<TextFilter>instance).onFloatingFilterChanged('equals', valueToUse);
            });
    }

    onParentModelChanged(parentModel: TextFilterModel): void {
        if (!parentModel) {
            this.currentValue = '';
        } else {
            this.currentValue = parentModel.filter
        }
    }
}