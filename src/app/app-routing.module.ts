import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { HomeComponent } from '@app/home/home.component';
import { PropertyDetailComponent } from '@app/property-detail/property-detail.component';
import { AddAssetComponent } from '@app/add-asset/add-asset.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule) },
    { path: 'home', component: HomeComponent },
    { path: 'property_detail/:id', component: PropertyDetailComponent },
    { path: 'add-asset', component: AddAssetComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
  ]),
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
