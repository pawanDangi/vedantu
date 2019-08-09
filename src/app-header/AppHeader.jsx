import React, { useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router-dom';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  app: {
    marginBottom: 20
  },
  toolbar: {
    width: '100%'
  },
  tabs: {
    width: '50%'
  },
  search: {
    position: 'relative',
    width: '50%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
}));

function AppHeader(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [search, setSearch] = React.useState('');

  useEffect(() => {
    const path = props.location.pathname;
    if (path === '/') {
      setValue(0);
    } else if (path === '/want-to-read') {
      setValue(1);
    } else if (path === '/read') {
      setValue(2);
    } else {
      setValue(5);
    }
    setSearch(props.match.params.text || '');
  }, [props]);

  function handleChange(event, newValue) {
    setValue(newValue);

    if (newValue === 0) {
      props.history.push('/');
    } else if (newValue === 1) {
      props.history.push('/want-to-read');
    } else if (newValue === 2) {
      props.history.push('/read');
    } else {
      props.history.push('/');
    }
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function onSearch(e) {
    if (e.key === 'Enter') {
      props.history.push(`/search/${search}`);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.app}>
        <Toolbar className={classes.toolbar}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            className={classes.tabs}
          >
            <Tab label="Currently Reading" {...a11yProps(0)} />
            <Tab label="Want to Read" {...a11yProps(1)} />
            <Tab label="Read" {...a11yProps(2)} />
          </Tabs>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={search}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearch}
              onKeyDown={onSearch}
            />
          </div>
        </Toolbar>
      </AppBar>
      {props.children}
    </div>
  );
}

export default withRouter(AppHeader);
