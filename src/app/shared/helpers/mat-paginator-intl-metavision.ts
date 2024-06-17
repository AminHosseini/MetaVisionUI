import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class MatPaginatorIntlMetavision extends MatPaginatorIntl {
  override itemsPerPageLabel: string = 'تعداد رکورد برای نمایش:';
  override nextPageLabel: string = 'صفحه بعدی';
  override previousPageLabel: string = 'صفحه قبلی';
  override lastPageLabel: string = 'برو به صفحه آخر';
  override firstPageLabel: string = 'برو به صفحه اول';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    const firstRecordIndex: number = 0;
    if (length === 0 || pageSize === 0) {
      return '0 از ' + length;
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return startIndex + 1 + ' تا ' + endIndex + ' از ' + length;
  };
}
