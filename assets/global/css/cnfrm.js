import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'react-confirm-alert-blur': {
    'filter': 'url(#gaussian-blur)',
    'filter': 'blur(2px)',
    'WebkitFilter': 'blur(2px)'
  },
  'react-confirm-alert-overlay': {
    'position': 'fixed',
    'top': [{ 'unit': 'px', 'value': 0 }],
    'left': [{ 'unit': 'px', 'value': 0 }],
    'right': [{ 'unit': 'px', 'value': 0 }],
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'zIndex': '99',
    'background': 'rgba(255, 255, 255, 0.9)',
    'display': '-webkit-flex',
    'display': '-moz-flex',
    'display': '-ms-flex',
    'display': '-o-flex',
    'display': 'flex',
    'justifyContent': 'center',
    'MsAlignItems': 'center',
    'alignItems': 'center',
    'opacity': '0',
    'WebkitAnimation': 'react-confirm-alert-fadeIn 0.5s 0.2s forwards',
    'MozAnimation': 'react-confirm-alert-fadeIn 0.5s 0.2s forwards',
    'OAnimation': 'react-confirm-alert-fadeIn 0.5s 0.2s forwards',
    'animation': 'react-confirm-alert-fadeIn 0.5s 0.2s forwards'
  },
  'react-confirm-alert': {
    'fontFamily': 'Arial, Helvetica, sans-serif',
    'width': [{ 'unit': 'px', 'value': 400 }],
    'padding': [{ 'unit': 'px', 'value': 30 }, { 'unit': 'px', 'value': 30 }, { 'unit': 'px', 'value': 30 }, { 'unit': 'px', 'value': 30 }],
    'textAlign': 'left',
    'background': '#fff',
    'borderRadius': '10px',
    'boxShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 20 }, { 'unit': 'px', 'value': 75 }, { 'unit': 'string', 'value': 'rgba(0, 0, 0, 0.13)' }],
    'color': '#666'
  },
  'react-confirm-alert-svg': {
    'position': 'absolute',
    'top': [{ 'unit': 'px', 'value': 0 }],
    'left': [{ 'unit': 'px', 'value': 0 }]
  },
  'react-confirm-alert > h1': {
    'marginTop': [{ 'unit': 'px', 'value': 0 }]
  },
  'react-confirm-alert > h3': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'fontSize': [{ 'unit': 'px', 'value': 16 }]
  },
  'react-confirm-alert-button-group': {
    'display': '-webkit-flex',
    'display': '-moz-flex',
    'display': '-ms-flex',
    'display': '-o-flex',
    'display': 'flex',
    'justifyContent': 'flex-start',
    'marginTop': [{ 'unit': 'px', 'value': 20 }]
  },
  'react-confirm-alert-button-group > button': {
    'outline': 'none',
    'background': '#333',
    'border': [{ 'unit': 'string', 'value': 'none' }],
    'display': 'inline-block',
    'padding': [{ 'unit': 'px', 'value': 6 }, { 'unit': 'px', 'value': 18 }, { 'unit': 'px', 'value': 6 }, { 'unit': 'px', 'value': 18 }],
    'color': '#eee',
    'marginRight': [{ 'unit': 'px', 'value': 10 }],
    'borderRadius': '5px',
    'fontSize': [{ 'unit': 'px', 'value': 12 }]
  }
});
