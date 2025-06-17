import { useStyleRegister } from '@ant-design/cssinjs';

const genFormStyle = () => ({
  '.azb-field': {
    marginBottom: '16px',
    
    '&:last-child': {
      marginBottom: 0
    }
  },
  
  '.azb-field-label': {
    display: 'block',
    marginBottom: '4px',
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.85)',
    transition: 'color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
    
    '&--error': {
      color: '#ff4d4f'
    }
  },
  
  '.azb-field-label-required': {
    color: '#ff4d4f',
    marginLeft: '4px'
  },
  
  '.azb-field-error': {
    color: '#ff4d4f',
    fontSize: '14px',
    marginTop: '4px',
    lineHeight: 1.5,
    minHeight: 0,
    transition: 'color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
    
    '&:not(:empty)': {
      minHeight: '22px',
      marginBottom: '4px'
    }
  },
  
  '.azb-form': {
    width: '100%'
  },
  
  '.azb-form-content': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 0
  },
  
  '.azb-date-field .ant-picker': {
    width: '100%'
  },
  
  '.azb-number-field .ant-input-number': {
    width: '100%'
  },
  
  '.azb-select-field .ant-select': {
    width: '100%'
  },
  
  '.azb-field-grid': {
    display: 'grid',
    gap: '16px',
    
    '&--2col': {
      gridTemplateColumns: '1fr 1fr'
    },
    
    '&--3col': {
      gridTemplateColumns: '1fr 1fr 1fr'
    }
  },
  
  '@media (max-width: 768px)': {
    '.azb-field-grid--2col, .azb-field-grid--3col': {
      gridTemplateColumns: '1fr'
    }
  },
  
  ':root': {
    '--azb-error-color': '#ff4d4f',
    '--azb-label-color': 'rgba(0, 0, 0, 0.85)',
    '--azb-font-size-sm': '14px',
    '--azb-spacing-xs': '4px',
    '--azb-spacing-sm': '8px',
    '--azb-spacing-md': '16px',
    '--azb-transition': '0.3s cubic-bezier(0.645, 0.045, 0.355, 1)'
  },
  
  '[data-theme="dark"]': {
    '--azb-label-color': 'rgba(255, 255, 255, 0.85)',
    
    '& .azb-field-label': {
      color: 'rgba(255, 255, 255, 0.85)'
    },
    
    '& .azb-field-error': {
      color: '#ff7875'
    }
  },

  '[data-theme="dark"] input:-webkit-autofill, [data-theme="dark"] input:-webkit-autofill:hover, [data-theme="dark"] input:-webkit-autofill:focus': {
    WebkitBoxShadow: '0 0 0 1000px #1f1f1f inset !important',
    WebkitTextFillColor: 'rgba(255, 255, 255, 0.85) !important',
    transition: 'background-color 5000s ease-in-out 0s !important'
  },

  '[data-theme="dark"] .ant-input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 1000px #1f1f1f inset !important',
    WebkitTextFillColor: 'rgba(255, 255, 255, 0.85) !important'
  },

  '[data-theme="dark"] .ant-input:-webkit-autofill:hover': {
    WebkitBoxShadow: '0 0 0 1000px #262626 inset !important',
    WebkitTextFillColor: 'rgba(255, 255, 255, 0.85) !important'
  },

  '[data-theme="dark"] .ant-input:-webkit-autofill:focus': {
    WebkitBoxShadow: '0 0 0 1000px #1f1f1f inset !important',
    WebkitTextFillColor: 'rgba(255, 255, 255, 0.85) !important'
  }
});

export const useAntdZodBridgeStyle = () => {
  return useStyleRegister(
    {
      theme: {
        id: 0,
        derivatives: [],
        getDerivativeToken: () => ({})
      } as any,
      token: {},
      path: ['antd-zod-bridge']
    },
    () => genFormStyle()
  );
};
