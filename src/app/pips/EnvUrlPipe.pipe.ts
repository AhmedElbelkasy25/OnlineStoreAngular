import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Pipe({
  name: 'EnvUrlPipe',
})
export class EnvUrlPipePipe implements PipeTransform {
  transform(fileName: string): string {
    return `${environment.imagefolder}/${fileName}`;
  }
}
