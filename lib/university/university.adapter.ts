import { adaptPageHeader } from "../academic/academics.adapter";
import { TextItemDTO } from "../programs/program.dto";
import { adaptImage } from "../shared/data.adapter";
import type {
  AboutUsDTO,
  DepartmentDTO,
  RectorDTO,
  StaffMemberDTO,
} from "./university.dto";
import type {
  AboutUsModel,
  DepartmentModel,
  RectorModel,
  StaffMemberModel,
} from "./university.model";

const adaptStaffMember = (dto: StaffMemberDTO): StaffMemberModel => ({
  fullName: dto?.fullName || "",
  role: dto?.role || "",
  email: dto?.email || "",
});

const adaptDepartment = (dto: DepartmentDTO): DepartmentModel => ({
  order: dto?.order || 0,
  name: dto?.name || "",
  staffMembers: dto?.staff_members?.map(adaptStaffMember) || [],
});

const adaptRector = (dto: RectorDTO): RectorModel => ({
  fullName: dto?.fullName || "",
  biography: dto?.biography || "",
  period: dto?.period || "",
  photo: adaptImage(dto?.photo),
});

const adaptTextItems = (items: TextItemDTO[]): string[] => {
  return items?.map((i) => i.item) || [];
};

export const aboutUsAdapter = (dto?: AboutUsDTO): AboutUsModel => {
  if (!dto) {
    return {
      header: {
        subtitle: "",
        title: "",
        description: "",
        backgroundImage: adaptImage(undefined),
      },
      missionVision: {
        mission: "",
        vision: "",
        images: {
          mission: adaptImage(undefined),
          vision: adaptImage(undefined),
        },
      },
      values: {
        title: "",
        description: "",
        values: [],
        image: adaptImage(undefined),
      },
      directory: {
        title: "",
        description: "",
        departments: [],
        background: adaptImage(undefined),
      },
      history: { title: "", content: "" },
      rectors: { title: "", description: "", rectors: [] },
    };
  }

  const { header, missionVision, values, directory, history, rectors } = dto;

  return {
    header: adaptPageHeader(header),

    missionVision: {
      mission: missionVision?.mission || "",
      vision: missionVision?.vision || "",
      images: {
        mission: adaptImage(missionVision?.imageMission),
        vision: adaptImage(missionVision?.imageVision),
      },
    },

    values: {
      title: values?.title || "",
      description: values?.description || "",
      values: adaptTextItems(values?.value),
      image: adaptImage(values?.image),
    },

    directory: {
      title: directory?.title || "",
      description: directory?.description || "",
      departments: directory?.departments?.map(adaptDepartment) || [],
      background: adaptImage(directory?.backgroundImage),
    },

    history: {
      title: history?.title || "",
      content: history?.content || "",
    },

    rectors: {
      title: rectors?.title || "",
      description: rectors?.description || "",
      rectors: rectors?.rectors?.map(adaptRector) || [],
    },
  };
};
