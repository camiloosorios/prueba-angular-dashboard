import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, ElementRef, TrackByFunction, ViewChild, computed, effect, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucideArrowUpDown, lucideChevronDown, lucideEllipsis } from '@ng-icons/lucide';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { BrnSelectModule } from '@spartan-ng/brain/select';
import { BrnTableModule, PaginatorState, useBrnColumnManager } from '@spartan-ng/brain/table';
import { HlmButtonDirective, HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { ChevronDown, Ellipsis, LucideAngularModule } from 'lucide-angular';
import { BehaviorSubject, debounceTime, map } from 'rxjs';
import { Product } from '../../../core/interfaces';
import { ProductsService } from '../../../core/services/products.service';
import { ScreenSizeService } from '../../../core/services/screen-size.service';
import { CreateProductComponent } from "../create-product/create-product.component";
import { EditProductComponent } from "../edit-product/edit-product.component";
import { ShowProductComponent } from "../show-product/show-product.component";


@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BrnMenuTriggerDirective,
    HlmMenuModule,
    BrnTableModule,
    HlmTableModule,
    HlmButtonModule,
    HlmButtonDirective,
    DecimalPipe,
    HlmInputDirective,
    BrnSelectModule,
    HlmSelectModule,
    LucideAngularModule,
    CreateProductComponent,
    EditProductComponent,
    ShowProductComponent
],
  providers: [provideIcons({ lucideChevronDown, lucideEllipsis, lucideArrowUpDown })],
  templateUrl: 'products-table.component.html',
})
export class ProductsTableComponent {
  protected readonly _rawFilterInput = signal('');
  protected readonly _titleFilter = signal('');
  private readonly _debouncedFilter = toSignal(toObservable(this._rawFilterInput).pipe(debounceTime(300)));

  private readonly _displayedIndices = signal({ start: 0, end: 0 });
  protected readonly _availablePageSizes = [5, 10, 20];
  protected readonly _pageSize = signal(this._availablePageSizes[0]);

  private readonly _selectionModel = new SelectionModel<Product>(true);
  protected readonly _selected = toSignal(this._selectionModel.changed.pipe(map((change) => change.source.selected)), {
    initialValue: [],
  });

  showoptions: boolean = false;

  openMenuOptions() {
    this.showoptions = true;
  }

  protected readonly _brnColumnManager = useBrnColumnManager({
    title: { visible: true, label: 'Title' },
    price: { visible: true, label: 'Price' },
    description: { visible: true, label: 'Description' },
    category: { visible: true, label: 'Category' },
    image: { visible: true, label: 'Image' },
  });
  protected readonly _allDisplayedColumns = computed(() => [
    'select',
    ...this._brnColumnManager.displayedColumns(),
    'actions',
  ]);

  private readonly _products = signal<Product[]>([]);
  private readonly _filteredPayments = computed(() => {
    const titleFilter = this._titleFilter()?.trim()?.toLowerCase();
    if (titleFilter && titleFilter.length > 0) {
      return this._products().filter((u) => u.title.toLowerCase().includes(titleFilter));
    }
    return this._products();
  });
  private readonly _emailSort = signal<'ASC' | 'DESC' | null>(null);
  protected readonly _filteredSortedPaginatedPayments = computed(() => {
    const sort = this._emailSort();
    const start = this._displayedIndices().start;
    const end = this._displayedIndices().end + 1;
    const payments = this._filteredPayments();
    if (!sort) {
      return payments.slice(start, end);
    }
    return [...payments]
      .sort((p1, p2) => (sort === 'ASC' ? 1 : -1) * p1.title.localeCompare(p2.title))
      .slice(start, end);
  });
  protected readonly _allFilteredPaginatedPaymentsSelected = computed(() =>
    this._filteredSortedPaginatedPayments().every((payment) => this._selected().includes(payment)),
  );
  protected readonly _checkboxState = computed(() => {
    const noneSelected = this._selected().length === 0;
    const allSelectedOrIndeterminate = this._allFilteredPaginatedPaymentsSelected() ? true : 'indeterminate';
    return noneSelected ? false : allSelectedOrIndeterminate;
  });

  protected readonly _trackBy: TrackByFunction<Product> = (_: number, p: Product) => p.id;
  protected readonly _totalElements = computed(() => this._filteredPayments().length);

  protected readonly _currentPage = computed(() => {
    const startIndex = this._displayedIndices().start;
    const pageSize = this._pageSize();
    return Math.floor(startIndex / pageSize) + 1;
  });

  protected readonly _totalPages = computed(() => {
    const totalElements = this._totalElements();
    const pageSize = this._pageSize();
    return Math.ceil(totalElements / pageSize);
  });
  protected readonly _onStateChange = ({ startIndex, endIndex }: PaginatorState) =>
    this._displayedIndices.set({ start: startIndex, end: endIndex });

  public maxWidth: string = '320px';
  public columnsIcon = ChevronDown;
  public optionsIcon = Ellipsis;

  constructor(
    private screenSizeService: ScreenSizeService,
    private productsService: ProductsService
  ) {
    this.productsService.products$.subscribe((products) => {
      this._products.set(products);
    });

    this.screenSizeService.screenWidth$.subscribe((width) => {
      this.maxWidth = `${Math.min(width * 0.8, 1920)}px`;
    });
    effect(() => this._titleFilter.set(this._debouncedFilter() ?? ''), { allowSignalWrites: true });
  }

  protected handleHeaderCheckboxChange() {
    const previousCbState = this._checkboxState();
    if (previousCbState === 'indeterminate' || !previousCbState) {
      this._selectionModel.select(...this._filteredSortedPaginatedPayments());
    } else {
      this._selectionModel.deselect(...this._filteredSortedPaginatedPayments());
    }
  }

  protected handleEmailSortChange() {
    const sort = this._emailSort();
    if (sort === 'ASC') {
      this._emailSort.set('DESC');
    } else if (sort === 'DESC') {
      this._emailSort.set(null);
    } else {
      this._emailSort.set('ASC');
    }
  }

  trackByColumn(index: number, column: any): string {
    return column.name;
  }

  trackBySize(index: number, size: number): number {
    return size;
  }

  public openEdit = false;
  public openShow = false;

  setOpenEdit() {
    this.openEdit = !this.openEdit;
  }

  setOpenShow() {
    this.openShow = !this.openShow;
  }

  deleteProduct(id: Product['id']) {
    this.productsService.deleteProduct(id);
  }
}
