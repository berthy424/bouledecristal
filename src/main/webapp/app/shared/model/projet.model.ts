import { IClient } from 'app/shared/model/client.model';
import { ITache } from 'app/shared/model/tache.model';

export interface IProjet {
  id?: number;
  annee?: number;
  compte?: number;
  client?: IClient;
  taches?: ITache[];
}

export class Projet implements IProjet {
  constructor(public id?: number, public annee?: number, public compte?: number, public client?: IClient, public taches?: ITache[]) {}
}
