import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, of } from 'rxjs';

import { SelectItem } from '@gt-technical-test/libs/common';

@Injectable()
export class CategoryService {
  #http = inject(HttpClient);

  #categories: SelectItem[] = [
    {
      id: 1,
      name: 'Streaming',
    },
    {
      id: 2,
      name: 'Water',
    },
    {
      id: 3,
      name: 'Electricity',
    },
  ];

  getCategories(): Observable<SelectItem[]> {
    // return this.#http.get<SelectItem[]>('/api/categories');
    return of(this.#categories);
  }

  getCategory(categoryId: number): Observable<SelectItem | undefined> {
    // return this.#http.get<SelectItem>(`/api/categories/${id}`);
    return of(this.#categories.find((category) => category.id === categoryId));
  }

  createCategory(category: string): Observable<SelectItem> {
    // return this.#http.post<SelectItem>('/api/categories', category);
    let lastId = 0;

    this.#categories.forEach(({ id }) => {
      if (id > lastId) {
        lastId = id;
      }
    });

    this.#categories.push({ id: lastId + 1, name: category });

    return of(this.#categories[this.#categories.length - 1]);
  }

  updateCategory(categoryId: number, category: string): Observable<SelectItem> {
    // return this.#http.put<SelectItem>(
    //   `/api/categories/${categoryId}`,
    //   category
    // );
    const index = this.#categories.findIndex(({ id }) => id === categoryId);

    this.#categories[index].name = category;

    return of(this.#categories[index]);
  }

  deleteCategory(categoryId: number): Observable<number> {
    // return this.#http.delete<void>(`/api/categories/${id}`);
    const index = this.#categories.findIndex(({ id }) => id === categoryId);

    this.#categories.splice(index, 1);

    return of(categoryId);
  }
}
