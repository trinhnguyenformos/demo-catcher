import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'action-cell',
    template: `
        <fa-icon icon="users-cog" *ngIf="showCofigBtn" (click)="config()"></fa-icon>
        <fa-icon icon="edit" *ngIf="showEditBtn" (click)="edit()"></fa-icon>
        <fa-icon icon="history" *ngIf="showHistoryBtn" (click)="history()"></fa-icon>
    `,
    styles: [
        `fa-icon {
            padding: 10px;
            cursor: pointer;
            color: #1b5eac;
        }`
    ]
})
export class ActionRenderer implements ICellRendererAngularComp {
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    public invokeParentMethod() {
        this.params.context.componentParent.methodFromParent(`Row: ${this.params.data.companyName}`);
    }

    config() {
        alert('Config on company ' + this.params.data.companyName);
    }

    edit() {
        alert('Edit on company ' + this.params.data.companyName);
    }

    history() {
        alert('History on company ' + this.params.data.companyName);
    }

    showCofigBtn(): boolean {
        return true;
    }

    showEditBtn(): boolean {
        return true;
    }

    showHistoryBtn(): boolean {
        return true;
    }

    refresh(): boolean {
        return false;
    }
}