import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    // update current photo
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login(){
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('logged in successfuly');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn(){
    // const token = localStorage.getItem('token');
    // return !!token;
    return this.authService.loggedIn();
  }
  logout(){
    localStorage.removeItem('token');
    this.authService.decodedToken = null;

    // remove user info for photo on nav when logout
    localStorage.removeItem('user');
    this.authService.currentUser = null;

    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

}
