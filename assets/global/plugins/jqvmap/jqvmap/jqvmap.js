import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // !
 * jQVMap Version 1.0 
 *
 * http://jqvmap.com
 *
 * Copyright 2012, Peter Schmalfeldt <manifestinteractive@gmail.com>
 * Licensed under the MIT license.
 *
 * Fork Me @ https://github.com/manifestinteractive/jqvmap
  'jqvmap-label': {
    'position': 'absolute',
    'display': 'none',
    'WebkitBorderRadius': '3px',
    'MozBorderRadius': '3px',
    'borderRadius': '3px',
    'background': '#292929',
    'color': 'white',
    'fontFamily': 'sans-serif, Verdana',
    'fontSize': [{ 'unit': 'string', 'value': 'smaller' }],
    'padding': [{ 'unit': 'px', 'value': 3 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'px', 'value': 3 }]
  },
  'jqvmap-zoomin': {
    'position': 'absolute',
    'left': [{ 'unit': 'px', 'value': 10 }],
    'WebkitBorderRadius': '3px',
    'MozBorderRadius': '3px',
    'borderRadius': '3px',
    'background': '#000000',
    'padding': [{ 'unit': 'px', 'value': 3 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'px', 'value': 3 }],
    'color': 'white',
    'width': [{ 'unit': 'px', 'value': 10 }],
    'height': [{ 'unit': 'px', 'value': 10 }],
    'cursor': 'pointer',
    'lineHeight': [{ 'unit': 'px', 'value': 10 }],
    'textAlign': 'center'
  },
  'jqvmap-zoomout': {
    'position': 'absolute',
    'left': [{ 'unit': 'px', 'value': 10 }],
    'WebkitBorderRadius': '3px',
    'MozBorderRadius': '3px',
    'borderRadius': '3px',
    'background': '#000000',
    'padding': [{ 'unit': 'px', 'value': 3 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'px', 'value': 3 }, { 'unit': 'px', 'value': 3 }],
    'color': 'white',
    'width': [{ 'unit': 'px', 'value': 10 }],
    'height': [{ 'unit': 'px', 'value': 10 }],
    'cursor': 'pointer',
    'lineHeight': [{ 'unit': 'px', 'value': 10 }],
    'textAlign': 'center'
  },
  'jqvmap-zoomin': {
    'top': [{ 'unit': 'px', 'value': 10 }]
  },
  'jqvmap-zoomout': {
    'top': [{ 'unit': 'px', 'value': 30 }]
  },
  'jqvmap-region': {
    'cursor': 'pointer'
  },
  'jqvmap-ajax_response': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': 'px', 'value': 500 }]
  }
});
