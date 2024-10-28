import React from 'react';

import {hooks} from '../hooks';
import {utils} from '../utils';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {actions} from '../store/actions';

const tabs = [
  {
    id: 1,
    name: 'Home',
    icon: svg.HomeTabSvg,
  },
  {
    id: 2,
    name: 'Search',
    icon: svg.CategoryTabSvg,
  },
  {
    id: 3,
    name: 'Order',
    icon: svg.OrderTabSvg,
  },
  {
    id: 4,
    name: 'Wishlist',
    icon: svg.WishlistTabSvg,
  },
  {
    id: 5,
    name: 'Profile',
    icon: svg.ProfileTabSvg,
  },
];

export const BottomTabBar: React.FC = () => {
  const dispatch = hooks.useAppDispatch();

  const currentTabScreen = hooks.useAppSelector(state => state.tabSlice.screen);

  return (
    <nav
      style={{
        height: 64,
        bottom: 0,
        position: 'fixed',
        zIndex: 4,
        width: '100%',
        maxWidth: 768,
      }}
    >
      <div
        style={{
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '100%',
          position: 'relative',
          backgroundColor: theme.colors.mainColor,
          paddingLeft: 20,
          paddingRight: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        {tabs.map(tab => (
          <div
            key={tab.id}
            onClick={() => dispatch(actions.setScreen(tab.name))}
          >
            <div style={{cursor: 'pointer'}}>
              <tab.icon
                color={
                  currentTabScreen === tab.name
                    ? theme.colors.mainYellow
                    : '#8C99B1'
                }
              />
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};
