import { Routes } from '@angular/router';
import { UserLandingPageComponent } from './user-landing-page/user-landing-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './Components/about/about.component';
import { AboutMatrixComponent } from './Components/about-matrix/about-matrix.component';
import { AboutSponsorsComponent } from './Components/about-sponsors/about-sponsors.component';
import { MatrixComponent } from './Components/matrix/matrix.component';
import { authGuardGuard as authGuard } from './guards/auth-guard.guard';
import { QuizzbuilderComponent } from './Components/Quizzer/quizzbuilder/quizzbuilder.component';
import { MainComponent } from './Components/userPage/main/main/main.component';
import { ClassManagmentComponent } from './Components/userPage/main/class-managment/class-managment.component';

export const routes: Routes = [
    {path: '', component: UserLandingPageComponent},

    {path: 'Login', component: MatrixComponent},
    // Dynamic Routing
    // {path: 'user/:user  name', component: UserLandingPageComponent},

    // nested Routing
    {   path: 'about', 
        title: 'About', 
        component: AboutComponent,
        children: [
            {
                path: 'matrix',
                title: 'About Matrix',
                component: AboutMatrixComponent
            },
            {
                path: 'sponsors',
                title: 'Matrix Sponsors',
                component: AboutSponsorsComponent
            }
        ]
    },
    
    {
        path: 'user',
        title: 'My Page',
        component: MainComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'managment',
                title: 'Class Managment',
                component: ClassManagmentComponent
            }
        ]
    },

    {
        path: 'quzzer',
        title: 'quizz maker',
        component: QuizzbuilderComponent
    },

    {path: '**', component: PageNotFoundComponent}
];
