import { Component } from '@angular/core';
import { CategoriesService } from '../../../../Services/categories.service';
import { facultyModel } from '../../../../interfaces/Models/facultyModel';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { groupForm } from '../../../../interfaces/FormModels/groupForm';
import { UserService } from '../../../../Services/user.service';
import { Chip } from 'primeng/chip';
import { personModel } from '../../../../interfaces/Models/personModel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-class-managment',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, Chip, ButtonModule],
  templateUrl: './class-managment.component.html',
  styleUrl: './class-managment.component.scss'
})
export class ClassManagmentComponent {
  groupFormDisplayState : boolean = false;
  addPeopleDisplayState : boolean = false;
  
  groupForm : FormGroup;
  faculties : facultyModel[] = []

  nameToFind : string = ''
  groupToFind : string = ''
  peopleArr : personModel[] = []

  constructor(private categoryService : CategoriesService, private fb : FormBuilder, private userService : UserService){
    this.groupForm = this.fb.group({
      groupNumber : ['', [Validators.required, Validators.maxLength(4)]],
      groupDegree : ['საფეხური', Validators.required],
      groupFaculty : ['ფაკულტეტი', Validators.required]
    })
  }

  ngOnInit() : void {
    this.categoryService.get_categories().subscribe(res => this.faculties = res)
  }

  createGroup() : void {
    let tempForm : groupForm = this.groupForm.value
    
    if(this.groupForm.valid && (tempForm.groupFaculty !== "ფაკულტეტი" && tempForm.groupDegree !== "საფეხური")){
      let tempObj = {
        groupNumber : '',
        groupDescription : tempForm.groupFaculty + " " + tempForm.groupDegree
      }
      // console.log(this.groupForm.value)
  
      if(tempForm.groupDegree === "დოქტორანტურა"){tempObj.groupNumber = "D-"}
      else if(tempForm.groupDegree === "მაგისტრატურა"){tempObj.groupNumber = "M-"}
      else if(tempForm.groupDegree === "ბაკალავრიატი"){tempObj.groupNumber = "B-"}
  
      tempObj.groupNumber += tempForm.groupNumber
      console.log(tempObj)
  
      this.groupForm.reset()
    }
  }

  findPeople() : void {
    if(this.nameToFind.length){
      this.userService.getUserByFullName(this.nameToFind).subscribe(res => {
        this.peopleArr = res
        console.log(res)
        console.log(this.peopleArr.length)
      })
    }else{
      this.nameToFind = ''
      this.peopleArr = []
    }
  }

  findGroup() : void {
    console.log(this.groupToFind)
  }
  changeDisplayState(formName : string) : void {
    if(formName === "group"){
      this.groupFormDisplayState = !this.groupFormDisplayState
      this.addPeopleDisplayState = false
    }else if (formName === "addPeople"){
      this.addPeopleDisplayState = !this.addPeopleDisplayState
      this.groupFormDisplayState = false
    }
  }

}
