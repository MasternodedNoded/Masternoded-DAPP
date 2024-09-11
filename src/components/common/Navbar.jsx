import logo2 from "../../assets/img/logo-img-1.png";
import logo1 from "../../assets/img/logo-img-2.png";
import useWalletConnect from "../../hooks/useWalletConnect";
import { shortenAddress } from "../../utils/addressShortHand";
import { DollorIcon } from "./Icons";

const Navbar = () => {
  const {open,userAddress} = useWalletConnect()
  return (
    <div className="bg-richblack sm:sticky sm:top-[-1px] sm:z-50 sm:shadow-[0px_5px_40px_0px_rgba(0,0,0,0.37)]">
      <div className="main_container flex max-sm:flex-col max-sm:gap-7 items-center justify-between py-[15px]">
        <div className="flex bg_logo_img max-w-[216px] justify-center sm:max-w-[188px] cursor-pointer w-full  rounded-rounded10 h-[50px] 3xl:h-[70px]  px-3 items-center gap-1.5 ">
          <img
            src={logo1}
            className="max-sm:w-[45px] w-[35px] 3xl:w-[49px] h-[40] 3xl:h-[54px] max-sm:h-[49px]"
            alt="masternoded"
          />
          <img src={logo2} alt="masternoded" className="w-[118px]" />
        </div>
        <div className="flex max-w-[406px] w-full justify-between sm:justify-end md:justify-normal items-center gap-3 md:gap-6">
          <div className="flex gap-2.5 sm:gap-[15px] items-center max-w-[157px] sm:max-w-[181px] w-full">
            {/* <DollorIcon />
            <div className="flex flex-col gap-1 2xl:gap-2">
              <span className="text-lg font-medium font-gothamMedium text-white !leading-5">
                $3,250
              </span>
              <span className="text-cadetgrey text-sm sm:text-md !leading-4 font-medium font-gothamMedium">
                Total Earnings
              </span>
            </div> */}
          </div>
          <div className="w-[1px] h-9 sm:h-12 bg-caviar block"></div>
          <button onClick={()=>open()}className="rounded-rounded60 md:ml-2.5 transition duration-300 ease-in-out hover:text-yellowishorange hover:bg-transparent bg-yellowishorange text-white font-medium font-gothamMedium text-md leading-5 max-w-[155px] sm:max-w-[167px] w-full h-12 box_shadow_1">
           {userAddress?shortenAddress(userAddress): 'Connect Wallet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
