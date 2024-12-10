import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../shared/services/item.service';
import { Item } from '../../class';

@Component({
  selector: 'app-all-item',
  templateUrl: './all-item.component.html',
  styleUrl: './all-item.component.css'
})
export class AllItemComponent implements OnInit {

  itemArray:any = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
      this.itemService.fetchItem().subscribe( (datas) => {
        this.itemArray = datas;
      })
  }

  onDelete(id:any, imgPath:any) {
    this.itemService.onDelete(id, imgPath)
  }

}
