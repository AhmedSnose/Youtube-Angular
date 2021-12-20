import { Component , OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChannelInfoService } from 'src/app/services/channel-info.service';
import {MatChipInputEvent} from '@angular/material/chips';
import { UserService } from 'src/app/services/user.service';
import { LoaderService } from 'src/app/services/loader.service';


export interface Fruit {
  name: string;
}


@Component({
  selector: 'app-create-explore',
  templateUrl: './create-explore.component.html',
  styleUrls: ['./create-explore.component.scss']
})

export class CreateExploreComponent implements OnInit {
  constructor(
    private as : AuthService ,
    private router : Router , 
    private us : UserService ,
    public ls : LoaderService
    ) {    
      
  }

  ngOnInit(): void {
   }


   addOnBlur = true;
   fruits: Fruit[] = [{name: 'gaming'}, {name: 'coding'}, {name: 'vue.js'}];


  panelOpenState = false;
  thumbFile? : any
  videoFile? : any
  video? : any
  //  = 'https://i.imgur.com/1A7AKoF.mp4'
  thumbnails? : any = 'https://havecamerawilltravel.com/wp-content/uploads/2015/08/YouTube-Thumbnails.jpg'
  duration? : any
  isLoading?  = false



  

  clickOnInputThumb(value : HTMLElement){
    value.click()
  }
  clickOnInputVideo(value : HTMLElement){
    value.click()
    
  }
  thumbChangeHandler(value : Event){
    let img = (<any | Event>value.target).files[0]        
    
    if (img && img.type.includes('image')) {
      const file = img
      this.thumbFile = img
      const reader = new FileReader();
      reader.onload = e => this.thumbnails = reader.result;
      reader.readAsDataURL(file);

  } else {
    alert('You Should select img')

  }
  //  console.log(this.thumbnails);
    
}



videoChangeHandler(value : Event | any){
  let video = (<any | Event>value.target).files[0] 
  
  if (video.size <= 4523448 && video.type.includes('video')) {

    const file = video
    this.videoFile = video
    const reader = new FileReader();
    reader.onload = e => {

     return this.video = reader.result
    };
    reader.readAsDataURL(file);
}   else {
  alert('Your (Video) Should Be less Than 4.3MB')
}

}

  submiting(form : NgForm ){
    let time = new Date().toString()
    let videoInfo = {
      ...form.value,
      video:this.videoFile,
      thumbnail:this.thumbFile,
      time,
      keywords:this.fruits[0],
      subs:0,
      allViewos:0,
      duration:this.duration.toFixed(2),
      likes:0
    }
    console.log(this.duration);
    this.ls.isLoading.next(true)
    this.isLoading = true

    this.us.addVideoToExplore( videoInfo).then(()=>{

      this.router.navigate(['explore']).then(() => {
        this.ls.isLoading.next(false)
        window.location.reload();
      });

    })

  }

  onMetadata(video:any){
    this.duration = video.duration
  }

  
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  
}


// time: moment(items.snippet.publishTime).fromNow(true),
