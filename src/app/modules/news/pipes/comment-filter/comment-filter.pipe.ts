import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'commentFilter'
})
export class CommentFilterPipe implements PipeTransform {
    transform(value: any) {
        return value.replace(new RegExp('Andouille'), '*$ù^"@&-"');
    }
}
