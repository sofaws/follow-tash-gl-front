import { red } from '@material-ui/core/colors';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import createPalette from '@material-ui/core/styles/createPalette';

export const muiTheme = createMuiTheme({
  palette: createPalette({
    primary: {
      main: '#746cd8',
      contrastText: '#ffffff',
    },
    error: red,
  }),
});
