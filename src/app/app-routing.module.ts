import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { PropertyDetailComponent } from '@app/property-detail/property-detail.component';
import { HomeComponent } from '@app/home/home.component';
import { AddAssetComponent } from '@app/add-asset/add-asset.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule) }]),
  // Fallback when no prior route is matched
  { path: 'home', component: HomeComponent },
  { path: 'add-asset', component: AddAssetComponent },
  { path: 'property_detail/:id', component: PropertyDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
