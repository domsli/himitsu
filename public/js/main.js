// Libraries
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

// JS
import Note from './note';

// Styles
import '../scss/style.scss';

$(document).ready(() => {
  ReactDOM.render(<Note/>, document.getElementById("note-react"));
});
