import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { ItemService } from '../../shared/services/item.service';
import { Category, Item, User } from '../../class';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
})
export class ItemsComponent implements OnInit {
  @ViewChild('search') searchForm: NgForm | any;

  allItem: any;
  searchItem: any;
  searching = false;
  lowEnds: Item[] = [];
  midENds: Item[] = [];
  highENds: Item[] = [];
  categories:any;
  userData$: Observable<User | null>;

  constructor(
    private categoryService: CategoryService,
    private itemService: ItemService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userData$ = this.authService.userData$
  }

  ngOnInit(): void {
    this.itemService.fetchItem().subscribe((items) => {
      this.allItem = items;

      this.lowEnds = this.itemClass(0, 50000);
      this.midENds = this.itemClass(50000, 90000);
      this.highENds = this.itemClass(90000, 5000000);
    });
    this.categoryService.fetchCategory().subscribe((category) => {
      this.categories = category
    })
  }

  signOut() {
    this.authService.logout().then(() => {
      this.router.navigate(['sign-in'])
    })
  }

  itemClass(minPrice: number, maxPrice: number): Item[] {
    return this.allItem.filter(
      (item: Item) => item.price >= minPrice && item.price < maxPrice
    );
  }

  getMatchingItems(searchItem:any) : Item[] {
    return this.allItem.filter(
      (item:Item) => item.itemName.toLowerCase().includes(searchItem.toLowerCase()) )
  }
  

  onSubmit(searchForm:any) {
    const searchItem = searchForm.value.search?.trim();
    if (searchItem) {
      const matchingItems = this.getMatchingItems(searchItem);
      if (matchingItems.length > 0) {
        this.searchItem = matchingItems
      } else {
        this.searchItem = []
      }
    } else {
      this.searchItem = [];
    }
    this.searching = true;
  }

  back() {
    this.searching = !this.searching;
  }
}

@Pipe({
  name: 'sliceIntoGroups',
})
export class SliceIntoGroupsPipe implements PipeTransform {
  transform(items: any[], groupSize: number): any[][] {
    const groups = [];
    for (let i = 0; i < items.length; i += groupSize) {
      groups.push(items.slice(i, i + groupSize));
    }
    return groups;
  }
}
