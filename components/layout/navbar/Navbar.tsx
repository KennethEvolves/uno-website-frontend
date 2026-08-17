import Link from "next/link";
import Image from "next/image";
import { getNavbar } from "@/lib/layout/navbar/navbar.service";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

export default async function Navbar() {
  const navbarData = await getNavbar();

  if (!navbarData) {
    return (
      <header className="fixed top-0 left-0 w-full h-20 bg-white shadow-sm z-50" />
    );
  }

  const { mainLogo, governmentLogo, mainMenu } = navbarData;

  return (
    <section className="fixed top-0 left-0 z-50 w-full flex flex-col bg-white shadow-sm">
      <div className="relative px-4 md:px-8 lg:px-10 h-20 flex items-center justify-between w-full">
        <Link href="/" className="shrink-0 z-50">
          <Image
            src={mainLogo.url}
            alt={mainLogo.alternativeText}
            width={110}
            height={50}
            className="object-contain"
            priority
            unoptimized
          />
        </Link>

        <div className="hidden lg:flex flex-1 justify-center">
          <DesktopMenu items={mainMenu} />
        </div>

        <div className="flex items-center gap-4 lg:gap-6 z-50">
          {governmentLogo && (
            <Link
              href={"https://www.yucatan.gob.mx/"}
              className="hidden xl:block"
            >
              <Image
                src={governmentLogo.url}
                alt={governmentLogo.alternativeText}
                width={200}
                height={50}
                className="object-contain h-auto"
                unoptimized
              />
            </Link>
          )}

          <MobileMenu mainMenu={mainMenu} />
        </div>
      </div>
    </section>
  );
}
