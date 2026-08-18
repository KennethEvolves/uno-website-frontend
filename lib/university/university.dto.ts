import { PageHeaderDTO } from "../academic/academics.dto";
import { TextItemDTO } from "../programs/program.dto";
import { StrapiImageDTO } from "../shared";

export interface StaffMemberDTO {
  id: number;
  fullName: string;
  role: string;
  email: string;
}

export interface DepartmentDTO {
  id: number;
  order: number;
  name: string;
  staff_members: StaffMemberDTO[];
}

export interface RectorDTO {
  id: number;
  documentId?: string;
  fullName: string;
  period: string;
  biography: string;
  photo: StrapiImageDTO;
}

export interface MissionVisionDTO {
  id: number;
  mission: string;
  vision: string;
  imageMission: StrapiImageDTO;
  imageVision: StrapiImageDTO;
}

export interface ValuesDTO {
  id: number;
  title: string;
  description: string;
  value: TextItemDTO[];
  image: StrapiImageDTO;
}

export interface DirectoryDTO {
  id: number;
  title: string;
  description: string;
  departments: DepartmentDTO[];
  backgroundImage: StrapiImageDTO;
}

export interface HistoryDTO {
  id: number;
  title: string;
  content: string;
}

export interface RectorsDTO {
  id: number;
  title: string;
  description: string;
  rectors: RectorDTO[];
}

export interface AboutUsDTO {
  id: number;
  documentId: string;
  header: PageHeaderDTO;
  missionVision: MissionVisionDTO;
  values: ValuesDTO;
  directory: DirectoryDTO;
  history: HistoryDTO;
  rectors: RectorsDTO;
}
