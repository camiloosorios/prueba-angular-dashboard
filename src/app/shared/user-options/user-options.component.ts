import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/brain/popover';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-options',
  imports: [
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    CommonModule,
    HlmPopoverContentDirective,
    HlmButtonDirective,
  ],
  templateUrl: './user-options.component.html',
  styles: ``
})
export class UserOptionsComponent {

  @Input() name!: string;
  @Input() email!: string;
  @Input() image!: string;

  constructor(private authService: AuthService, private router: Router) { }

  signOut(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
