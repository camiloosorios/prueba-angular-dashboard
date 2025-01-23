import { CommonModule, DecimalPipe } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { provideIcons } from "@ng-icons/core";
import { lucideArrowUpDown, lucideChevronDown, lucideEllipsis } from "@ng-icons/lucide";
import { BrnSelectModule } from "@spartan-ng/brain/select";
import { BrnTableModule, useBrnColumnManager } from "@spartan-ng/brain/table";
import { HlmButtonModule } from "@spartan-ng/ui-button-helm";
import { HlmMenuModule } from "@spartan-ng/ui-menu-helm";
import { HlmSelectModule } from "@spartan-ng/ui-select-helm";
import { HlmTableModule } from "@spartan-ng/ui-table-helm";
import { List, LucideAngularModule } from "lucide-angular";
import { ScreenSizeService } from "../../../core/services/screen-size.service";

@Component({
  selector: 'app-table-clients',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HlmMenuModule,
    BrnTableModule,
    HlmTableModule,
    HlmButtonModule,
    LucideAngularModule,
    DecimalPipe,
    BrnSelectModule,
    HlmSelectModule,
  ],
  providers: [provideIcons({ lucideChevronDown, lucideEllipsis, lucideArrowUpDown })],
  templateUrl: 'table-clients.component.html',
})
export class ProductsTableComponent {

  public listIcon = List

  protected readonly _brnColumnManager = useBrnColumnManager({
    logo: { visible: true, label: 'Logo' },
    client: { visible: true, label: 'Client' },
    company: { visible: true, label: 'Company' },
    email: { visible: true, label: 'Email' },
    country: { visible: true, label: 'Country' },
    volume: { visible: true, label: 'Volume' },
  });

  protected readonly _allDisplayedColumns = computed(() => [
    ...this._brnColumnManager.displayedColumns(),
  ]);

  protected readonly _products = signal([
    {
      name: 'John Doe',
      company: 'Acme Inc.',
      email: 'john.doe@acme.com',
      country: 'USA',
      volume: 150000,
      icon: '/images/acme-logo.svg',
    },
    {
      name: 'Jane Smith',
      company: 'Global Tech',
      email: 'jane.smith@globaltech.com',
      country: 'UK',
      volume: 120000,
      icon: '/images/global-logo.svg',
    },
    {
      name: 'Carlos García',
      company: 'Desarrollo S.A.',
      email: 'carlos.garcia@desarrollo.com',
      country: 'Mexico',
      volume: 100000,
      icon: '/images/desarrollo-logo.svg',
    },
    {
      name: 'Linda Parker',
      company: 'Green Solutions',
      email: 'linda.parker@greensolutions.com',
      country: 'Canada',
      volume: 80000,
      icon: '/images/green-logo.svg',
    },
  ]);

  maxWidth: string = '320px';

  constructor(private screenSizeService: ScreenSizeService) {
    this.screenSizeService.screenWidth$.subscribe((width) => {
      this.maxWidth = `${Math.min(width * 0.8, 1920)}px`;
    });
  }
}
