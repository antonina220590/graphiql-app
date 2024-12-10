import React from 'react';
import Image from 'next/image';

interface RoundImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const RoundImage: React.FC<RoundImageProps> = ({ src, alt, width, height }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="rounded-full"
    />
  );
};

export default RoundImage;
