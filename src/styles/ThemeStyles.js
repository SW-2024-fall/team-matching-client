const greyColors = {
  100: '#F9FAFB',
  200: '#E5E8EB',
  400: '#b0b8c1',
  500: '#8B95A1',
  700: '#4E5968',
  800: '#333D48',
  900: '#191f28',
};

const greyBlueColors = {
  100: '#B9D9EB',
  200: '#9BCBEB',
  400: '#0077C8',
  500: '#005EB8',
  600: '#004094',
  700: '#002D63',
};

const blueColors = {
  100: '#B9D9EB',
  200: '#9BCBEB',
  400: '#0098FF',
  500: '#0082FF',
  600: '#0066EB',
  700: '#0059C3',
};

export const theme = {
  font: {
    color: {
      light: greyColors[400],
      primary: greyColors[800],
    },
    size: {
      xSmall: '10px',
      small: '12px',
      primary: '14px',
      large: '18px',
      xLarge: '28px',
    },
    weight: {
      light: 400,
      regular: 400,
      primary: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
    },
  },
  border: {
    radius: {
      small: '8px',
      primary: '12px',
      medium: '12px',
      large: '16px',
    },
    color: greyColors[400],
  },
  colors: {
    grey: {
      border: greyColors[400],
      light: greyColors[200],
      primary: greyColors[800],
      dark: greyColors[900],
    },
    blue: {
      light: blueColors[100],
      primary: blueColors[500],
      hover: blueColors[600],
    },
    background: {
      primary: '#FFFFFF',
      appbar: greyColors[100],
    },
  },
};
