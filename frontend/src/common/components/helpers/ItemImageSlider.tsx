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
            <img src={image} alt="cloth example" onMouseEnter={() => setSelectedImage(image)} onMouseLeave={() => setSelectedImage(images[0])} />
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
  justify-content: center;

  img {
    height: 500px;
    width: 350px;
  }

  @media (max-width: 900px) {
    img {
      height: 300px;
      width: 220px;
    }
  }

  @media (max-width: 700px) {
    order: 1;
    flex-direction: column;

    img {
      order: -1;
      height: 500px;
      width: 350px;
    }
  }

  @media (max-width: 400px) {
    img {
      height: 300px;
      width: 220px;
    }
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

  @media (max-width: 900px) {
    img {
      height: 80px;
      width: 64px;
    }
  }

  @media (max-width: 700px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;

    img {
      height: 150px;
      width: 120px;
    }
  }

  @media (max-width: 400px) {
    img {
      height: 100px;
      width: 80px;
    }
  }
`;
