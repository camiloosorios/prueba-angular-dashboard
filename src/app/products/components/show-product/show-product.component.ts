import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { Product } from '../../../core/interfaces';

@Component({
  selector: 'app-show-product',
  standalone: true,
  imports: [
    CommonModule,
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
