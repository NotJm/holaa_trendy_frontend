import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const errorPageGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  const navigation = router.getCurrentNavigation();

  if(navigation?.extras.state?.['fromInterceptor']) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }

};
