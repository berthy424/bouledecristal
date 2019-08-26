import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IImputation } from 'app/shared/model/imputation.model';

type EntityResponseType = HttpResponse<IImputation>;
type EntityArrayResponseType = HttpResponse<IImputation[]>;

@Injectable({ providedIn: 'root' })
export class ImputationService {
  public resourceUrl = SERVER_API_URL + 'api/imputations';

  constructor(protected http: HttpClient) {}

  create(imputation: IImputation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(imputation);
    return this.http
      .post<IImputation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(imputation: IImputation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(imputation);
    return this.http
      .put<IImputation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IImputation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IImputation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(imputation: IImputation): IImputation {
    const copy: IImputation = Object.assign({}, imputation, {
      date: imputation.date != null && imputation.date.isValid() ? imputation.date.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((imputation: IImputation) => {
        imputation.date = imputation.date != null ? moment(imputation.date) : null;
      });
    }
    return res;
  }
}
