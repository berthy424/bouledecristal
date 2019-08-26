import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITache } from 'app/shared/model/tache.model';

type EntityResponseType = HttpResponse<ITache>;
type EntityArrayResponseType = HttpResponse<ITache[]>;

@Injectable({ providedIn: 'root' })
export class TacheService {
  public resourceUrl = SERVER_API_URL + 'api/taches';

  constructor(protected http: HttpClient) {}

  create(tache: ITache): Observable<EntityResponseType> {
    return this.http.post<ITache>(this.resourceUrl, tache, { observe: 'response' });
  }

  update(tache: ITache): Observable<EntityResponseType> {
    return this.http.put<ITache>(this.resourceUrl, tache, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITache>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITache[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
