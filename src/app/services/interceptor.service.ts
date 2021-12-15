import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoaderService} from './loader.service'
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements  HttpInterceptor {

  constructor(
  public ls : LoaderService ,
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.ls.isLoading.next(true)

    return next.handle(req).pipe(
      finalize(
        ()=>{
          this.ls.isLoading.next(false)

        }
      )

    )
  }
}
