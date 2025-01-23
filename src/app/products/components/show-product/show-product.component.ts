import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { Product } from '../../../core/interfaces';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-show-product',
  standalone: true,
  imports: [
    BrnSelectImports,
    HlmSelectImports,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HlmLabelDirective,
    LucideAngularModule
  ],
  templateUrl: 'show-product.component.html'
})
export class ShowProductComponent {
  public createIcon = Plus;
  public imagePreview: string | null = null;
  public categories: string[] = [];
  @Input() product!: Product;

  constructor() { }

  isModalOpen = true;

  closeModal(event: MouseEvent): void {
    this.isModalOpen = false;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
