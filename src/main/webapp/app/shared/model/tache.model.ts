import { IProjet } from 'app/shared/model/projet.model';
import { IImputation } from 'app/shared/model/imputation.model';

export interface ITache {
  id?: number;
  label?: string;
  artefact?: number;
  projet?: IProjet;
  imputations?: IImputation[];
}

export class Tache implements ITache {
  constructor(
    public id?: number,
    public label?: string,
    public artefact?: number,
    public projet?: IProjet,
    public imputations?: IImputation[]
  ) {}
}
