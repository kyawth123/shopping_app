import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../../class';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements OnInit {

  categoryArray: Category[] = [];

  constructor(private afs:AngularFirestore, private toastr: ToastrService) { }

  ngOnInit(): void {}

  addData(data:any) {
    return this.afs.collection('category').add(data).then( docRef => {
      this.toastr.success('Data inserted successfully!')
    }).catch(error => {
      this.toastr.error(error)
    })
  }

   fetchCategory(){
    return  this.afs.collection('category').snapshotChanges().pipe(
      map(response => {
        return response.map(a => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() ;
          return {id, data};
        })
      })
    )
  }

  deleteCategory(id:any) {
    this.afs.doc(`category/${id}`).delete().then( () => {
      this.toastr.success('Category was deleted')
    })
  }

  editCategory(id: string, data: any){ 
    return this.afs.doc(`category/${id}`).update(data).then(() => { 
      this.toastr.success('Updated successfully!'); }); 
    }
}
