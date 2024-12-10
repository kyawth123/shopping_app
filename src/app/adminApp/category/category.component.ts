import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryArray: any;
  editMode = false;
  categoryForm: FormGroup;
  editId: any;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {
    this.categoryForm = this.formBuilder.group({
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryService.fetchCategory().subscribe((categories) => {
      this.categoryArray = categories;
    });
  }

  get fc() {
    return this.categoryForm.controls;
  }

  onDelete(id: any) {
    this.categoryService.deleteCategory(id);
  }

  onEdit(id: any, data: any) {
    this.editId = id;
    this.editMode = true;

    // Pre-fill the form with the selected category
    this.categoryForm.patchValue({
      category: data.category, // Ensure this key matches your data structure
    });
  }

  onSubmit() {
    const formData = {
      category: this.categoryForm.value.category,
    };

    if (!this.editMode) {
      this.categoryService.addData(formData);
    } else {
      this.categoryService.editCategory(this.editId, formData).then(() => {
        this.editMode = false; // Reset edit mode after successful edit
      });
    }
  }
}
