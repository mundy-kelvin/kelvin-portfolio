import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'age', standalone: true, pure: false })
export class AgePipe implements PipeTransform {
  transform(birthdate: string): number {
    return new Date(new Date().getTime() - new Date(birthdate).getTime()).getFullYear() - 1970;
  }
}
