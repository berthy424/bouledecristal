import { IProjet } from 'app/shared/model/projet.model';

export interface IClient {
  id?: number;
  label?: string;
  projets?: IProjet[];
}

export class Client implements IClient {
  constructor(public id?: number, public label?: string, public projets?: IProjet[]) {}
}
