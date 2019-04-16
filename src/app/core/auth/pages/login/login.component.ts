import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
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

    /**
     * On Init, déconnexion de l'utilisateur (supprime le token dans le localstorage), et récupére l'url demandé si il y a eu redirection
     */
    ngOnInit(): void {
        this.authService.logout();
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    /**
     *  Demande au service d'authentification de valider les informations saisie par l'utilisateur
     *  Si les informations sont exacte, l'utilisateur est redirigé vers l'accueil
     * @param form Formulaire du template HTML
     */
    connexion(form: FormGroup): void {
        const { value, valid } = form;

        if (valid) {
            this.authService.login(value.username, value.password).pipe(first())
                .subscribe(data => {
                    this.router.navigate(['']);
                }, error => {
                    console.log(error);
                });
        }
    }

    /**
     * Getter pour la validation du formulaire
     * Permet d'afficher les erreurs à l'utilisateur sur le formulaire
     */

    get username(): AbstractControl {
        return this.formLogin.get('username');
    }
    get password(): AbstractControl {
        return this.formLogin.get('password');
    }
}
