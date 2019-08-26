import { Moment } from 'moment';
import { ITache } from 'app/shared/model/tache.model';

export interface IImputation {
  id?: number;
  date?: Moment;
  valeur?: number;
  isReal?: boolean;
  isFigee?: boolean;
  isRegularisation?: boolean;
  tache?: ITache;
}

export class Imputation implements IImputation {
  constructor(
    public id?: number,
    public date?: Moment,
    public valeur?: number,
    public isReal?: boolean,
    public isFigee?: boolean,
    public isRegularisation?: boolean,
    public tache?: ITache
  ) {
    this.isReal = this.isReal || false;
    this.isFigee = this.isFigee || false;
    this.isRegularisation = this.isRegularisation || false;
  }
}
