import { ChangeDetectorRef, Component, effect, inject, PLATFORM_ID } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../../../Services/user.service';
import { ChartModule } from 'primeng/chart';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { personModel } from '../../../../interfaces/Models/personModel';

@Component({
  selector: 'app-main',
  imports: [ButtonModule, ChartModule, RouterOutlet, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

constructor(private userService : UserService, private cd: ChangeDetectorRef, private rout : Router){}
  user : string = "გამარჯობა ლაშა"
  greeting : string = ""
  
  userObj ?: personModel
  displayState : boolean = true

  ngOnInit() : void {
    this.initChart();

    let tokenStorage = localStorage.getItem("Token")

    if(tokenStorage){
      let parsed = JSON.parse(tokenStorage)
      this.userService.token = parsed.token
    }else{
        // this.rout.navigate(['/'])
    }

    this.userService.getAuthUser().subscribe({
      next : (res) => {
        this.userObj = res
        console.log(res)
      },
      error(err) {
        console.error(err)
      },
    })
  }

   data: any;

    options: any;

    platformId = inject(PLATFORM_ID);
    // themeEffect = effect(() => {
    //     if (this.configService.transitionComplete()) {
    //         if (this.designerService.preset()) {
    //             this.initChart();
    //         }
    //     }
    // });

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');

            this.data = {
                labels: ['HTML', 'CSS', 'Javascript', 'SQL', 'C#'],
                datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: 'rgba(12, 216, 12, 0.23)',
                        borderColor: documentStyle.getPropertyValue('--p-green-500'),
                        pointBackgroundColor: documentStyle.getPropertyValue('--p-green-500'),
                        pointBorderColor: documentStyle.getPropertyValue('--p-green-500'),
                        pointHoverBackgroundColor: textColor,
                        pointHoverBorderColor: documentStyle.getPropertyValue('--p-green-500'),
                        data: [80, 70, 90, 81, 76]
                    }
                    // {
                    //     label: 'My Second dataset',
                    //     borderColor: documentStyle.getPropertyValue('--p-cyan-400'),
                    //     pointBackgroundColor: documentStyle.getPropertyValue('--p-cyan-400'),
                    //     pointBorderColor: documentStyle.getPropertyValue('--p-cyan-400'),
                    //     pointHoverBackgroundColor: textColor,
                    //     pointHoverBorderColor: documentStyle.getPropertyValue('--p-cyan-400'),
                    //     data: [28, 48, 40, 19, 96, 27, 100]
                    // }
                ]
            };

            this.options = {
                plugins: {
                    legend: {
                        labels: {
                            color: "red"
                        }
                    }
                },
                scales: {
                    r: {
                        grid: {
                            color: "green",
                        },
                        min: 0,
                        max: 100,
                        backgroundColor: "black",
                    }
                }
            };
        }
        this.cd.markForCheck()
        
    }

    i = 0

    greetUser() : void {
        this.user = "Lasha"
    }

    myInterval = setInterval(() => {
        if(this.i === this.user.length){
            // console.log("I am here")
            clearInterval(this.myInterval)
        }else{
            // console.log(this.user[this.i])
            this.greeting += this.user[this.i]
            this.i++
        }
        }, 200);
        
    routTo(routingPage: string) : void {

      this.rout.navigate([`/user/${routingPage}`])
      if(routingPage){
          this.displayState = false
      }else{
        this.displayState = true
      }

    }

}
