import {NgModule} from "@angular/core";
import {ShoppingService} from "./shopping-list/shopping.service";
import {RecipeServicesService} from "./recipe/recipe-services.service";
import {GalleryService} from "./hero-page/gallery.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {authInterceptorService} from "./auth/auth-interceptor.service";


@NgModule({
  providers: [ShoppingService,
    RecipeServicesService,
    GalleryService,
    {provide: HTTP_INTERCEPTORS, useClass: authInterceptorService, multi: true}]
})

export class CoreModule {

}
