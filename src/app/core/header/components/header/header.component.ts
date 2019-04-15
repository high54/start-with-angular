import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/core/auth/services';
import { User } from 'src/app/core/auth/models/user.interface';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    styleUrls: ['header.component.scss'],
    templateUrl: 'header.component.html',
})
export class AppHeaderComponent implements OnInit {
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
