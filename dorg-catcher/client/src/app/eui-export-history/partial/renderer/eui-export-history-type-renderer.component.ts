import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'eui-export-history-type-cell',
    template: `
        <span class="badge" [ngClass]="getClassBadge(params.data.type)">{{params.data.type}}</span>
    `,
    styles: [
        `fa-icon {
            padding: 10px;
            cursor: pointer;
            color: #1b5eac;
        }`
    ]
})
export class EuiExportHistoryTypeRenderer implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public invokeParentMethod() {
        this.params.context.componentParent.methodFromParent(`Row: ${this.params.data.companyName}`);
    }

    getClassBadge(type: string) {
        switch (type) {
            case 'A': {
                return 'badge-danger';
             }
            case 'I': {
               return 'badge-warning';
            }
            case 'N': {
                return 'badge-success';
             }
            default: {
                return 'badge-primary';
            }
         }
    }

    refresh(): boolean {
        return false;
    }
}