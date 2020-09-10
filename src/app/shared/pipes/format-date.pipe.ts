import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string {
    return moment(value).format('DD/MM/YYYY HH:mm:ss');
  }

}
