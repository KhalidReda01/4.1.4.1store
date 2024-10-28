import React from 'react';

import {hooks} from '../hooks';
import {theme} from '../constants';
import {components} from '../components';

export const Checkout: React.FC = () => {
  const navigate = hooks.useAppNavigate();

  const cart = hooks.useAppSelector(state => state.cartSlice.list);
  const total = hooks.useAppSelector(state => state.cartSlice.total);
  const discount = hooks.useAppSelector(state => state.cartSlice.discount);
  const delivery = hooks.useAppSelector(state => state.cartSlice.delivery);

  const textStyle = {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.5,
    fontWeight: 400,
    color: theme.colors.textColor,
    ...theme.fonts.Mulish_400Regular,
  };

  const renderHeader = (): JSX.Element => {
    return <components.Header title='Checkout' goBack={true} line={true} />;
  };

  const renderMyOrder = (): JSX.Element => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 15,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            display: 'flex',
            ...theme.flex.rowCenterSpaceBetween,
            marginBottom: 8,
            padding: '0 20px 6px 20px',
          }}
        >
          <h4
            style={{
              margin: 0,
              ...theme.fonts.Mulish_700Bold,
              color: theme.colors.mainColor,
              lineHeight: 1.2,
              fontSize: 18,
            }}
          >
            My order
          </h4>
          <h4
            style={{
              margin: 0,
              ...theme.fonts.Mulish_700Bold,
              color: theme.colors.mainColor,
              lineHeight: 1.2,
              fontSize: 18,
            }}
          >
            ${total.toFixed(2).replace('.', ',')}
          </h4>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.colors.ghostWhite,
            padding: 20,
            borderTop: 'solid #EDF1FA 4px',
            borderBottom: 'solid #EDF1FA 4px',
            borderColor: theme.colors.ghostWhite2,
          }}
        >
          {/* PRODUCTS */}
          {cart.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  ...theme.flex.rowCenterSpaceBetween,
                  marginBottom: 10,
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <h6
                  style={{
                    textTransform: 'capitalize',
                    margin: 0,
                    color: theme.colors.textColor,
                    fontSize: 14,
                    ...theme.fonts.Mulish_400Regular,
                    fontWeight: 400,
                    lineHeight: 1.5,
                  }}
                >
                  {item.name}
                  {item.size && `, ${item.size}`}
                  {item.color && `, ${item.color}`}
                </h6>
                <span
                  style={{
                    textTransform: 'capitalize',
                    margin: 0,
                    color: theme.colors.textColor,
                    fontSize: 14,
                    ...theme.fonts.Mulish_400Regular,
                    fontWeight: 400,
                    lineHeight: 1.5,
                  }}
                >
                  {item.quantity} x ${item.price}
                </span>
              </div>
            );
          })}
          {/* TOTAL */}
          {discount > 0 && (
            <div
              style={{
                display: 'flex',
                ...theme.flex.rowCenterSpaceBetween,
                marginBottom: 10,
              }}
            >
              <div style={{textTransform: 'capitalize'}}>Discount</div>
              <div style={{textTransform: 'capitalize'}}>{discount}%</div>
            </div>
          )}
          {/* DELIVERY */}
          <div style={{...theme.flex.rowCenterSpaceBetween, display: 'flex'}}>
            <h6
              style={{
                textTransform: 'capitalize',
                margin: 0,
                color: theme.colors.textColor,
                fontSize: 14,
                ...theme.fonts.Mulish_400Regular,
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              Delivery
            </h6>
            <span
              style={{
                textTransform: 'capitalize',
                margin: 0,
                color: '#51BA74',
                fontSize: 14,
                ...theme.fonts.Mulish_400Regular,
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              {`${delivery === 0 ? 'Free' : `$${delivery.toFixed(2)}`}`}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderInfo = (): JSX.Element => {
    return (
      <div style={{marginBottom: 30}}>
        <div style={{padding: '0 20px'}}>
          <h5
            style={{
              margin: 0,
              marginBottom: 13,
              color: theme.colors.mainColor,
              ...theme.fonts.Mulish_600SemiBold,
              fontSize: 16,
              lineHeight: 1.5,
              fontWeight: 600,
            }}
          >
            Shipping & payment info
          </h5>
        </div>
        <div
          style={{
            backgroundColor: theme.colors.ghostWhite,
            padding: 20,
            borderTop: 'solid #EDF1FA 4px',
            borderBottom: 'solid #EDF1FA 4px',
          }}
        >
          <h6 style={{...textStyle, marginBottom: 3}}>Zenith Sneaks</h6>
          <h6 style={{...textStyle, marginBottom: 3}}>
            8000 S Kirkland Ave, Chicago, IL 6065...
          </h6>
          <span style={{...textStyle}}>**** 4864</span>
        </div>
      </div>
    );
  };

  const renderButton = (): JSX.Element => {
    return (
      <components.Button
        title='Confirm order'
        onClick={() => {
          navigate('/OrderSuccessful');
          // navigate('/OrderFailed');
        }}
        containerStyle={{
          padding: '0 20px',
        }}
      />
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <div style={{paddingTop: 33, paddingBottom: 20}}>
        {renderMyOrder()}
        {renderInfo()}
        {renderButton()}
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
