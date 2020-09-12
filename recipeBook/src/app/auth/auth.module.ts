import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthRoutingModule} from "./auth-routing.module";
import {CommonModule} from "@angular/common";
import {AngularMaterial} from "../angular.material";
import {AuthComponent} from "./auth.component";


@NgModule({
  declarations: [AuthComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        AngularMaterial,
    ]
})

export class AuthModule {

}
