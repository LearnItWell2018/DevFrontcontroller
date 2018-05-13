import { Component } from '@angular/core';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

 public edited = false;

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
    if(!auth.isAuthenticated()) {
      localStorage.removeItem("user_info");
    }
  }

  loginOwner(e) {
    let pass = e.target.elements[0].value;
    if ("vishudhi" === pass) {
      this.edited = true;
    }
  }

}

