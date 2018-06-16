import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  login: boolean;
  register: boolean;

  constructor(private router: Router) {
    this.login = true
    this.register = false
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('user'));

    if (token) this.router.navigate((['me']));
  }

}
