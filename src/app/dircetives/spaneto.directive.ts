import { Directive ,  ElementRef , Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appSpaneto]',
})
export class SpanetoDirective implements OnInit {
  @Input() isReached?: any;

  constructor(private el : ElementRef , private render : Renderer2) {
     this.el.nativeElement.style.color='red'
}

   ngOnInit(){

    // console.log(this.isReached);

    if(this.isReached === true) {
      // this.el  .nativeElement.classList.add('arrow')
      this.render.addClass(this.el.nativeElement,'arrow')
    }

   }

}
