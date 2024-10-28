import axios from 'axios';
import {useEffect, useState, FC} from 'react';

import {URLS} from '../../config';
import {hooks} from '../../hooks';
import {custom} from '../../custom';
import {theme} from '../../constants';
import {actions} from '../../store/actions';
import {components} from '../../components';

export const Categories: FC = () => {
  const dispatch = hooks.useAppDispatch();
  const navigate = hooks.useAppNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [audience, setAudience] = useState<string>('all');
  const [productsData, setProductsData] = useState<any>([]);
  const [audiencesData, setAudiencesData] = useState<any>([]);
  const [categoriesData, setCategoriesData] = useState<any>([]);

  const getData = async () => {
    setLoading(true);
    try {
      const audiences = await axios
        .get(URLS.GET_AUDIENCES)
        .then(res => res.data.audiences);

      const categories = await axios
        .get(URLS.GET_CATEGORIES)
        .then(res => res.data.categories);

      const products = await axios
        .get(URLS.GET_PRODUCTS)
        .then(res => res.data.products);

      setProductsData(products);
      setAudiencesData(audiences);
      setCategoriesData(categories);
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
    return <components.Header burger={true} basket={true} line={true} />;
  };

  const renderAudience = (): JSX.Element => {
    const audiencesWithAll = audiencesData
      ? [{id: 0, name: 'all'}, ...audiencesData]
      : [];

    return (
      <custom.ScrollView
        style={{paddingLeft: 20, marginBottom: 20, paddingRight: 20}}
      >
        {audiencesWithAll?.map((item: any, index: number, array: any) => {
          const isLast = index === array.length - 1;
          return (
            <button
              key={item.id}
              style={{
                paddingLeft: 40,
                paddingRight: 40,
                marginRight: isLast ? 20 : 10,
                backgroundColor:
                  item.name === audience ? theme.colors.mainColor : '#F2F7FC',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 5,
                paddingBottom: 5,
                color:
                  item.name === audience
                    ? theme.colors.mainYellow
                    : theme.colors.mainColor,
                ...theme.fonts.Mulish_700Bold,
                fontSize: 12,
                lineHeight: 1.7,
                textTransform: 'capitalize',
              }}
              onClick={() => setAudience(item.name)}
            >
              {item.name}
            </button>
          );
        })}
      </custom.ScrollView>
    );
  };

  const renderCategories = (): JSX.Element => {
    const categoriesForAudience =
      audience !== 'all'
        ? categoriesData?.filter((item: any) =>
            item.audience?.includes(audience),
          )
        : categoriesData;

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {categoriesForAudience?.map((item: any, index: number) => {
          const indexPlusOne = index + 1;
          const everyThird = indexPlusOne % 3 === 0;

          const categoryProducts = productsData?.filter((product: any) =>
            product.categories.includes(item.name),
          );
          return (
            <button
              style={{
                position: 'relative',
                width: everyThird ? '100%' : 'calc(50% - 0.5px)',
              }}
              onClick={() => {
                if (categoryProducts.length === 0) {
                  return alert('No products in this category');
                }
                dispatch(actions.resetFilters());
                navigate('/Shop', {
                  state: {title: item.name, products: categoryProducts},
                });
              }}
            >
              <custom.ImageBackground
                key={item.id}
                style={{
                  justifyContent: 'flex-end',
                  height: everyThird ? 170 : 187,
                  width: '100%',
                  backgroundColor: '#F2F7FC',
                  backgroundSize: 'contain',
                }}
                imageUrl={item.image}
              >
                <div
                  style={{
                    flex: 1,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 1,
                    backgroundColor: `${theme.colors.mainColor}70`,
                  }}
                />

                <div style={{padding: 20, zIndex: 1, display: 'flex'}}>
                  <h4
                    style={{
                      margin: 0,
                      color: theme.colors.white,
                      ...theme.fonts.Mulish_600SemiBold,
                      fontSize: 18,
                      lineHeight: 1.2,
                    }}
                  >
                    {item.name}
                  </h4>
                </div>
              </custom.ImageBackground>
            </button>
          );
        })}
      </div>
    );
  };

  const renderContent = (): JSX.Element => {
    if (loading) return <components.TabLoader />;

    return (
      <div style={{paddingTop: 30, paddingBottom: 64 + 30}}>
        {renderAudience()}
        {renderCategories()}
      </div>
    );
  };

  const renderBottomTabBar = (): JSX.Element => {
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
