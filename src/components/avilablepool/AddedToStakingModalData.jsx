/* eslint-disable react/prop-types */

const AddedToStakingModalData = ({item}) => {
  return (
    <div
    className=" w-full flex flex-col gap-[13px] md:gap-[18px] rounded-rounded10 bg-richblack common_box_shadow_2 py-5  md:py-7"
  >
    <h2 className="font-gothamBold font-bold text-lg sm:text-xl text-white leading-[19px] sm:leading-[21px]  text-center">
      {item?.name}
    </h2>
    <p className=" font-gothamMedium font-medium text-base sm:text-lg text-slategray leading-[17px] sm:leading-[19px] text-center ">
      {item?.decs}
    </p>
  </div>
  )
}

export default AddedToStakingModalData