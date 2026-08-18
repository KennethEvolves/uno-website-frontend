import { getHome } from "@/lib/home";
import { ProgramSection } from "@/components/home/ProgramSection";

const HomePage = async () => {
  const { sections } = await getHome();
  const ugSection = sections.find((s) => s.title === "Licenciaturas");
  const pgSection = sections.find((s) => s.title === "Posgrados");

  return (
    <>
      <div className="m-18"></div>

      {ugSection && (
        <ProgramSection
          data={ugSection}
          basePath="oferta-academica/licenciaturas"
        />
      )}

      {pgSection && (
        <ProgramSection
          data={pgSection}
          basePath="oferta-academica/posgrados"
        />
      )}
    </>
  );
};

export default HomePage;
