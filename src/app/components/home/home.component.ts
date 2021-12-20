import { Component, ElementRef, OnChanges, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { items } from 'src/app/interfaces/items.interface';
import { videos } from 'src/app/interfaces/videos.interface';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { UserService } from 'src/app/services/user.service';
import { YoutubeApiService } from 'src/app/services/youtube-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private YTapi : YoutubeApiService ,
    private ms : MenuService ,
    private us : UserService ,
    ) { }
  searchValue?:any = 'coding'
  isReached = false
  isCook= 'cook'
  @ViewChild('lastSpan') spans? : HTMLElement | any
  // @ViewChild('btnOpenMenu') btnMenu? : HTMLElement | any
  explorVideos?:videos[]
  showFiller? = true
  
  items? : items[]
  // change accound of api key


  ngOnInit(): void {
    this.YTapi.RapidApiYT(this.searchValue).subscribe((d:any)=>  {
       this.items = d  
       console.log(d , "selected vid");
       
      // console.log(this.items);
      
    })

    this.us.getExploreVideos().subscribe((d:any)=>{
      // console.log(d , "this us data")
      this.explorVideos = d
    })

        
  }


  categoriesScrolling(value : HTMLElement){
    if(value.scrollLeft >= 1) this.isReached = true      
     else this.isReached = false
  }

  scrollForMobile(value : HTMLElement){
    value.scrollTo(300,0)
  }

  selectSuggest(value:HTMLElement){
    this.YTapi.RapidApiYT(value.innerHTML).subscribe((d:any)=>  {
      this.items = d       
   } , error => console.log(error) , ()=>console.log("Loding is Finech"))

   let sapns =  this.spans?.nativeElement.querySelectorAll('span')
   for (let i = 0; i < sapns.length; i++) {
    sapns[i].classList.remove('active')
   }
   value.classList.add('active')
  // console.log(value.innerHTML);

  }


}
