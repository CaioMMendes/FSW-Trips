"use client";

import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

interface Images {
  coverImage: string;
  imageUrl: string[];
  name: string;
}
export default function Slide({ coverImage, imageUrl, name }: Images) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          <div className="keen-slider__slide bg-gray-400 flex items-center justify-center text-[50px] text-gray-50 max-h-screen h-72">
            <Image
              src={coverImage}
              alt={`${name} image`}
              fill
              style={{
                objectFit: "cover",
              }}
              className="rounded-lg shadow-md"
            />
          </div>
          {imageUrl.map((image, index) => (
            <div
              key={index}
              className="keen-slider__slide bg-gray-400 flex items-center justify-center text-[50px] text-gray-50 max-h-screen h-72"
            >
              <Image
                src={image}
                alt={`${name} image`}
                fill
                style={{
                  objectFit: "cover",
                }}
                className="rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="flex absolute bottom-[2px] px-2 gap-1 w-full mx-auto justify-center">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={
                  "border-none w-[9px] h-[9px] bg-gray-50 rounded-full my-1 p-1 cursor-pointer focus:outline-none  " +
                  (currentSlide === idx ? "bg-primary" : "")
                }
              ></button>
            );
          })}
        </div>
      )}
    </>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabled = props.disabled ? "fill-whiteTransparent" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`w-8 h-8 absolute top-1/2 transform z-20  -translate-y-1/2 fill-gray-100 cursor-pointer ${
        props.left ? "left-1" : "left-auto right-1"
      } ${disabled}`}
      //   xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
