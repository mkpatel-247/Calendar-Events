import { CanActivateFn } from "@angular/router";
import { getToken } from "../common/function";

export const authGuard: CanActivateFn = (route, state) => {
  return getToken() ? true : false;
};
