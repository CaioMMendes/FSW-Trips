import Image from "next/image";
import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";
interface ImageModalProps {
  coverImage: string;
  imageUrl: string[];
  name: string;
}

const ImageModal = ({ coverImage, imageUrl, name }: ImageModalProps) => {
  return (
    <Gallery>
      <div className="hidden px-5 lg:grid grid-cols-[2fr,1fr,1fr] gap-2 grid-rows-2 lg:order-2">
        <Item
          original={`${coverImage}/1024/768?image=1`}
          thumbnail={`${coverImage}/80/60?image=1`}
          width="1024"
          height="768"
        >
          {({ ref, open }) => (
            <div className="relative row-span-2">
              <Image
                ref={ref as any}
                onClick={open}
                src={`${coverImage}/80/60?image=1`}
                alt={`${name} images`}
                className="rounded-tl-lg rounded-bl-lg shadow-md cursor-pointer"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </Item>

        {imageUrl.map((image, index) => {
          return (
            <Item
              original={`${image}/1024/768?image=1`}
              thumbnail={`${image}/80/60?image=1`}
              width="1024"
              height="768"
              key={index}
            >
              {({ ref, open }) => (
                <div className="relative h-[200px] w-full">
                  <Image
                    ref={ref as any}
                    onClick={open}
                    src={`${image}/80/60?image=1`}
                    alt={`${name} images`}
                    className="rounded-r-lg cursor-pointer shadow-md"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </Item>
          );
        })}
      </div>

      {/* <Item
          original="https://placekitten.com/1024/768?image=2"
          thumbnail="https://placekitten.com/80/60?image=2"
          width="1024"
          height="768"
        >
          {({ ref, open }) => (
            <Image
              ref={ref}
              onClick={open}
              src="https://placekitten.com/80/60?image=2"
            />
          )}
        </Item> */}
    </Gallery>
  );
};

export default ImageModal;
