import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formData = {
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    password: undefined
  }
  public formError = undefined;

  // Use the constructor to add needed values
  constructor(private http: Http, private router: Router) {
    this.formData = {
      firstname: undefined,
      lastname: undefined,
      email: undefined, 
      password: undefined,
    };

    this.formError = { 
      firstname: {
        error: false,
        message: undefined
      },
      lastname: {
        error: false,
        message: undefined
      },
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
    // Check firstname
    if( this.formData.firstname === undefined || this.formData.firstname.length == 0 ) { 
      this.formError.firstname.error = true; 
      this.formError.firstname.message = `Firstname is needed`; 
    }else{
      this.formError.firstname.error = false;
      this.formError.firstname.message = ``;
    }

    // Check lastname
    if( this.formData.lastname === undefined || this.formData.lastname.length == 0 ) { 
      this.formError.lastname.error = true; 
      this.formError.lastname.message = `Lastname is needed`; 
    }else{
      this.formError.lastname.error = false;
      this.formError.lastname.message = ``;
    }

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
    if( this.formError.firstname.error === false && this.formError.lastname.error === false && this.formError.email.error === false && this.formError.password.error === false ){
       this.register(this.formData.firstname, this.formData.lastname, this.formData.email, this.formData.password)
    }
  };

  // OnInit is not used in this compoenent
  ngOnInit() {};

  register(firstname: string, lastname: string, email: string, password: string) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    this.http.post('http://localhost:8080/api/signup', {
      firstname,
      lastname,
      email,
      password
    }, options)
    .toPromise()
    .then((user: any) => {
      localStorage.setItem('token', user.token)
      localStorage.setItem('user', JSON.stringify(user))
      this.router.navigate(['me']);
    });
  }

}
