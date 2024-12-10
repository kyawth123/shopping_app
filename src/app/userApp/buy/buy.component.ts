import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../shared/services/item.service';
import { Item } from '../../class';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})
export class BuyComponent implements OnInit {

  selectedItems:any;
  allData:Item[] = [];

  constructor(private itemService: ItemService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.itemService.fetchItem().subscribe((datas) => {
      this.allData = datas;

      this.selectedItems = this.allData.filter((item) => item.buy === true )
    })
  }

  cancel(id: any, item:any) {
    const updated: Item = {
      itemName: item.itemName,
      category: {
        categoryId: item.category.categoryId,
        category:  item.category.category
      },
      itemImgPath: item.itemImgPath,
      model: item.model,
      price: item.price,
      details: item.details,
      buy: false
    };
    this.itemService.editItem(id, updated);
    window.alert('Removed from cart!')
  }

}
