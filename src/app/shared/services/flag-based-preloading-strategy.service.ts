import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlagBasedPreloadingStrategyService extends PreloadingStrategy {
  /**
   * پریلود کردن روت های برنامه
   * @param route آدرس
   * @param load فانکشن کال بک
   * @returns پریلود کردن یا نکردن روت ها؟
   */
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data?.['preload'] === true ? load() : of(null);
  }
}
