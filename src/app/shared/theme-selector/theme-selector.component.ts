import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-theme-selector',
  imports: [CommonModule],
  templateUrl: './theme-selector.component.html',
  styles: ``
})
export class ThemeSelectorComponent {

  constructor( private themeService : ThemeService ) {
    this.themeService.theme$.subscribe(theme => {
      this.theme = theme;
    });
  }

  public menuOpen = false;
  public theme! : 'light' | 'dark';

  toggleMenuOpen() {
    this.menuOpen =!this.menuOpen;
  }

  setTheme(theme: 'light' | 'dark') {
    this.themeService.setTheme(theme);
  }

}
