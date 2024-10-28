import React, {useEffect} from 'react';

import {hooks} from '../hooks';
import {theme} from '../constants';
import {components} from '../components';
import {actions} from '../store/actions';

export const OrderSuccessful: React.FC = () => {
  const dispatch = hooks.useAppDispatch();
  const navigate = hooks.useAppNavigate();

  useEffect(() => {
    dispatch(actions.resetCart());
    window.scrollTo(0, 0);
  }, []);

  const renderContent = (): JSX.Element => {
    return (
      <div
        style={{
          height: '100vh',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={require('../assets/icons/03.png')}
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
            fontSize: 22,
            color: theme.colors.mainColor,
            textTransform: 'capitalize',
            ...theme.fonts.Mulish_700Bold,
          }}
        >
          Thank you for your order!
        </h2>
        <p
          style={{
            color: theme.colors.textColor,
            whiteSpace: 'pre-line',
            textAlign: 'center',
            lineHeight: 1.7,
            fontSize: 16,
            margin: 0,
            marginBottom: 30,
          }}
        >
          Your order will be delivered on time.{'\n'}Thank you!
        </p>
        <components.Button
          title='View orders'
          onClick={() => {
            dispatch(actions.setScreen('Home'));
            navigate('/OrderHistory');
          }}
          containerStyle={{marginBottom: 10, width: '100%'}}
        />
        <components.Button
          title='Continue Shopping'
          onClick={() => {
            navigate('/TabNavigator');
          }}
          colorScheme='light'
          containerStyle={{width: '100%'}}
        />
      </div>
    );
  };

  return renderContent();
};
