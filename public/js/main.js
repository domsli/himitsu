// Libraries
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

// JS
import Editor from './editor';

// Styles
import '../scss/style.scss';

$(document).ready(() => {
  ReactDOM.render(<Editor/>, document.getElementById("quill-editor"));
});
