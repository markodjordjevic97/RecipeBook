import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../recipe.model';

@Pipe({
  name: 'searchText',
  pure: false
})
export class SearchTextPipe implements PipeTransform {

  transform(value: Recipe[], searchText: string): any {
    if(value.length === 0 || searchText === ''){
      return value;
    }
    let searchArray: Recipe[] = [];
    for(let item of value){
      if(item.name.toLowerCase().includes(searchText.toLowerCase())) {
        searchArray.push(item);
      }
    }
    return searchArray;
  }

}
