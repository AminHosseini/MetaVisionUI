import { CanActivateFn } from '@angular/router';

export const pictureCanactivateGuard: CanActivateFn = (route, state) => {
  const id = route.params['id'];
  const parentId = route.queryParams['parentId'];
  const pictureType = route.queryParams['pictureType'];
  return (
    !isNaN(id) &&
    id > 0 &&
    !isNaN(parentId) &&
    parentId > 0 &&
    !isNaN(pictureType) &&
    pictureType > 0
  );
};
