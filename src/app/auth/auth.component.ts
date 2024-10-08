import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./authService";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {

    @Output("loginSuccess") loginSuccess = new EventEmitter();

    constructor(private authService: AuthService, private router: Router){}
    isLoginMode =true;
    isLoading = false;
    error:string = null;

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }
    onSubmit(form: NgForm){
        debugger
        if(!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>

        this.isLoading = true;
        if(this.isLoginMode){
            authObs = this.authService.logIn(email,password);
        }else{
            authObs = this.authService.signUp(email, password);
        }

        authObs.subscribe(resData => {
            debugger
            this.isLoading = false;
            this.router.navigate(['/recipes']);
            },
            errorMassage => {
                console.log(errorMassage);
                this.error = 'An error occured';
                this.isLoading = false;
            }
        );
        form.reset();
    }

    onHandleError(){
        this.error = null;
    }
}