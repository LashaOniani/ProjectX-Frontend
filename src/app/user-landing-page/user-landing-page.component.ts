import { Component } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-landing-page',
  imports: [RouterLink],
  templateUrl: './user-landing-page.component.html',
  styleUrl: './user-landing-page.component.scss'
})
export class UserLandingPageComponent {
  userName !: any

  constructor(private rout : ActivatedRoute){}

  ngOnInit() : void {
    let tokenStorage = localStorage.getItem("Token")

    if(tokenStorage){
      let parsed = JSON.parse(tokenStorage)
      let timeNow = new Date().getTime();
      
      if(timeNow > parsed.expDate){
        localStorage.clear();
        console.log("სესიის დრო ამოიწურა")
      }
    }
  }
  
}
