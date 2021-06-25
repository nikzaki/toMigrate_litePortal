import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'topar'
})
export class ToparPipe implements PipeTransform {
    transform(value: number, args?: any): any {
        if (value > 0) {
            return "+" + value;
        } else {
            return value;
        }
    }
}
