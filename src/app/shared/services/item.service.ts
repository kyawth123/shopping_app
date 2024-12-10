import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { Item, Review } from '../../class';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private afs: AngularFirestore, private router: Router, private toastr: ToastrService, private storage: AngularFireStorage) { }

  addItem(data:any) {
    this.afs.collection('item').add(data).then(() => {
      this.toastr.success('Item Added!')
    })
  }

  onReview(data:any) {
    this.afs.collection('review').add(data).then(() => {
      this.toastr.success('Thanks for reviewing our item.')
    })
  }

   fetchItem() :Observable<Item[]> {
    return  this.afs.collection('item').snapshotChanges().pipe(
      map(response => {
        return response.map(a => {
          const data = a.payload.doc.data() as Item;
          const id = a.payload.doc.id;
          return {id, ...data}
        })
      })
    )
  }

  fetchReview(id:any): Observable<Review[]> {
    return this.afs.collection('review').snapshotChanges().pipe(
      map(response => {
        return response.map(a => {
          const data = a.payload.doc.data() as Review;
          const id = a.payload.doc.id;
          return {id, ...data}
        })
      })
    )
  }

  loadOneItem(id:any) : Observable<any> {
    return this.afs.doc(`item/${id}`).valueChanges();
  }

  deleteItem(id:any) {
    this.afs.doc(`item/${id}`).delete().then(() => {
      this.toastr.success('Item Deleted!')
    })
  }

  editItem(id:any, data:any) {
    this.afs.doc(`item/${id}`).update(data).then( () => {
      this.toastr.success('Updated Item!')
    })
  }

  onDelete(id:any, itemImgPath:any) {
    this.storage.refFromURL(itemImgPath).delete();
    this.deleteItem(id);
  }

  uploadImage(selectedImg:any, formData:any, id:any, editMode: boolean) {
    const filePath = `itemImg/${Date.now()}`;
    this.storage.upload(filePath, selectedImg).then( () => {
      console.log('Image Uploaded Successfully!');
      this.storage.ref(filePath).getDownloadURL().subscribe((url) => {
        formData.itemImgPath = url;
        if (editMode) {
          this.editItem(id, formData);
        } else if (!editMode) {
          this.addItem(formData)
        }
      })
    })
  }
}
