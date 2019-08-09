import React from 'react';
import { filter } from 'lodash';

import List from '../components/List';

export default function Search({ data, onStatusChange, match }) {
  const fData = filter(data, d => {
    let text = d.title.toLowerCase();
    return ~text.indexOf(match.params.text.toLowerCase());
  });
  return (
    <div>
      <List data={fData} onStatusChange={onStatusChange} />
    </div>
  );
}
