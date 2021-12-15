import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';


import * as moment from 'moment';
import { datauser } from '../interfaces/dataUser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{
public datauserFS? :datauser 

  constructor(
    private fs : AngularFirestore,
    private as : AuthService ,
    private store : AngularFireStorage,
    ) {

  }
  ngOnInit(){
    
  }

  addLike(idOfVideoIfno : any){
   return this.fs.doc(`explore/${idOfVideoIfno.idInfo}/likes/${this.datauserFS?.email}`).set({
     like:true,
     email:this.datauserFS?.email,
     pic:this.datauserFS?.channelPic, 
   })
  }


  

  getLikes(idOfVideoIfno : any){
    return this.fs.collection(`explore/${idOfVideoIfno.idInfo}/likes`).valueChanges()
  }


  delLike(idOfVideoIfno : any , ){
    return this.fs.doc(`explore/${idOfVideoIfno.idInfo}/likes/${this.datauserFS?.email}`).delete()
  }

  addVideoToExplore(videoData : any){

    let thumbnail = videoData.thumbnail
    let video = videoData.video
    console.log(thumbnail ,video);
    let thumbnailRef =  this.store.ref('explore/' + thumbnail.name)
    let videoRef =  this.store.ref('explore/' + video.name)
    return new Promise((res, rej)=>{
      // return this.fs.collection(`users/${this.as.userUID}/cart`).add(data)

      thumbnailRef.put(thumbnail).then(()=>{
        thumbnailRef.getDownloadURL().subscribe(neWthumbnail=> {


          videoRef.put(video).then(()=>{
            videoRef.getDownloadURL().subscribe(neWvideo=> {
              // isWrong 
              // You can call this `users/${uid}/info' and store it in a service Ex

              // this.fs.collection(`users/${uid}/info`).snapshotChanges().subscribe((d:any)=>{
                // d.map((data:any)=>{
                  // console.log(data.payload.doc.data());
                  // console.log(d);
                  
                  this.fs.collection(`explore`).add({
                    ...videoData,
                    thumbnail:neWthumbnail,
                    video:neWvideo,
                    ...this.datauserFS

                  }).then(()=>{
                     res('suii')
                  })
                // })
               

              // })    
            })
          })
        })
      }).then(()=>res('Done video'))
    
    })
    }
  

    getExploreVideos(){
      return this.fs.collection(`explore`).snapshotChanges().pipe(map((data:any)=>{
       return data.map((d:any)=>{
        return {
          date:moment(d.payload.doc.data().time).fromNow(),
          idInfo:d.payload.doc.id ,                 
          ...d.payload.doc.data(),

        }
       })
      }))
        
    }

  addNewUser(id? : string , name? : string , address? : string){
   return this.fs.collection('users/' + id +'/info').add({
      name,
      address
    })
  }

  getUSerData(uid : any){
    return this.fs.collection(`users/${uid}/info`).snapshotChanges()
  }

  addComment(selctedVideos: any , comment : string){    
    return this.fs.collection(`explore/${selctedVideos[0].idInfo}/comment`).add({
      comment,
      email:this.datauserFS?.email,
      name:this.datauserFS?.name,
      pic:this.datauserFS?.channelPic, 
      time:new Date().toString(),
    })
   }

   getComment(selctedVideos: any){
     
    return this.fs.collection(`explore/${selctedVideos.idInfo}/comment`).valueChanges().pipe(map((data)=>{
      return  data.map((comment:any)=>{
        return {
          ...comment,
          time:moment(comment.time).fromNow(),
        }
      })
    }))
   }

   doSub(selectedVideo : any){    
    return this.fs.doc(`users/${selectedVideo[0].userID}/subscribers/${this.datauserFS?.email}`).set({
      email:this.datauserFS?.email,
      pic:this.datauserFS?.channelPic, 
    })
  }

  getSub(selectedVideo : any){
    return this.fs.collection(`users/${selectedVideo.userID}/subscribers`).valueChanges()
  }

  delSub(selectedVideo : any){    
    return this.fs.doc(`users/${selectedVideo.userID}/subscribers/${this.datauserFS?.email}`).delete()
  }

}
