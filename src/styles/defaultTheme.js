const mainColor = '#40C3FD';

export const theme = {
  palette: {
    primary: {
      light: '#9ADFFD',
      main: mainColor,
      dark: '#05ABF3',
      contrastText: '#fff',
    },
    secondary: {
      light: '#D2F8E6',
      main: '#30D887',
      dark: '#00A958',
      contrastText: '#fff',
    },
    error: {
      main: '#ff5a5f',
    },
    custom: {
      black: '#000',
      lightGrey: '#f4f4f4',
      mediumGrey: '#777',
      darkGrey: '#111',
      white: '#fff',
      background: '#40C3FD',
      red: '#ff5a5f',
      darkBlue: '#27648C',
      lightBlue: '#F0F8FE',
      pink: '#D91D71',
      navigation: mainColor,
    },
    background: {
      default: '#f8f8f8'
    }
  },
  typography: {
    useNextVariants: true,
    fontSize: 12,
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: `1px solid #999`,
        },
        '&:after': {
          borderBottom: `2px solid ${mainColor}`,
        }
      }
    },
    MuiFormLabel: {
      root: {
        color: '#999',
        '&$focused': {
          color: mainColor,
          '&$error': {
            color: '#ff5a5f',
          },
        },
        '&$error': {
          color: '#999',
        },
      },
    },
    MuiFormControl: {
      root: {
        width: '100%',
      },
      marginNormal: {
        marginTop: 12,
        marginBottom: 4,
      },
      marginDense: {
        marginTop: 2,
        marginBottom: 2,
      }
    },
    MuiFormHelperText: {
      root: {
        marginTop: 4,
      },
      error: {
        marginTop: 4,
      }
    }
  },
};

export default theme;