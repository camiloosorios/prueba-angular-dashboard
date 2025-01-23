import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  signIn(): void {
    this.authService.login();
  }

}
