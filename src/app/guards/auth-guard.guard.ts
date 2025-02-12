import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGuardGuard: CanActivateFn = (
  route : ActivatedRouteSnapshot, state : RouterStateSnapshot
) => {
  let tokenStorage = localStorage.getItem("Token")
  let timeNow = new Date().getTime();
  let storageState = false

  if(tokenStorage) {
    let parsed = JSON.parse(tokenStorage)
      if(timeNow > parsed.expDate){
        localStorage.clear();
        storageState = false
      }else{
        storageState = true
      }
  }

  const router : Router = inject(Router);
  const protectedRoutes : string[] = ['/user'];
  return protectedRoutes.includes (state.url) && storageState? true : router.navigate(["/"])
};
