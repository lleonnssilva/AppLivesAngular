import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LiveFormDialogComponent } from './views/home/lives/live-add-dialog/live-form-dialog.component';
import { LivesComponent } from './views/home/lives/lives.component';


const routes: Routes = [


  
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'lives', component: LivesComponent },
      // { path: 'edit/:id', component: TaskFormComponent },
    ],
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
