import { PageHeaderModel } from "../shared/model";
import { ProgramSectionModel } from "../home/home.model";

export interface AcademicsPageModel {
  header: PageHeaderModel;
  sections: ProgramSectionModel[];
}
