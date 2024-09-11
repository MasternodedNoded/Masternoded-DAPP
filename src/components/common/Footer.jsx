import {
  FacebookIcons,
  LinkdinIcons,
  TwitterIcons,
  YoutubeIcons,
} from "./Icons";
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="main_container  mb-6">
      <div className="bg-caviar h-[2px] w-full mt-[2px]"></div>
      <div className="flex max-lg:flex-col justify-between gap-5 lg:gap-7 items-center mt-[23px]">
        <p className="text-lightgray text-base font-medium font-gothamMedium leading-[15px] max-sm:hidden">
          Copyrights © {year} All Rights Reserved by{" "}
          <span className="text-goldenrod uppercase font-bold font-gothamBold">
            Masternoded
          </span>
        </p>
        <p className="text-lightgray text-base font-medium font-gothamMedium leading-[15px] sm:hidden">
          © {year}{" "}
          <span className="text-goldenrod uppercase font-bold font-gothamBold">
            Masternoed
          </span>
        </p>
        <div className="flex gap-[10px] items-center max-w-[190px] w-full">
          <a href="https://facebook.com" className="footer_icon group">
            <FacebookIcons />
          </a>
          <a href="https://twitter.com" className="footer_icon group">
            <TwitterIcons />
          </a>
          <a href="https://www.youtube.com" className="footer_icon group">
            <YoutubeIcons />
          </a>
          <a href="https://linkedin.com/" className="footer_icon group">
            <LinkdinIcons />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
