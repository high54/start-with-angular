import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// Services
import { AuthService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // Récupération de l'utilisateur
        const currentUser = this.authService.currentUserValue;
        // Si l'utilisateur est connecté et qu'il est administrateur
        if (currentUser && currentUser.role === 'admin') {
            return true;
        }
        this.router.navigate(['/authentication']);
        return false;
    }
}
