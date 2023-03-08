import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RulesComponent } from './components/rules/rules.component';


const routes: Routes = [
  { path: '**', component: RulesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }