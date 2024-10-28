import axios from 'axios';

import {useEffect, useState, FC} from 'react';
import * as Accordion from '@radix-ui/react-accordion';

import {URLS} from '../config';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

export const OrderHistory: FC = () => {
  const [loading, setLoading] = useState(false);
  const [ordersData, setOrdersData] = useState<any[]>([]);

  const getOrders = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get<{orders: any[]}>(URLS.GET_ORDERS);
      setOrdersData(response.data.orders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const renderHeader = () => {
    return <components.Header goBack={true} title='Order history' />;
  };

  const renderContent = (): JSX.Element => {
    if (loading) return <components.Loader />;

    return (
      <div
        style={{
          padding: '10px 0 20px 0',
        }}
      >
        <Accordion.Root type='single' collapsible={true}>
          {ordersData.map((order, index) => {
            return (
              <Accordion.Item key={index} value={order.id}>
                <Accordion.Trigger
                  style={{
                    flexDirection: 'column',
                    width: '100%',
                    display: 'flex',
                    padding: '10px 20px 18px 20px',
                    borderBottom: '4px solid #E8EFF4',
                  }}
                >
                  <div
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 7,
                    }}
                  >
                    <h5
                      style={{
                        margin: 0,
                        ...theme.fonts.Mulish_600SemiBold,
                        fontSize: 16,
                        color: theme.colors.mainColor,
                        lineHeight: 1.2,
                      }}
                    >
                      #{order.id}
                    </h5>
                    <span
                      style={{
                        ...theme.fonts.Mulish_400Regular,
                        fontSize: 14,
                        textTransform: 'capitalize',
                        lineHeight: 1.5,
                        color:
                          order.status === 'delivered'
                            ? '#51BA74'
                            : order.status === 'shipping'
                            ? '#F5C102'
                            : '#FF4343',
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        ...theme.fonts.Mulish_400Regular,
                        fontSize: 12,
                        color: theme.colors.textColor,
                        lineHeight: 1.5,
                      }}
                    >
                      {order.date}
                    </span>
                    <span
                      style={{
                        ...theme.fonts.Mulish_700Bold,
                        fontSize: 12,
                        color: theme.colors.mainColor,
                        lineHeight: 1.5,
                      }}
                    >
                      ${order.total}
                    </span>
                  </div>
                </Accordion.Trigger>
                <Accordion.Content
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderBottom: '4px solid #E8EFF4',
                    padding: '10px 20px 18px 20px',
                  }}
                >
                  {order.products.map((item: any, index: any, array: any) => {
                    const isLast = index === array.length - 1;
                    return (
                      <div>
                        <div
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: isLast ? 22 : 6,
                          }}
                        >
                          <span
                            style={{
                              margin: 0,
                              ...theme.fonts.Mulish_400Regular,
                              fontSize: 14,
                              color: theme.colors.textColor,
                              lineHeight: 1.5,
                            }}
                          >
                            {item.name}, {item.size}, {item.color}
                          </span>
                          <span
                            style={{
                              ...theme.fonts.Mulish_400Regular,
                              fontSize: 14,
                              lineHeight: 1.5,
                              color: theme.colors.textColor,
                            }}
                          >
                            {item.quantity} x {item.price}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <div
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <button style={{margin: 0, padding: 0, lineHeight: 0}}>
                      <svg.RepeatOrderSvg />
                    </button>
                    <button style={{lineHeight: 0}}>
                      <svg.LeaveAReviewSvg />
                    </button>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
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
