import { CardModel } from "../shared";

export interface ProgramSectionModel {
  title: string;
  programCards: CardModel[];
}

export interface HomeModel {
  sections: ProgramSectionModel[];
}
