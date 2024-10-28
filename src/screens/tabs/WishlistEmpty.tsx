import axios from 'axios';
import {useState, useEffect, FC} from 'react';

import {URLS} from '../../config';
import {hooks} from '../../hooks';
import {theme} from '../../constants';
import {components} from '../../components';
import {actions} from '../../store/actions';

export const WishlistEmpty: FC = () => {
  const dispatch = hooks.useAppDispatch();
  const navigate = hooks.useAppNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [productsData, setProductsData] = useState<any>([]);

  const getData = async () => {
    setLoading(true);

    try {
      const products = await axios
        .get(URLS.GET_PRODUCTS)
        .then(res => res.data.products);

      const banners = await axios
        .get(URLS.GET_BANNERS)
        .then(res => res.data.banners);

      const carousel = await axios
        .get(URLS.GET_CAROUSEL)
        .then(res => res.data.carousel);

      setProductsData(products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const renderHeader = (): JSX.Element => {
    return (
      <components.Header
        title='Wishlist'
        burger={true}
        basket={true}
        line={true}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    if (loading) return <components.Loader />;

    return (
      <div style={{padding: '40px 20px 94px 20px'}}>
        <img
          src={require('../../assets/icons/11.png')}
          alt='order successful'
          style={{
            width: 225.18,
            display: 'block',
            margin: '0 auto',
            marginBottom: 4,
          }}
        />
        <h2
          style={{
            textAlign: 'center',
            margin: 0,
            marginBottom: 14,
            ...theme.fonts.Mulish_700Bold,
            fontWeight: 'bold',
            fontSize: 22,
            lineHeight: 1.3,
            textTransform: 'capitalize',
            color: theme.colors.mainColor,
          }}
        >
          Your Wishlist is empty!
        </h2>
        <p
          style={{
            whiteSpace: 'pre-line',
            textAlign: 'center',
            margin: 0,
            padding: 0,
            color: theme.colors.textColor,
            lineHeight: 1.7,
            marginBottom: 30,
          }}
        >
          Looks like you haven't chosen the{'\n'}items you like.
        </p>
        <components.Button
          title='Browse products'
          onClick={() => {
            dispatch(actions.resetFilters());
            navigate('/Shop', {state: {products: productsData}});
          }}
          containerStyle={{marginBottom: 10}}
        />
      </div>
    );
  };

  const renderBottomTabBar = () => {
    return <components.BottomTabBar />;
  };

  return (
    <>
      {renderHeader()}
      {renderContent()}
      {renderBottomTabBar()}
    </>
  );
};
