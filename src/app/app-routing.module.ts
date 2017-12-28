import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
    ], {initialNavigation: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

