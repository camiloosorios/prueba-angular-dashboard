import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/brain/dialog';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../core/services/products.service';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';

@Component({
  selector: 'app-create-product',
  imports: [
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    BrnSelectImports,
    HlmSelectImports,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    HlmDialogFooterComponent,
    LucideAngularModule
  ],
  templateUrl: './create-product.component.html',
  styles: []
})
export class CreateProductComponent {

  public createIcon = Plus;
  public productForm: FormGroup;
  public imagePreview: string | null = null;
  public categories: string[] = [];

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {
    productsService.categories$.subscribe(categories => {
      this.categories = categories;
    })
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  onFileChange(event: any): void {
    console.log(this.categories)
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
