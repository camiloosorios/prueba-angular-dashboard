import { Component } from '@angular/core';
import { SidebarRoutesComponent } from "../sidebar-routes/sidebar-routes.component";


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarRoutesComponent],
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent {
  
}
