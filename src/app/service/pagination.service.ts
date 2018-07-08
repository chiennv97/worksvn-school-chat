import { Injectable } from '@angular/core';

@Injectable()
export class PaginationService {
  // create request to server
  sortBy = 'createdDate';
  sortType = 'desc';
  pageIndex = '0';
  pageSize = '10';
  pageNum = 1;
  constructor() { }

}
