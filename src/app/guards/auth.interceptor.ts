import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StateService } from '../service/state.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {
    constructor(private route: Router, private stateService:StateService){}
     intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req)
        .pipe(
            tap(event => {
                if (event instanceof HttpResponse){
                    console.log("Intercepting HTTP request by the punnu__")
                    }
                }, error => {
                    if(error.status === 403){
                        alert("Token Expired, logging out");
                        this.stateService.removeState();
                    }
                    if(error.status === 404){
                        this.route.navigate(['404']);
                    }
                    if(error.status === 500){
                        this.route.navigate(['500']);
                    }
                }
            )
        );
    }
}