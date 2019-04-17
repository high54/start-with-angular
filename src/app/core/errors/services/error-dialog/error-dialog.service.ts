import { Injectable } from '@angular/core';

@Injectable()
export class ErrorDialogService {
    constructor() { }

    openDialog(error: JSON): void {
        window.alert(JSON.stringify(error));
    }
}
