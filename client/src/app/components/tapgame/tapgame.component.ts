import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';

import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-tapgame',
  templateUrl: './tapgame.component.html',
  styleUrls: ['./tapgame.component.css']
})
export class TapgameComponent implements OnInit {

  constructor(private http: Http, private router: Router) {
    if(!localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  logout = () => {
    localStorage.removeItem('token')
    this.router.navigate((['']))
  }
}
