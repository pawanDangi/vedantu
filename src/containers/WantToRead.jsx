import React from 'react';

import List from '../components/List';

export default function WantToRead({ data, onStatusChange }) {
  return (
    <div>
      <List data={data} onStatusChange={onStatusChange} />
    </div>
  );
}
