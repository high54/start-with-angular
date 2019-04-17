import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/services';
import { User } from 'src/app/core/auth/models/user.interface';

@Component({
    selector: 'ui-header',
    styleUrls: ['header.component.scss'],
    templateUrl: 'header.component.html',
})
export class UiHeaderComponent implements OnInit {
    user: User;
    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.authService.currentUser.subscribe((user) => {
            this.user = user;
        });
    }
}
