import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {custom} from '../custom';
import {svg} from '../assets/svg';
import {theme} from '../constants';
import {components} from '../components';

export const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const renderHeader = () => <components.Header title='Sign in' />;

  const renderContent = (): JSX.Element => (
    <div style={{padding: '50px 20px 20px 20px'}}>
      <components.Line style={{marginBottom: 14}} />
      <h1
        style={{
          margin: 0,
          textAlign: 'center',
          ...theme.fonts.Mulish_700Bold,
          color: theme.colors.mainColor,
          fontSize: 32,
          lineHeight: 1.2,
          textTransform: 'capitalize',
          marginBottom: 14,
        }}
      >
        هنا عاصمة الرياضة
      </h1>
      <p
        style={{
          margin: 0,
          color: theme.colors.textColor,
          fontSize: 22,
          lineHeight: 1.6,
          textAlign: 'center',
          marginTop: 0,
          marginBottom: 40,
          ...theme.fonts.Mulish_400Regular,
        }}
      >
        سجل دخولك
      </p>
      <div>
        <custom.InputField
          label='email'
          icon={<svg.InputCheckSvg />}
          containerStyle={{marginBottom: 20}}
          placeholder='1.4.1.4@mail.com'
        />
        <custom.InputField
          label='password'
          placeholder='••••••••'
          icon={<svg.EyeOffSvg />}
          containerStyle={{marginBottom: 20}}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 30,
        }}
      >
        {/* Remember me */}
        <div
          style={{
            margin: 0,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            cursor: 'pointer',
            justifyContent: 'space-between',
          }}
          onClick={() => {
            setRememberMe(!rememberMe);
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 5,
              border: '2px solid #E8EFF4',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {rememberMe && <svg.InputCheckSvg />}
          </div>
          <span
            style={{
              color: theme.colors.textColor,
              fontSize: 16,
              marginLeft: 12,
              ...theme.fonts.Mulish_400Regular,
            }}
          >
            تذكرني
          </span>
        </div>
        {/* Forgot password */}
        <button
          onClick={() => navigate('/ForgotPassword')}
          style={{
            color: theme.colors.mainColor,
            fontSize: 22,
            backgroundColor: 'transparent',
            ...theme.fonts.Mulish_400Regular,
          }}
        >
          نسيت كلمة السر
        </button>
      </div>
      <components.Button
        title='سجل الان'
        style={{marginBottom: 20, fontSize: 22}}
        onClick={() => navigate('/TabNavigator')}
      />
      <div
        style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}
      >
        <span
          style={{
            ...theme.fonts.Mulish_400Regular,
            fontSize: 16,
            lineHeight: 1.3,
            cursor: 'pointer',
            color: theme.colors.mainColor,
          }}
          onClick={() => navigate('/SignUp')}
        >
          سجل الان.
        </span>
        <span
          style={{
            marginRight: 4,
            ...theme.fonts.Mulish_400Regular,
            fontSize: 16,
            lineHeight: 1.3,
            color: theme.colors.textColor,
          }}
        >
          ليس لديك حساب
        </span>
      </div>
    </div>
  );

  return (
    <>
      {renderHeader()}
      {renderContent()}
    </>
  );
};
