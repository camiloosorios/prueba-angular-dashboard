import { Component } from '@angular/core';
import { HlmSeparatorDirective } from "../../../../libs/ui/ui-separator-helm/src/lib/hlm-separator.directive";
import { LogOut, LucideAngularModule, PanelsTopLeft, Settings, Store } from 'lucide-angular';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-routes',
  standalone: true,
  imports: [HlmSeparatorDirective, LucideAngularModule, RouterModule],
  templateUrl: './sidebar-routes.component.html',
  styles: ``
})
export class SidebarRoutesComponent {

  constructor( 
    private themeService : ThemeService, 
    private authService : AuthService,
    private router : Router
  ) { }

  readonly dashboardIcon = PanelsTopLeft;
  readonly productsIcon = Store;
  readonly toggleThemeIcon = Settings;
  readonly signOutIcon = LogOut;

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
