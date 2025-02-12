import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Letter } from '../../interfaces/letter';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-each-dropdown',
  imports: [CommonModule],
  templateUrl: './each-dropdown.component.html',
  styleUrl: './each-dropdown.component.scss'
})
export class EachDropdownComponent {
  @Input() text: string = ''
  startPoint: number = this.getRandomNumber();

  newNumber = 1
  emptyArr: Array<Letter> = []
  timing = 100

  ngOnInit() {
    this.startPoint = this.getRandomNumber();
    this.starter();
  }

  starter() {
    setInterval(() => {

      if (this.startPoint >= 0 && this.startPoint < this.text.length) {

        if (this.text[this.startPoint] !== " ") {

          let tempObj = {
            letter: this.text[this.startPoint],
            color: 'green',
            opacity: this.calculateOpacity(this.startPoint)
          }

          this.emptyArr.unshift(tempObj)

          this.startPoint++
          if (this.text[this.startPoint] === " ") this.timing = 0

        } else this.startPoint++
      }
      if (this.startPoint === this.text.length) {
        this.clearIn()
      }
    }, this.timing)
  }

  clearIn() {
    // this.emptyArr = []
    while (this.emptyArr.length > 40) {
      this.emptyArr.pop();
    }
    // console.log(this.emptyArr.length)
    this.startPoint = 0
  }

  calculateOpacity(number: number) {
    let textLength = this.text.length
    let opacity = 100

    for (let i = 1; i < textLength; i++) {
      if (i - 1 === number && number === 0) {
        opacity = 100
      } else if (i - 1 === number && number === textLength) {
        opacity = 30
      } else {
        if (i - 1 === number) {
          let leftNumber = textLength - i
          opacity = (leftNumber / textLength) * 100
        }
      }
    }

    return opacity
  }

  getRandomNumber(): number {
    let randomNum = Math.floor(Math.random() * this.text.length)

    return randomNum + 1
  }

}
