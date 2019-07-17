import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    private emitChangeSource = new Subject<any>();
    changeEmitted$ = this.emitChangeSource.asObservable();
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }


    // Customizer

    // tslint:disable-next-line:member-ordering
    private emitCustomizerSource = new Subject<any>();
    // tslint:disable-next-line:member-ordering
    customizerChangeEmitted$ = this.emitCustomizerSource.asObservable();
    emitCustomizerChange(change: any) {
        this.emitCustomizerSource.next(change);
    }

    // customizer - compact menu

    // tslint:disable-next-line:member-ordering
    private emitCustomizerCMSource = new Subject<any>();
    // tslint:disable-next-line:member-ordering
    customizerCMChangeEmitted$ = this.emitCustomizerCMSource.asObservable();
    emitCustomizerCMChange(change: any) {
        this.emitCustomizerCMSource.next(change);
    }

       // customizer - compact menu

       // tslint:disable-next-line:member-ordering
       private emitNotiSidebarSource = new Subject<any>();
       // tslint:disable-next-line:member-ordering
       notiSidebarChangeEmitted$ = this.emitNotiSidebarSource.asObservable();
       emitNotiSidebarChange(change: any) {
           this.emitNotiSidebarSource.next(change);
       }
}
