import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-tapscores',
  templateUrl: './tapscores.component.html',
  styleUrls: ['./tapscores.component.css']
})
export class TapscoresComponent implements OnInit {

  scores: any

  constructor(private http: Http, private router: Router) {
    this.getScores();
  }
  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate((['']));
  }

  getScores = () => {
    const token = localStorage.getItem('token');

    const headers = new Headers({'Authorization': token});
    const options = new RequestOptions({ headers: headers });

    this.http.get('http://localhost:8080/api/scores', options)
    .toPromise()
    .then((scores) => {
      var results = JSON.parse(JSON.parse(JSON.stringify(scores))._body);
      this.scores = results.scores;
      console.log(results);
    });
  }


  ngOnInit() {
  }

}
