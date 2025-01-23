import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../core/interfaces';

@Component({
  selector: 'app-edit-product',
  imports: [
    BrnSelectImports,
    HlmSelectImports,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    LucideAngularModule
  ],
  templateUrl: './edit-product.component.html',
  styles: []
})
export class EditProductComponent {
  public createIcon = Plus;
  public productForm: FormGroup;
  public imagePreview: string | null = null;
  public categories: string[] = [];
  @Input() product!: Product;

  @ViewChild('formContainer') formContainer!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: [null, Validators.required]
    });

    productsService.categories$.subscribe(categories => {
      this.categories = categories;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.productForm.patchValue({
        title: this.product.title || '',
        price: this.product.price || '',
        description: this.product.description || '',
        category: this.product.category || ''
      });
      this.imagePreview = this.product.image || null; 
    }
  }

  isModalOpen = true;

  closeModal(event: MouseEvent): void {
    if (this.formContainer && !this.formContainer.nativeElement.contains(event.target)) {
      this.isModalOpen = false;
    }
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

  onSubmit(ctx: any): void {
    if (this.productForm.invalid) {
      return;
    }
    ctx.close();
    this.productsService.addProduct({
      ...this.productForm.value,
      image: this.imagePreview,
      id: Math.floor(Math.random() * 1000)
    });
    this.productForm.reset();
    this.imagePreview = null;
  }
}