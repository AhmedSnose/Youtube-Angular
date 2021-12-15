import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChannelInfoService } from 'src/app/services/channel-info.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent implements OnInit {

  constructor(private as : AuthService , private cs : ChannelInfoService ,
    private router : Router) { }


  date? = new Date().toString()
  imgAva? : any = 'https://media.istockphoto.com/vectors/missing-image-of-a-person-placeholder-vector-id1288129985?k=20&m=1288129985&s=612x612&w=0&h=OHfZHfKj0oqIDMl5f_oRqH13MHiB63nUmySYILbWbjE='
  user? : any
  file? : any
  ngOnInit(): void {
    this.as.user?.subscribe(d=>this.user=d)
    console.log(this.user);
    
   }
  
  clickOnInputFile(value : HTMLElement){
    value.click()
  }
  fileChangeHandler(value : Event){
    let img = (<any | Event>value.target).files[0]    
    if (img) {
      const file = img
      this.file = img
      const reader = new FileReader();
      reader.onload = e => this.imgAva = reader.result;
      reader.readAsDataURL(file);

  }   // console.log(this.imgAva);
    
}

  submiting(form : NgForm ){
    // console.log(form);

    let channelInfo = {
      channelName:form.value.name,
      channelPic:this.file,
      channelDes:form.value.description,
      channelAt:this.date,
      mySubs:0,
      allViews:0,
      email:this.user.email
    }

    console.log(channelInfo , "channelInfo");
 
    this.cs.addChannelInfo(this.user ,channelInfo).then(d=>this.router.navigate(['/']))
  }

}
