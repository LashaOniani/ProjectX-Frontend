import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { empty, timeInterval } from 'rxjs';
import { Letter } from '../../interfaces/letter';
import { EachDropdownComponent } from "../each-dropdown/each-dropdown.component";
import { LoginComponent } from "../login/login.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matrix',
  imports: [CommonModule, EachDropdownComponent, LoginComponent],
  templateUrl: './matrix.component.html',
  styleUrl: './matrix.component.scss'
})
export class MatrixComponent {

  text : string = 'სუშის რეცეპტი'
  screenWidth : number = (window.innerWidth / 50)
  timesToRepeat: number[] = new Array(Number(this.screenWidth.toFixed()));

  displayPage !: any
  displayRegistration : boolean = false;

  constructor(public rout : ActivatedRoute){

  }

  ngOnInit(){
  //   this.rout.paramMap.subscribe((res) => {
  //     this.pageId = res.get('id');
  //     console.log(this.pageId);
  //   })
  this.rout.queryParamMap.subscribe((res) => {
    this.displayPage = res.get('enable');
    if(this.displayPage === "true"){
      console.log('routing is starting')
      this.displayRegistration = true
    }else{
      this.displayRegistration = false
    }
    // console.log(res.get('enable'))
  })
    // console.log(this.username);
  }

  getRandomNumber() : number{
    let randomNum = Math.floor(Math.random() * this.text.length)
    // console.clear()
    return randomNum - 1
  }
}