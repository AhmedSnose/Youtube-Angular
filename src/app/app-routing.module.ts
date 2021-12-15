import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateChannelComponent } from './components/create-channel/create-channel.component';
import { CreateExploreComponent } from './components/create-explore/create-explore.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchComponent } from './components/search/search.component';
import { SignupComponent } from './components/signup/signup.component';
import { ExploreComponent } from './explore/explore.component';
import { AuthGuard } from './services/guards/auth.guard';
//   {path:'search' , loadChildren: ()=> import('./components/search/search.component').then(m=>m.SearchComponent)}

const routes: Routes = [
  {path: '' , component:HomeComponent , data:{index:0}},
  {path:'search' ,component:SearchComponent , data:{index:1}},
  {path:'login' ,component:LoginComponent ,data:{index:0}},
  {path:'signup' , component:SignupComponent} , 
  {path:'create-explore' , component:CreateExploreComponent , canActivate:[AuthGuard]  } , 
  {path:'explore' , component:ExploreComponent ,data:{index:1}} , 
  {path:'explore/:id' , component:ExploreComponent ,data:{index:1}} , 
  {path:'create-channel' , component:CreateChannelComponent , canActivate:[AuthGuard] } , 

  // {path:'admin' , component:GoodsComponent , canActivate:[AuthGuard] , data:{index:1}} , 
  {path:'**' , component:NotFoundComponent} , 

];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class appRoutingModule { }
