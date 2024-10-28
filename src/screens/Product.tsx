import axios from 'axios';
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {Carousel} from 'react-responsive-carousel';

import {items} from '../items';
import {URLS} from '../config';
import {hooks} from '../hooks';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {product} from '../product';
import {actions} from '../store/actions';
import {components} from '../components';

export const Product: React.FC = () => {
  const location = useLocation();
  const item = location.state.item;

  const dispatch = hooks.useAppDispatch();

  const navigate = useNavigate();

  const [reviewsData, setReviewsData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedSize, setSelectedSize] = useState<string>(item.sizes?.[1]);
  const [selectedColor, setSelectedColor] = useState<string>(
    item.colors?.[1].name,
  );

  const modifiedItem = {
    ...item,
    color: selectedColor,
    size: selectedSize,
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
  };

  const getReviews = async () => {
    setIsLoading(true);
    try {
      const reviews = await axios
        .get(URLS.GET_REVIEWS)
        .then(res => res.data.reviews);

      setReviewsData(reviews);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getReviews();
  }, []);

  const renderHeader = (): JSX.Element => {
    return <components.Header goBack={true} line={true} basket={true} />;
  };

  const renderCarousel = (): JSX.Element => {
    return (
      <div style={{marginBottom: 22}}>
        <Carousel
          infiniteLoop={false}
          showStatus={false}
          showThumbs={false}
          thumbWidth={22}
          showIndicators={false}
          showArrows={false}
          onChange={handleSlideChange}
          swipeable={true}
          emulateTouch={true}
        >
          {item.images?.map((item: any, index: any) => {
            return (
              <img
                key={index}
                src={item}
                alt='Carousel'
                style={{
                  width: '100%',
                  height: 350,
                  objectFit: 'contain',
                  backgroundColor: theme.colors.imageBackground,
                }}
              />
            );
          })}
        </Carousel>
      </div>
    );
  };

  const renderIndicator = (): JSX.Element => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: 20,
          borderBottom: `1px solid ${theme.colors.aliceBlue2}`,
          marginBottom: 20,
        }}
      >
        {item.images?.map((item: any, index: number) => {
          const isSelected = index === activeIndex;
          const indicatorStyle = {
            background: isSelected ? theme.colors.mainColor : '#E8EFF4',
            display: 'inline-block',
            width: 22,
            height: 6,
            margin: '0 5px',
            borderRadius: 6,
          };
          return <div style={indicatorStyle} key={index} />;
        })}
      </div>
    );
  };

  const renderNameWithButton = (): JSX.Element => {
    return (
      <div
        style={{
          display: 'flex',
          padding: '0 20px 0 20px',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h3
          style={{
            ...theme.fonts.Mulish_700Bold,
            fontSize: 20,
            color: theme.colors.mainColor,
          }}
        >
          {item.name}
        </h3>
        <product.ProductInWishlist item={item} version={2} />
      </div>
    );
  };

  const renderRating = (): JSX.Element => {
    return (
      <div style={{padding: '0 20px 0 20px', marginBottom: 5}}>
        <product.ProductRating
          rating={item.rating}
          ratingCount={item.ratingCount}
        />
      </div>
    );
  };

  const renderPriceWithQuantity = (): JSX.Element => {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: 20,
          padding: '0 20px 0 20px',
          ...theme.flex.rowCenterSpaceBetween,
        }}
      >
        <div
          style={{
            ...theme.fonts.Mulish_600SemiBold,
            fontSize: 20,
            lineHeight: 1.5,
            color: theme.colors.mainColor,
          }}
        >
          ${item.price}
        </div>
        <product.ProductCounterInner item={modifiedItem} />
      </div>
    );
  };

  const renderSizes = (): JSX.Element => {
    return (
      <div style={{marginBottom: 40, padding: '0 20px 0 20px'}}>
        <h5
          style={{
            marginBottom: 14,
            ...theme.fonts.Mulish_600SemiBold,
            fontSize: 16,
            fontWeight: 600,
            color: theme.colors.mainColor,
          }}
        >
          Size
        </h5>
        <div
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 7,
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {item.sizes?.map((item: string, index: number) => {
            return (
              <button
                key={index}
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor:
                    selectedSize === item
                      ? theme.colors.mainColor
                      : theme.colors.imageBackground,
                  borderRadius: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={() => {
                  setSelectedSize(item);
                }}
              >
                <div
                  style={{
                    color:
                      selectedSize === item
                        ? theme.colors.mainYellow
                        : theme.colors.mainColor,
                    ...theme.fonts.Mulish_700Bold,
                    fontSize: 12,
                  }}
                >
                  {item}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderColors = (): JSX.Element => {
    return (
      <div
        style={{
          marginBottom: 40,
          padding: '0 20px 0 20px',
        }}
      >
        <h5
          style={{
            marginBottom: 14,
            ...theme.fonts.Mulish_600SemiBold,
            fontSize: 16,
            fontWeight: 600,
            color: theme.colors.mainColor,
          }}
        >
          Color
        </h5>
        <div
          style={{
            gap: 14,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {item.colors?.map((item: any, index: number) => {
            return (
              <button
                key={index}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: item.code,
                  justifyContent: 'center',
                }}
                onClick={() => {
                  setSelectedColor(item.name);
                }}
              >
                {selectedColor === item.name && <svg.CheckSvg />}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDescription = (): JSX.Element => {
    return (
      <div style={{marginBottom: 40, padding: '0 20px 0 20px'}}>
        <h5
          style={{
            marginBottom: 14,
            ...theme.fonts.Mulish_600SemiBold,
            fontSize: 16,
            fontWeight: 600,
            color: theme.colors.mainColor,
          }}
        >
          Description
        </h5>
        <p
          style={{
            margin: 0,
            marginBottom: 20,
            color: theme.colors.textColor,
            lineHeight: 1.7,
          }}
        >
          {item.description}
        </p>
        <button
          onClick={() => {
            navigate('/description', {state: {item}});
          }}
        >
          <svg.ReadMoreSvg />
        </button>
      </div>
    );
  };

  const renderButtons = (): JSX.Element => {
    return (
      <>
        <components.Button
          title='Add to cart'
          onClick={() => {
            dispatch(actions.addToCart(modifiedItem));
          }}
          containerStyle={{marginBottom: 10, padding: '0 20px 0 20px'}}
        />
        <components.Button
          title='Leave a review'
          colorScheme='light'
          onClick={() => {
            navigate('/LeaveAReview');
          }}
          containerStyle={{marginBottom: 40, padding: '0 20px 0 20px'}}
        />
      </>
    );
  };

  const renderReviews = (): JSX.Element => {
    const reviewQty = 3;
    return (
      <div>
        <components.BlockHeading
          title={`Reviews (${reviewsData.slice(0, reviewQty).length})`}
          containerStyle={{
            padding: '0 20px 0 20px',
            marginBottom: 20,
          }}
          viewAllOnClick={() => {
            navigate('/reviews', {state: {reviews: reviewsData}});
          }}
        />
        {reviewsData
          .slice(0, reviewQty)
          .map((item: any, index: number, array: any) => {
            const isLast = index === array.length - 1;
            return (
              <items.ReviewItem
                item={item}
                isLast={isLast}
                key={item.id.toString()}
              />
            );
          })}
      </div>
    );
  };

  const renderContent = (): JSX.Element => {
    if (isLoading) return <components.Loader />;

    return (
      <div style={{padding: '0 0 20px 0'}}>
        {renderCarousel()}
        {renderIndicator()}
        {renderNameWithButton()}
        {renderRating()}
        {renderPriceWithQuantity()}
        {renderSizes()}
        {renderColors()}
        {renderDescription()}
        {renderButtons()}
        {renderReviews()}
      </div>
    );
  };

  return (
    <>
      {renderHeader()}
      {renderContent()}
    </>
  );
};
