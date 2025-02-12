import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { empty, isEmpty } from 'rxjs';

@Component({
  selector: 'app-each-quizz',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './each-quizz.component.html',
  styleUrl: './each-quizz.component.scss'
})
export class EachQuizzComponent {

isValid : boolean = false;
quizzbuilder : FormGroup;

constructor(private fb: FormBuilder){
  this.quizzbuilder = this.fb.group({
    question: ['', Validators.required],
    answer1: ['', Validators.required],
    answer2: ['', Validators.required],
    answer3: ['', Validators.required],
    answer4: ['', Validators.required],
    is_correct: ['', Validators.required]
  })
}

save() : void {
  if(this.isValid){
    let question = this.quizzbuilder.value.question
    let answer1 = {answer: this.quizzbuilder.value.answer1, is_correct: false}
    let answer2 = {answer: this.quizzbuilder.value.answer2, is_correct: false}
    let answer3 = {answer: this.quizzbuilder.value.answer3, is_correct: false}
    let answer4 = {answer: this.quizzbuilder.value.answer4, is_correct: false}
    
    let trueAnswer = this.quizzbuilder.value.is_correct
    
    if(trueAnswer === "answer1"){
      answer1 = {...answer1, is_correct: true}
    }else if(trueAnswer === "answer2"){
      answer2 = {...answer2, is_correct: true}
    }else if(trueAnswer === "answer3"){
      answer3 = {...answer3, is_correct: true}
    }else if(trueAnswer === "answer4"){
      answer4 = {...answer4, is_correct: true}
    }
    
    let tempObj = {
      question: question,
      answers: [
        answer1,
        answer2,
        ...(answer3.answer.length ? [answer3] : []),
        ...(answer4.answer.length ? [answer4] : []) 
      ]
    };
    console.log(tempObj)
  }else{
    alert("Question Form is not valid!")
  }
}

check() : void{
  let answer1 : string = this.quizzbuilder.value.answer1
  let answer2 : string = this.quizzbuilder.value.answer2
  let answer3 : string = this.quizzbuilder.value.answer3
  let answer4 : string = this.quizzbuilder.value.answer4
  let trueAnswer : string = this.quizzbuilder.value.is_correct

  if(answer1.length && answer2.length && trueAnswer.length){
    if(trueAnswer === "answer1" || trueAnswer  === "answer2"){
      this.isValid = true
    }else{
      if(answer3.length && trueAnswer === "answer3"){
        this.isValid = true
      }else if(answer4.length && trueAnswer === "answer4"){
        this.isValid = true
      }else{
        this.isValid = false
      }
    }
  }

}
}
