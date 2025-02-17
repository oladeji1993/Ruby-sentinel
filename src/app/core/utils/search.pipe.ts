import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchValue: string): any[] {
    if (!value || !Array.isArray(value)) {
      return []; // Return empty array if input is not valid
    }

    if (!searchValue) {
      return value; // Return original array if no search value is provided
    }

    const lowerCaseSearchValue = searchValue.toLowerCase();

    return value.filter((v: any) => {
      const name = v.name?.toLowerCase() || '';
      const code = v.code?.toLowerCase() || '';
      const sender = v.sender?.toLowerCase() || '';
      const recepientBank = v.recepientBank?.toLowerCase() || '';
      const description = v.description?.toLowerCase() || '';

      return (
        name.indexOf(lowerCaseSearchValue) > -1 ||
        code.indexOf(lowerCaseSearchValue) > -1 ||
        sender.indexOf(lowerCaseSearchValue) > -1 ||
        description.indexOf(lowerCaseSearchValue) > -1 ||
        recepientBank.indexOf(lowerCaseSearchValue) > -1

      );
    });
  }
}
