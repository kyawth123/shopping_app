import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { ItemService } from '../../shared/services/item.service';
import { ActivatedRoute } from '@angular/router';
import { Category, Item } from '../../class';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  items:any;
  categoryId:any;
  categories:any[] = [];
  category:any;
  allItem:Item[] = [];

  constructor(private categoryService: CategoryService, private itemService: ItemService, private activatedRoute: ActivatedRoute){
    this.categoryId = this.activatedRoute.snapshot.params['categoryId'];
  }
  
  ngOnInit(): void {
    this.itemService.fetchItem().subscribe((item) => {
      this.allItem = item;

      this.items = this.allItem.filter((item:Item) => item.category.categoryId === this.categoryId)
    });

    this.categoryService.fetchCategory().subscribe((categories) => {
      this.categories = categories;

      this.category = this.categories.find((p) => p.id === this.categoryId)
    })

  }

}
