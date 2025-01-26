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
      const applicationName = v.applicationName?.toLowerCase() || '';
      const email = v.email?.toLowerCase() || '';
      const endpointName = v.name?.toLowerCase() || '';
      const endpointKeyname = v.endpointName?.toLowerCase() || '';

      return (
        applicationName.indexOf(lowerCaseSearchValue) > -1 ||
        email.indexOf(lowerCaseSearchValue) > -1 ||
        endpointName.indexOf(lowerCaseSearchValue) > -1 ||
        endpointKeyname.indexOf(lowerCaseSearchValue) > -1

      );
    });
  }
}
