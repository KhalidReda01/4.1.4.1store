import React, {useEffect} from 'react';

import {hooks} from '../hooks';
import {custom} from '../custom';
import {svg} from '../assets/svg';
import {components} from '../components';

export const ShippingAndPaymentInfo: React.FC = () => {
  const navigate = hooks.useAppNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderHeader = () => {
    return <components.Header title='Shipping & payment info' goBack={true} />;
  };

  const renderContent = (): JSX.Element => {
    return (
      <div style={{padding: '40px 20px 20px 20px'}}>
        <custom.InputField
          placeholder='enter your name'
          label='Name'
          icon={<svg.InputCheckSvg />}
          containerStyle={{marginBottom: 20}}
        />
        <custom.InputField
          placeholder='enter your phone number'
          label='Phone number'
          containerStyle={{
            marginBottom: 20,
          }}
        />
        <custom.InputField
          placeholder='enter your email'
          label='Email'
          containerStyle={{
            marginBottom: 20,
          }}
        />
        <custom.InputField
          placeholder='enter your address'
          label='delivery address'
          containerStyle={{
            marginBottom: 20,
          }}
        />
        <custom.InputField
          placeholder='enter your card number'
          label='card number'
          containerStyle={{
            marginBottom: 20,
          }}
        />
        <div
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <custom.InputField
            label='MM/yy'
            placeholder='MM/YY'
            containerStyle={{width: 'calc(50% - 5px)'}}
          />
          <custom.InputField
            label='cvv'
            placeholder='•••'
            containerStyle={{width: 'calc(50% - 5px)'}}
          />
        </div>
        <components.Button
          title='proceed to checkout'
          onClick={() => {
            navigate('/Checkout');
          }}
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
