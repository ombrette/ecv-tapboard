/* 
  Imports 
*/
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})


/* 
  Export Class 
*/
export class LoginComponent implements OnInit {

  public formData = {
    email: undefined,
    password: undefined
  }
  public formError = undefined;

  // Use the constructor to add needed values
  constructor(private http: Http, private router: Router) {
    this.formData = { 
      email: undefined, 
      password: undefined,
    };

    this.formError = { 
      email: {
        error: false,
        message: undefined
      },
      password: {
        error: false,
        message: undefined
      }
    };
  };

  // Catch the submit form event
  public catchSubmit = () => {
    // Check email
    if( this.formData.email === undefined || this.formData.email.length == 0 ) { 
      this.formError.email.error = true; 
      this.formError.email.message = `Email is needed`; 
    }else{
      this.formError.email.error = false;
      this.formError.email.message = ``;
    }

    // Check password
    if( this.formData.password === undefined || this.formData.password.length == 0 ) { 
      this.formError.password.error = true; 
      this.formError.password.message = `Password is needed`; 
    }else{
      this.formError.password.error = false;
      this.formError.password.message = ``;
    }
    
    // Emit sendformData event when form is validated
    if( this.formError.email.error === false && this.formError.password.error === false ){
       this.login(this.formData.email, this.formData.password)
    }
  };

  // OnInit is not used in this compoenent
  ngOnInit() {};

  login(email: string, password: string) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    this.http.post('http://localhost:8080/api/signin', {
      email,
      password
    })
    .toPromise()
    .then((user: any) => {
      user = JSON.parse(user._body);
      localStorage.setItem('token', user.token)
      localStorage.setItem('user', user.username)
      this.router.navigate(['me']);
    });
  }
};