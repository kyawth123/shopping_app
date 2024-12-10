import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { User } from '../../class';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userData$: Observable<User | null>;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.userData$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges().pipe(
            map(userData => userData?? null)
          )
        } else {
          return of(null);
        }
      })
    )
  }

  async signUp(email: string, password: string, role: 'admin' | 'user', userName: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
  
      if (user) {
        await this.setUserData(user, role, userName);
        await this.sendVerificationEmail();
      }
    } catch (error) {
      console.error('Sign-Up Error:', error);
      throw error;
    }
  }
  

  async login(email: string, password: string): Promise<void> {
    await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }

  async sendVerificationEmail(): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user) {
      await user.sendEmailVerification();
    }
  }

  async resetPassword(email: string): Promise<void> {
    await this.afAuth.sendPasswordResetEmail(email);
  }

private async setUserData(user: any, role: 'admin' | 'user', userName: string): Promise<void> {
  const userData: User = {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified ? user.emailVerified.toString() : 'false',
    userName,
    role,
  };

  try {
    await this.firestore.doc(`users/${user.uid}`).set(userData, { merge: true });
  } catch (error) {
    console.error('Error writing to Firestore:', error);
    throw error; // Let the calling function handle it
  }
}


  getUserRole(): Observable<'admin' | 'user' | null> {
    return this.afAuth.authState.pipe(
      first(),
      switchMap((user) => {
        if (!user) return new Observable<null>((observer) => observer.next(null));
        return this.firestore
          .doc<User>(`users/${user.uid}`)
          .valueChanges()
          .pipe(map((userData) => userData?.role || null));
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(map((user) => !!user));
  }
}