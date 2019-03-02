import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  login() {
    console.log('Tentative de connexion');

    // Vérifier que login/mdp sont correctes, par exemple par une requête à un service REST
    localStorage.setItem('user', JSON.stringify({login : this.model.username}));
    this.router.navigate(['/home']);
  }
}