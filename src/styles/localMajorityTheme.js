import {
  indigo900, blue800, lightBlue500,
  lightBlueA100,
  red600, red900,
  cyan500,
  grey300,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
  spacing: spacing,
  fontFamily: "'Open Sans', Arial, sans-serif",
  palette: {
    primary1Color: indigo900,
    primary2Color: lightBlueA100,
    primary3Color: red600,
    accent1Color: blue800,
    accent2Color: grey300,
    accent3Color: red900,
    textColor: indigo900,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: lightBlue500,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
};
    // primary3Color: grey300,


// import {
//   cyan500, cyan700,
//   pinkA200,
//   grey100, grey300, grey400, grey500,
//   white, darkBlack, fullBlack,
// } from '../colors';
// import {fade} from '../../utils/colorManipulator';
// import spacing from '../spacing';

// export default {
//   spacing: spacing,
//   fontFamily: 'Roboto, sans-serif',
//   palette: {
//     primary1Color: cyan500,
//     primary2Color: cyan700,
//     primary3Color: grey400,
//     accent1Color: pinkA200,
//     accent2Color: grey100,
//     accent3Color: grey500,
//     textColor: darkBlack,
//     alternateTextColor: white,
//     canvasColor: white,
//     borderColor: grey300,
//     disabledColor: fade(darkBlack, 0.3),
//     pickerHeaderColor: cyan500,
//     clockCircleColor: fade(darkBlack, 0.07),
//     shadowColor: fullBlack,
//   },
// };

// //   spacing: spacing,
// //   fontFamily: 'Georgia, serif',
// //   palette: {
// //     primary: {
// //       ...indigo,
// //       900: '#1A237E',
// //     },
// //     secondary: {
// //       ...blue,
// //       500: '#2196F3',
// //     },
// //     error: {
// //       ...red,
// //       900: '#B71C1C',
// //     }
