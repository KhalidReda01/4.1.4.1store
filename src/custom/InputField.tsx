import {FC} from 'react';

import {theme} from '../constants';

type Props = {
  type?: 'text' | 'password';
  clickable?: boolean;
  containerStyle?: object;
  label?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  placeholder?: string;
  icon?: JSX.Element;
};

export const InputField: FC<Props> = ({
  placeholder,
  containerStyle,
  autoCapitalize = 'none',
  label,
  icon,
  clickable,
  type = 'text',
}) => {
  return (
    <div
      style={{
        height: 50,
        paddingLeft: 30,
        paddingRight: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#e8eff4',
        display: 'flex',
        ...containerStyle,
      }}
    >
      {label && (
        <div
          style={{
            position: 'absolute',
            top: -8,
            left: 20,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 12,
            backgroundColor: '#fff',
            fontSize: 12,
            color: theme.colors.textColor,
            textTransform: 'uppercase',
            fontFamily: 'Mulish-SemiBold',
          }}
        >
          {label}
        </div>
      )}
      <input
        className='input-field'
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        maxLength={50}
        type={type}
        style={{
          width: '100%',
          height: '100%',
          padding: 0,
          margin: 0,
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          fontSize: 16,
          color: theme.colors.mainColor,
        }}
      />
      {icon && !clickable && <div>{icon}</div>}
      {icon && clickable && <button>{icon}</button>}
    </div>
  );
};
