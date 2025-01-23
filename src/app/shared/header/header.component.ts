
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrnSheetContentDirective, BrnSheetTriggerDirective } from '@spartan-ng/brain/sheet';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
} from '@spartan-ng/ui-sheet-helm';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ThemeSelectorComponent } from "../theme-selector/theme-selector.component";
import { UserOptionsComponent } from "../user-options/user-options.component";
import { LucideAngularModule, Menu } from 'lucide-angular';
import { SidebarRoutesComponent } from "../sidebar-routes/sidebar-routes.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    BrnSheetTriggerDirective,
    BrnSheetContentDirective,
    HlmSheetComponent,
    HlmSheetContentComponent,
    HlmButtonDirective,
    LucideAngularModule,
    ThemeSelectorComponent,
    UserOptionsComponent,
    SidebarRoutesComponent
],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  public name!: string;
  public email!: string;
  public image: string | null = null
  public profile$!: Observable<any>;
  readonly menuIcon = Menu;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.profile$ = this.authService.getProfile();
  }

}