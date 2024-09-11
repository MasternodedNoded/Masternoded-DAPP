/* eslint-disable react/prop-types */


const AvailablePoolGridCardImg = ({img ,index}) => {
  return (
    <img
    src={img}
    alt="dollor image"
    className={`2xl:w-[35px] w-7 h-7 2xl:h-[35px] ${
      index === 0 ? "" : "-ml-3 2xl:ml-[-15px]"
    }`}
  />
  )
}

export default AvailablePoolGridCardImg