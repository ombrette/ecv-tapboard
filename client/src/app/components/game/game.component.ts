import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  score: number
  onclick: boolean

  constructor(private http: Http, private router: Router) {
    this.onclick = false;
    this.score = 0
  }

  saveScore = () => {
    const token = localStorage.getItem('token');
    var user = localStorage.getItem('user');

    const headers = new Headers({'Authorization': token});
    const options = new RequestOptions({ headers: headers });

    this.http.post('http://localhost:8080/api/tap', {
      score: this.score,
      user
    }, options)
    .toPromise()
    .then((user: any) => {
      this.router.navigate(['tap']);
    });
  }


  ngOnInit() {
  }

}
