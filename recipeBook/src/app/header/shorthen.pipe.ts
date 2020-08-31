import {Pipe,PipeTransform} from "@angular/core"

@Pipe({
    name: 'shorten'
})

export class Pipeline implements PipeTransform {
    transform(value: any, ...args: any[]) {
        if(value.length > args[0]){
            return value.substr(0, 6)
        }
        else
            return value;
    }

}