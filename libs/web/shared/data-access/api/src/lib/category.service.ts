import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { SelectItem } from '@gt-technical-test/libs/common';

@Injectable()
export class CategoryService {
  #http = inject(HttpClient);

  getCategories(): Observable<SelectItem[]> {
    return this.#http.get<SelectItem[]>('/api/categories');
  }
}
