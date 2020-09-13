import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Theme, WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export const mailFolderListItems = (
  <div>
    <ListItem button component={Link} to="/btd">
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="БТД" />
    </ListItem>
    <ListItem button component={Link} to="/nnn">
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="-1-" />
    </ListItem>
    <ListItem button disabled= {true}>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="-2-" />
    </ListItem>
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="-3-" />
    </ListItem>
  </div>
);