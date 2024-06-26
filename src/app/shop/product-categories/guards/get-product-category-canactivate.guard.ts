import { CanActivateFn } from '@angular/router';

export const getProductCategoryCanactivateGuard: CanActivateFn = (
  route,
  state,
) => {
  const id = route.params['id'];
  return !isNaN(id) && id > 0;
};
