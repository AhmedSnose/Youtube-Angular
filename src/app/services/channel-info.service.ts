import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ChannelInfoService {
  imgAva? : any = 'https://media.istockphoto.com/vectors/missing-image-of-a-person-placeholder-vector-id1288129985?k=20&m=1288129985&s=612x612&w=0&h=OHfZHfKj0oqIDMl5f_oRqH13MHiB63nUmySYILbWbjE='

  constructor(private fs : AngularFirestore ,private store : AngularFireStorage) { }

  addChannelInfo(user : any , infoObject : any){
    let uid = user.uid
    let channelPic = infoObject.channelPic
    // console.log(user ,infoObject , "From Service");
    let ref = channelPic ? this.store.ref('users/' + channelPic.name) :  this.store.ref('users/basicImg')
    // console.log(ref , "ref");
    return new Promise((res, rej)=>{
      // return this.fs.collection(`users/${this.as.userUID}/cart`).add(data)

      ref.put(channelPic).then(()=>{
        ref.getDownloadURL().subscribe(photoUrl=> {
          this.fs.collection(`users/${uid}/info`).add({
            ...infoObject,
            channelPic:photoUrl
          })
        })
      }).then(()=>res('Done'))
    
    })



    }


}
