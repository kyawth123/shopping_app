import { Component, OnInit } from '@angular/core';
import { Item } from '../../class';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../class';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  allItem: any;
  searchItem: any;
  searching = false;
  userData$: Observable<User | null>;

  constructor(private authService: AuthService, private router: Router) {
    this.userData$ = this.authService.userData$
  }
  ngOnInit(): void {}

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

  signOut() {
    this.authService.logout().then(() =>{
      this.router.navigate(['sign-in'])
    })
  }

}
