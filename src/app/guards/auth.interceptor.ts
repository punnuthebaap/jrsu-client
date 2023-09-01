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
    constructor(private route: Router){}
     intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('intercepting every req');
        return next.handle(req)
        .pipe(
            tap(event => {
                if (event instanceof HttpResponse){
                    console.log("badhiyan")
                    }
                }, error => {
                    if(error.status === 403){
                        alert("Token Expired, logging out");
                        this.route.navigate(['login']);
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