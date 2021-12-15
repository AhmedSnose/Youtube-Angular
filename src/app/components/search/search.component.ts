import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { YoutubeApiService } from 'src/app/services/youtube-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit  , OnDestroy{

items? : [{
  url:string,
  titel: string,
  time: string,
  description:string,
  channelTitle: string,
  thumbnails:string,
  channelImg:string,
  channelId:string
}] | any

arr? : any = []

searchValue? : any
dataObserableUnSub? : Subscription

  constructor(private route : ActivatedRoute ,
     private YTapi : YoutubeApiService,
    private router : Router) {
  }

  ngOnInit(): void {
this.route.queryParams.subscribe(d=>{
  if(!d){
    this.router.navigate(['/'])
  }
  this.searchValue=d.searchFor
})  
  
this.dataObserableUnSub = this.YTapi.getSearchYoutoubeApi(this.searchValue).subscribe((data:any)=>{ 
  return data.map((data:any,i:any)=>{

    this.YTapi.getChannelApi(data.channelId).subscribe(dataChannels=>{
       this.arr.push({...data, channelImg:dataChannels})
        console.log(this.arr);
        this.items = this.arr
      })

  })

} , error=> console.log(error.message) , ()=>console.log("every thing is oky"))

}

ngOnDestroy(){
  this.dataObserableUnSub?.unsubscribe()
}


}
