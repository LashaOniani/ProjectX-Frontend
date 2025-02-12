import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { SignUpDto } from '../../interfaces/Dtos/signUpDto';
import { loginRequestDto } from '../../interfaces/Dtos/loginRequestDto';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  myForm: FormGroup;
  signUpForm: FormGroup;

  @Input() displaySignUp: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService) {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      userName: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required]
    })
  }

  login() {
    let tempForm : loginRequestDto = this.myForm.value;
    if (!this.displaySignUp) {
      
      this.userService.authenticate(tempForm).subscribe({
        next : (res) => {

          let tempTime = new Date();
          tempTime.setMinutes(tempTime.getMinutes() + 10);
          let time = tempTime.getTime();
          
          let tempObjToPush = {token: res.accessToken, expDate: time}

          this.userService.token = res.accessToken
          localStorage.setItem("Token", JSON.stringify(tempObjToPush))

          this.router.navigate(['user'])
        },
        error : (err) => {
          console.error('Error:', err)
        }
      })
    }
  }

  save() {
    let tempForm : SignUpDto = this.signUpForm.value;
    if (this.displaySignUp) {
      console.log(tempForm)
      this.userService.signUpUser(tempForm).subscribe();
      // console.log(this.signUpForm.value)
    }
  }


}
