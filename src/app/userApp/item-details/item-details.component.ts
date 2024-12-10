import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../shared/services/item.service';
import { Item, Review } from '../../class';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent implements OnInit {

  id:any;
  item: any;
  reviewForm: FormGroup | any;
  reviews: any;
  time:string = '';
  needReview:any;
  detailMode = true;

  constructor(private itemService: ItemService,private toastr: ToastrService, private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.time = new Date().toLocaleTimeString();

    this.reviewForm = this.formBuilder.group ({
      reviews:[''], 
      category: [''], 
      item: ['']
    });
  }

  onReview() {
    this.detailMode = false;
  }

  ngOnInit(): void {
    this.itemService.loadOneItem(this.id).subscribe((val) => {
      console.log('Loaded data', val)
      this.item = val;
    });

    this.itemService.fetchReview(this.id).subscribe((val) => {
      console.log('Loaded review', val);
      this.reviews = val;

      this.needReview = this.reviews.filter((review:Review) => review.item.itemId === this.id)
    })
  }

  onBack() {
    this.router.navigate(['items'])
  }

  onSubmit() {

    if (!this.id || !this.item?.itemName || !this.item.category?.categoryId) {
      console.error('Invalid item data:', this.item); // Debugging
      return;
    }
    const form = this.reviewForm.value;
    const formData: Review = {
      category: {
        categoryId: this.item.category.categoryId,
        category: this.item.category.category
      },
      item: {
        itemId: this.id,
        itemName: this.item?.itemName
      },
      reviews: form.reviews
    }
    console.log('submitted',formData)

    this.itemService.onReview(formData);
  }

  buy() {
    const choosed: Item = {
      itemName: this.item.itemName,
      category: {
        categoryId: this.item.category.categoryId,
        category: this.item.category.category
      },
      itemImgPath: this.item.itemImgPath,
      model: this.item.model,
      price: this.item.price,
      details: this.item.details,
      buy: true
    };

    this.itemService.editItem(this.id, choosed)
    window.alert('Add item to cart')
  }
}