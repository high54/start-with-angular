import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    styleUrls: ['login.component.scss'],
    templateUrl: 'login.component.html',
})
export class AppLoginComponent implements OnInit {
    formLogin = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    returnUrl: string;
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {

        this.authService.logout();

        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    connexion(form: FormGroup) {
        const { value, valid } = form;

        if (valid) {
            this.authService.login(value.username, value.password).pipe(first())
                .subscribe(data => {
                    this.router.navigate([this.returnUrl]);
                }, error => {
                    console.log(error);
                });
        }
    }
}
