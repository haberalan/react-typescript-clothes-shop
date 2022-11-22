import { useState } from 'react';
import styled from 'styled-components';

type ItemImageSliderProps = {
  images: string[];
};

export const ItemImageSlider = ({ images }: ItemImageSliderProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <Container>
      <ImagesList>
        {images.map((image) => (
          <li key={image}>
            <img
              src={image}
              alt="cloth example"
              onMouseEnter={() => setSelectedImage(image)}
              onMouseLeave={() => setSelectedImage(images[0])}
            />
          </li>
        ))}
      </ImagesList>
      <img src={selectedImage} alt="cloth example" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 1rem;

  img {
    height: 500px;
    width: 350px;
  }
`;

const ImagesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  img {
    height: 120px;
    width: 100px;
    cursor: pointer;
  }
`;
