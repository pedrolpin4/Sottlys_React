/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/no-array-index-key */
import styled from 'styled-components';
import imageArray from '../assets/CarouselImages';
import { Carousel } from 'react-responsive-carousel';

export default () => (
        <CarouselContainer showThumbs={false} showStatus={false} infiniteLoop autoPlay>
            {imageArray.map((image, index) => (
            <CarouselPage>
                <img alt={image.alt} src={image.image} key={index} />
            </CarouselPage>
            ))}
        </CarouselContainer>
);


const CarouselContainer = styled(Carousel)`
  width: 100%;
`;

const CarouselPage = styled.div`
  object-fit: contain;
  img {
    vertical-align: middle;
  }
`;