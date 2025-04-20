import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FileTreeComponent } from './file-tree/file-tree.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'files', component: FileTreeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
