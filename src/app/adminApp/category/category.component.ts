import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../class';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  @ViewChild('categoryForm') categoryForm : NgForm | any;

  categoryArray:any;
  editId:any;
  editData:any;
  editMode= false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.fetchCategory().subscribe( (category) => {
      this.categoryArray = category
    })
  }


  onDelete(id:any) {
    this.categoryService.deleteCategory(id)
  }

  onEdit(id:any, data:any) {
    this.editId = id;
    this.editData = data;
    this.editMode = true;
  }

  onSubmit() {
    const formData: Category = {
      category: this.categoryForm.value.category
    }
    if (!this.editMode) {
      this.categoryService.addData(formData);
    } else if (this.editMode) {
      this.categoryService.editCategory(this.editId, formData);
      this.editMode = false;
    }
    }

}
