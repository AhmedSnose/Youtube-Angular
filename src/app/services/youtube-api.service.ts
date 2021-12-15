import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {
  constructor(private http: HttpClient) {
  }

  ApiObserable? : any = []
  subs =  Math.ceil(Math.random() * 200000)

  getSearchYoutoubeApi(inputSearchValue : any){    
  return this.http.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${inputSearchValue}&key=AIzaSyAsIsEpW5rvraVKVdErYeqHnLTPjsL-zM8`).pipe(map((data:any)=> {
    return  data.items.map((items:any) => {          
     return {
        url:`https://www.youtube.com/watch?v=${items.id.videoId}`,
        titel: items.snippet.title,
        time: moment(items.snippet.publishTime).fromNow(true),
        description:items.snippet.description,
        thumbnails:items.snippet.thumbnails.high.url,
        channelId:items.snippet.channelId,
        channelTitle:items.snippet.channelTitle
      }
    })
  
  }))}

  getChannelApi(channelsId : any){
    return this.http.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&maxResults=6&id=${channelsId}&key=AIzaSyAsIsEpW5rvraVKVdErYeqHnLTPjsL-zM8`).pipe(map((data:any)=> {
      return  data.items.map((data:any)=>{
       return data.snippet.thumbnails.high.url 
      })   
    }))

  }

  truncate(str : any , n :any){
    return str?.length > n ? str.substr(0 , n -1) + "..." : str
    // google it truncate
}
  RapidApiYT(SearchValue : string){
    return this.http.get('https://youtube-search-results.p.rapidapi.com/youtube-search/' , 
    {
      headers : new HttpHeaders({
        'x-rapidapi-host':'youtube-search-results.p.rapidapi.com',
        'x-rapidapi-key': '368df04d3dmsh6dd0703d91745c7p117eabjsn3b82b55332c4'
        // 9fba65ab6emsh4a9e1fb0891659bp171f61jsn4b675726fd5c Old accound
      }) , params: {q: SearchValue}

      , 
    }).pipe(map((data:any)=> {
      return  data.items.map((item : any)=>{
        return {
          title:this.truncate(item?.title , 50),
          uploadedAt:item.uploadedAt,
          url:item.url,
          views:item.views,
          thumbnails:item.thumbnails[0].url,
          duration:item.duration,
          channelImg:item.author.avatars[0].url,
          channelID:item.author.channelID,
          channelTitle:item.author.name,
          verified:item.author.verified,
          description:item.description,
          subs:this.subs

        }
      })
    }))

  }

  // https://www.youtube.com/watch?v=Cemk32wKN_k&ab_channel=RaddyTheBrand
  // حولت اعمل سبسريب في الركويستين مع بعض وشويه لوبس وبعدين رتيرن للاوبجكيت , اجي استتعيها من بره اندفيند جولت احطها في ابسيرفابول جديد واستتعيه هناك مفيش 
}
