import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../shared/services/item.service';
import { Category, Item } from '../../class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../shared/services/category.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent implements OnInit {

  itemForm: FormGroup | any;
  docId:any;
  item: any;
  editMode= false;
  categoryArray: any;
  imgSrc: any = 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
  selectedImg: any;

  constructor(private itemService: ItemService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private categoryService: CategoryService, private router: Router, private storage: AngularFireStorage) {
   
    this.itemForm = this.formBuilder.group({
      itemName: ['', Validators.required],
      category: ['', Validators.required],
      itemImgPath: ['', Validators.required],
      model: ['', Validators.required],
      price: ['', Validators.required],
      details: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.docId = data.id;

      if (this.docId) {
        this.editMode = true;
        this.itemService.loadOneItem(this.docId).subscribe((itemm) => {
          console.log(itemm)
          this.item = itemm;

          this.itemForm.patchValue({
            itemName: this.item?.itemName,
            category: `${this.item?.category?.categoryId}-${this.item?.category?.category}`,
            itemImgPath: this.item?.itemImgPath,
            model: this.item?.model,
            price: this.item?.price,
            details: this.item?.details
          })
          this.imgSrc = this.item?.itemImgPath;
        })
      }
    })

    this.categoryService.fetchCategory().subscribe((val) => {
      this.categoryArray = val;
    })
  }

  get fc() {
    return this.itemForm.controls;
  }

  onSubmit(): void {
    const [categoryId, category] = this.itemForm.value.category.split('-');
    const itemData = {
      ...this.itemForm.value,
      category: { categoryId, category },
    };
    console.log('Submitting item:', itemData); // Debug the structure
    if (this.editMode) {
      this.itemService.editItem(this.docId, itemData);
    } else {
      this.itemService.addItem(itemData);
    }
    this.router.navigate(['/all']);
  }
  

  showPreview($event:any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    }
    reader.readAsDataURL($event.target?.files[0]);
    this.selectedImg = $event.target?.files[0];
  }


}
