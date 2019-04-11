import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  link: {
    textDecoration: 'none',
  },
});

class LoaderButton extends Component {

  render(){
    const { classes, to } = this.props;

    return(
      <Link to={to} className={classes.link}>
        {this.props.children}
      </Link>
    )
  }
}

export default withStyles(styles)(LoaderButton);