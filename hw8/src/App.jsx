import React from 'react';
import ReactDom from 'react-dom';
import EntryList from './EntryList.jsx';

var contentNode = document.getElementById('contents');

ReactDOM.render(<EntryList/>, contentNode); //render the component inside the contentNode