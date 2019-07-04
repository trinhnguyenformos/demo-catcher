import { ExportDetailsTabComponent } from './partial/eui-export-history-detail/export-details-tab/export-details-tab.component';
import { AgGridModule } from 'ag-grid-angular/main';
import { AngularSplitModule } from 'angular-split';
import { EuiExportHistoryComponent } from './eui-export-history.component';
import { EuiExportHistoryTypeRenderer } from './partial/renderer/eui-export-history-type-renderer.component';
import { CatcherService } from '../catcher/catcher.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EuiExportHistoryDetailComponent } from './partial/eui-export-history-detail/eui-export-history-detail.component';
import { CommonModule } from '@angular/common';
import { UserInfoTabComponent } from './partial/eui-export-history-detail/user-info-tab/user-info-tab.component';
import { JsonDetailsTabComponent } from './partial/eui-export-history-detail/json-details-tab/json-details-tab.component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowsAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

library.add( faTimesCircle, faArrowsAlt );

@NgModule({
    imports: [
        AngularSplitModule.forRoot(),
        AgGridModule,
        FontAwesomeModule,
        CommonModule
    ],
    declarations: [
        EuiExportHistoryComponent,
        EuiExportHistoryDetailComponent,
        EuiExportHistoryTypeRenderer,
        ExportDetailsTabComponent,
        JsonDetailsTabComponent,
        UserInfoTabComponent
    ],
    entryComponents: [
        EuiExportHistoryTypeRenderer
    ],
    providers: [
        CatcherService
    ],
    exports: [
        EuiExportHistoryComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EuiExportHistoryModule {}
