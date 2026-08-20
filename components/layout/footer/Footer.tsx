import { getFooter } from "@/lib/layout/footer/footer.service";
import Image from "next/image";
import Link from "next/link";

import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import { LuMail, LuPhone, LuMapPin } from "react-icons/lu";

const getSocialIcon = (label: string) => {
  const size = 28;
  switch (label.toLowerCase()) {
    case "facebook":
      return <FaFacebookF size={size} />;
    case "youtube":
      return <FaYoutube size={size} />;
    case "instagram":
      return <FaInstagram size={size} />;
    case "tiktok":
      return <FaTiktok size={size} />;
    case "twitter":
    case "x":
      return <FaXTwitter size={size} />;
    default:
      return null;
  }
};

export default async function Footer() {
  const footerData = await getFooter();

  if (!footerData) return null;

  const {
    logo,
    mail,
    phone,
    location,
    copyright,
    socialMedia,
    aniversaryLogo,
  } = footerData;

  return (
    <footer className="flex w-full flex-col px-6 text-black 2xl:px-36">
      <div className="flex w-full flex-col items-center justify-between gap-10 py-10 lg:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-6 lg:justify-start lg:gap-8">
          {logo?.url && (
            <Link
              href="/"
              className="relative flex h-10 w-auto items-center md:h-12 lg:h-16"
            >
              <Image
                src={logo.url}
                alt={logo.alternativeText || "Logo Institucional"}
                width={300}
                height={169}
                className="h-full w-auto object-contain"
                priority
              />
            </Link>
          )}

          {aniversaryLogo?.url && (
            <div className="relative flex h-20 w-auto items-center border-l-2 border-gray-200 pl-6 md:h-24 lg:h-32 lg:pl-8">
              <Image
                src={aniversaryLogo.url}
                alt={aniversaryLogo.alternativeText || "Logo 20 Aniversario"}
                width={256}
                height={256}
                className="h-full w-auto object-contain drop-shadow-sm"
                priority
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-6">
          {socialMedia && socialMedia.length > 0 && (
            <div className="flex flex-col items-center gap-4 lg:items-end">
              <span className="text-xs font-bold tracking-widest text-secondary uppercase">
                Síguenos en
              </span>
              <div className="flex items-center gap-6">
                {socialMedia.map((social, index) => (
                  <Link
                    key={index}
                    href={social.url}
                    target={social.isExternal ? "_blank" : undefined}
                    rel={social.isExternal ? "noopener noreferrer" : undefined}
                    className="text-uno-secondary transition-all duration-500 ease-in-out lg:hover:-translate-y-1 lg:hover:scale-110"
                  >
                    {getSocialIcon(social.label)}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full flex-row items-center border-y border-gray-200 py-10 text-sm font-semibold tracking-tight">
        <div className="flex flex-col gap-5">
          {mail && (
            <Link
              href={`mailto:${mail}`}
              className="flex w-fit items-center gap-4 transition-colors hover:text-uno-primary"
            >
              <LuMail size={20} strokeWidth={1.5} />
              <span className="leading-none">{mail}</span>
            </Link>
          )}

          {phone && (
            <Link
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="flex w-fit items-center gap-4 transition-colors hover:text-uno-primary"
            >
              <LuPhone size={20} strokeWidth={1.5} />
              <span className="leading-none">{phone}</span>
            </Link>
          )}

          {location && (
            <article className="flex items-center gap-4">
              <LuMapPin size={20} strokeWidth={1.5} />
              <span className="leading-none">{location}</span>
            </article>
          )}
        </div>
      </div>

      {copyright && (
        <div className="w-full py-10">
          <p className="text-xs font-medium text-gray-500">{copyright}</p>
        </div>
      )}
    </footer>
  );
}
