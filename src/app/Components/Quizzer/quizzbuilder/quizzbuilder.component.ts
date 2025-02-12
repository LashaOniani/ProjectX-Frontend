import { CommonModule } from '@angular/common';
import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EachQuizzComponent } from "../each-quizz/each-quizz.component";

@Component({
  selector: 'app-quizzbuilder',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './quizzbuilder.component.html',
  styleUrl: './quizzbuilder.component.scss'
})
export class QuizzbuilderComponent {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  quizzInfo : FormGroup;

  info_exsist : boolean = false;

  questionCounter : number = 0;
  disableAddBtn : boolean = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private fb : FormBuilder) {
    this.quizzInfo = this.fb.group({
      quizzName: ['', Validators.required],
      quizzGroup: ['choose the group', Validators.required],
      quizzAbout: ['Question from', Validators.required],
      quizzQQuantity: ['', Validators.required]
    })
  }

  getInfo() : void{
    console.log(this.quizzInfo.value)
    this.info_exsist = true
  }

  add(): void {
    if(this.quizzInfo.value.quizzQQuantity > this.questionCounter){
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(EachQuizzComponent);
      const componentRef = this.container.createComponent(componentFactory);
      this.questionCounter++
    }else{
      this.disableAddBtn = true
      alert("თქვენ მიაღწიეთ მაქსიმალური კითხვების რაოდენობას")
    }
  }

  addAll(){
    console.log(this.container.detach)
  }
}
