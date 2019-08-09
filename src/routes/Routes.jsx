import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { filter, cloneDeep } from 'lodash';

import AppHeader from '../app-header/AppHeader';
import CurrentlyReading from '../containers/CurrentlyReading';
import WantToRead from '../containers/WantToRead';
import Read from '../containers/Read';
import Search from '../containers/Search';
import books from '../utils/books.json';

const Routes = () => {
  const [data, setData] = useState(books);
  const onStatusChange = (id, status) => {
    let copy = cloneDeep(data);
    copy = copy.map(c => {
      if (c.isbn === id) {
        c.readingStatus = status;
      }
      return c;
    });
    setData(copy);
  };
  return (
    <Router>
      <AppHeader>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <CurrentlyReading
                {...props}
                data={filter(data, { readingStatus: 'Currently Reading' })}
                onStatusChange={onStatusChange}
              />
            )}
          />
          <Route
            exact
            path="/want-to-read"
            render={props => (
              <WantToRead
                {...props}
                data={filter(data, { readingStatus: 'Want to Read' })}
                onStatusChange={onStatusChange}
              />
            )}
          />
          <Route
            exact
            path="/read"
            render={props => (
              <Read
                {...props}
                data={filter(
                  data,
                  b => !b.readingStatus || b.readingStatus === 'Read'
                )}
                onStatusChange={onStatusChange}
              />
            )}
          />
          <Route
            exact
            path="/search/:text"
            render={props => (
              <Search {...props} data={data} onStatusChange={onStatusChange} />
            )}
          />
          <Redirect from="*" to="/" />
        </Switch>
      </AppHeader>
    </Router>
  );
};

export default Routes;
