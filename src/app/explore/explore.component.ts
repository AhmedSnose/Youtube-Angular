import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { resolve } from 'dns';
import { comments } from '../interfaces/comments.interface';
import { datauser } from '../interfaces/dataUser.interface';
import { videos } from '../interfaces/videos.interface';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  public videos? : videos[]
  videoSrc? : any = "https://firebasestorage.googleapis.com/v0/b/angular-b6223.appspot.com/o/explore%2Finsta.mp4?alt=media&token=4abb8012-e192-444c-928d-9c1101430057"
  selctedVideos? : videos[]
  userData? : any
  isLiked? : any
  @ViewChild('c') likeBtn?: ElementRef;
  likes?:any
  comments?  : comments[]
  commentsAmount? : any
  @ViewChild('subBtn') subBtn?: ElementRef | any;
  isSub? : boolean
  subsAmoount? = 0
// comments?: 

  constructor(
    private as : AuthService ,
    // private cs : ChannelInfoService ,
    private router : Router , 
    private us : UserService ,
    private route : ActivatedRoute
    ) {  
      // if(!this.us.datauserFS){
      //   this.router.navigate(['/'])
      // }
      // isWrong
  }

  ngOnInit(): void {
    let id : any = this.route.snapshot.paramMap.get('id')

    this.us.getExploreVideos().subscribe((d:any)=>{
      this.videos = d
    if(id){
        this.playVideo(d[id])
      }

    })
    this.userData = this.us.datauserFS

   }


 async playVideo (value : videos){
  //  console.log(this.userData);
   
    //  isWrong
    // sub btn
    this.selctedVideos = [value]
    this.us.getComment(value).subscribe(comments=>{
      this.comments = comments     
       this.commentsAmount = comments.length

    })

    this.us.getSub(value).subscribe((d:any)=>{
      // console.log(d , "subs")
      this.subsAmoount = d.length
      this.isSub = d.findIndex((sub:any)=> sub.email === this.userData?.email) !== -1
      // console.log(this.isSub);
      
      if(this.isSub){
        (<HTMLElement>this.subBtn?.nativeElement).classList.add('subscribed') ,
        (<HTMLElement>this.subBtn?.nativeElement).innerHTML = 'subscribed';
      }
    }) 

   return new Promise((resolve , rej) => {
    this.us.getLikes(value).subscribe((d:any)=>{
      this.isLiked = d.findIndex((like:any)=> like.email === this.userData?.email) !== -1
      // console.log(this.isLiked);
      //  is Wrong 
      // afs.collection('items', ref => ref.where('size', '==', 'large'))
      // https://github.com/angular/angularfire/blob/master/docs/firestore/querying-collections.md
      // in big app you should uesd 'where' method / or if you want to show the users they like in future
    //  console.log(d,"getLikes");
     this.likes = d.length
    resolve(this.isLiked)
   } , error => rej(error))
  }).then((liked)=>{
    if(liked) (<any>this.likeBtn?.nativeElement).children[0].style.color='red'
  })
   // how to handel this  aysnc  , and what is the best senaryo
// document.querySelector('.sel').children[0].children[1].children[0].children[1].children[1].children[0]
   }

   like(selctedVideo : any){

     if(!this.isLiked){
      (<any>this.likeBtn?.nativeElement).children[0].style.color='red'
      this.us.addLike(selctedVideo)
      this.us.getLikes(selctedVideo).subscribe((d:any)=> this.likes = d.length)

     } else {
      (<any>this.likeBtn?.nativeElement).children[0].style.color='black'
       this.us.delLike(selctedVideo)
       this.us.getLikes(selctedVideo).subscribe((d:any)=> this.likes = d.length)

     }
   }


   Comment(value : any){
      this.us.addComment(this.selctedVideos , value.value).then(()=>{
        console.log("comment added");
        
      })
     value.value = ''
   }

   Subscribe(){     
    if(!this.isSub){
      this.us.doSub(this.selctedVideos)
      this.subBtn?.nativeElement.classList.add('subscribed');
      (this.subBtn?.nativeElement).innerHTML = 'subscribed'

    } 
    else {
      this.us.delSub(this.userData)
      this.subBtn?.nativeElement.classList.remove('subscribed');
      (this.subBtn?.nativeElement).innerHTML = 'subscribe';

     }

  
   }

}
