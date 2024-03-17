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

  getCategory(id: number): Observable<SelectItem> {
    return this.#http.get<SelectItem>(`/api/categories/${id}`);
  }

  createCategory(category: string): Observable<SelectItem> {
    return this.#http.post<SelectItem>('/api/categories', category);
  }

  updateCategory(categoryId: number, category: string): Observable<SelectItem> {
    return this.#http.put<SelectItem>(
      `/api/categories/${categoryId}`,
      category
    );
  }

  deleteCategory(id: number): Observable<void> {
    return this.#http.delete<void>(`/api/categories/${id}`);
  }
}
