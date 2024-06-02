import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AllBuysService {
  constructor(private readonly httpService: HttpService) {}

  get<T>(url: string): Observable<T> {
    return this.httpService.get<T>(url).pipe(
      map((response: AxiosResponse<T>) => response.data)
    );
  }
}