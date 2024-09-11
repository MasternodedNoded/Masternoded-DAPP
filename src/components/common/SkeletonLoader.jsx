/* eslint-disable react/prop-types */
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({ height }) => {
  return (
    <>
      <div className="mb-1">
        <SkeletonTheme baseColor="#1A1A1A" highlightColor="#444">
          <Skeleton
            className={`${height}`}
            baseColor="rgba(0, 0, 0, 0.386)"
            borderRadius={15}
          />
        </SkeletonTheme>
      </div>
    </>
  );
};

export default SkeletonLoader;
