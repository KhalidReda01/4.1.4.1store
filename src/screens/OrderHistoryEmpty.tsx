import axios from 'axios';
import React, {useEffect, useState} from 'react';

import {hooks} from '../hooks';
import {URLS} from '../config';
import {theme} from '../constants';
import {actions} from '../store/actions';
import {components} from '../components';

export const OrderHistoryEmpty: React.FC = () => {
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
  }, []);

  const renderHeader = () => {
    return <components.Header goBack={true} title='Order history' />;
  };

  const renderContent = () => {
    if (loading) return <components.TabLoader />;

    return (
      <div style={{padding: '50px 20px 20px 20px'}}>
        <img
          src={require('../assets/icons/05.png')}
          alt='order successful'
          style={{
            width: 225.18,
            display: 'block',
            margin: '0 auto',
            marginBottom: 14,
          }}
        />
        <h2
          style={{
            margin: 0,
            textAlign: 'center',
            ...theme.fonts.Mulish_700Bold,
            fontSize: 22,
            lineHeight: 1.2,
            color: theme.colors.mainColor,
            marginBottom: 14,
            textTransform: 'capitalize',
            whiteSpace: 'pre-line',
          }}
        >
          Your order history is{'\n'}currently empty!
        </h2>
        <p
          style={{
            margin: 0,
            textAlign: 'center',
            color: theme.colors.textColor,
            lineHeight: 1.7,
            marginBottom: 30,
          }}
        >
          Start filling it up with your past purchases to keep track of your
          shoe shopping journey.
        </p>
        <components.Button
          title='shop now'
          onClick={() => {
            dispatch(actions.resetFilters());
            navigate('/shop', {state: {products: productsData}});
          }}
          containerStyle={{marginBottom: 10}}
        />
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
