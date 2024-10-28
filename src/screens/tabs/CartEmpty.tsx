import axios from 'axios';
import React, {useEffect, useState} from 'react';

import {URLS} from '../../config';
import {hooks} from '../../hooks';
import {theme} from '../../constants';
import {components} from '../../components';
import {actions} from '../../store/actions';

export const CartEmpty: React.FC = () => {
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
      <components.Header title='Cart' burger={true} basket={true} line={true} />
    );
  };

  const renderContent = (): JSX.Element => {
    if (loading) return <components.Loader />;

    return (
      <div
        style={{
          // paddingLeft: 20,
          // paddingRight: 20,
          // paddingTop: 40,
          // paddingBottom: 64 + 30,

          height: '100vh - 94px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={require('../../assets/icons/06.png')}
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
            marginBottom: 14,
            margin: 0,
            ...theme.fonts.Mulish_700Bold,
            fontSize: 22,
            lineHeight: 1.2,
            color: theme.colors.mainColor,
            textTransform: 'capitalize',
          }}
        >
          Your cart is empty!
        </h2>
        <p
          style={{
            whiteSpace: 'pre-line',
            textAlign: 'center',
            marginBottom: 30,
            color: theme.colors.textColor,
            fontSize: 16,
            lineHeight: 1.7,
          }}
        >
          Looks like you haven't made{'\n'}your order yet.
        </p>
        <components.Button
          title='shop now'
          onClick={() => {
            dispatch(actions.resetFilters());
            navigate('/Shop', {state: {products: productsData}});
          }}
          containerStyle={{marginBottom: 0, width: '100%'}}
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
