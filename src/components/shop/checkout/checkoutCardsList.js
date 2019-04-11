import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import { updateSelectedCard } from './checkoutActions';
import { Button } from '@material-ui/core';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  dialogContent: {
    padding: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 7,
    maxWidth: '100%',
    width: 500,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    marginLeft: 16,
    minWidth: 100,
    textAlign: 'right',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
});

class CheckoutCardsList extends React.Component {

  handleSelectedCard = (id) => {
    this.props.updateSelectedCard(id);
    this.props.handleClose();
  };

  render() {
    const { classes, handleClose, formError } = this.props;

    const cards = this.props.cards ? this.props.cards.toJS() : null;
    const cardsIdArray = this.props.cards ? Object.keys(cards) : null;

    return (
      <React.Fragment>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Cambiar método de pago
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent className={classes.dialogContent}>
          <Grid container direction="column" spacing={32}>
            { cards && (
              cardsIdArray.map((id, index) => {
                const card = cards[id];
                return(
                  <React.Fragment key={card.id}>
                    <Grid item className={classes.listItem}>
                      <div>
                        <Typography variant="body2">
                          <span className={classes.capitalize}>{card.brand}</span> terminada en {card.cardNumber.slice(-4)} 
                        </Typography>
                        <Typography variant="body2" className={classes.data}>
                          {card.name}
                        </Typography>
                        <Typography variant="body2" className={classes.data}>
                          Vencimiento: {card.expiration}
                        </Typography>
                      </div>
                      <div className={classes.buttonContainer}>
                        <Button 
                          color="primary" 
                          variant="outlined"
                          onClick={() => this.handleSelectedCard(card.id)}
                        >
                          Seleccionar
                        </Button>
                      </div>
                    </Grid>
                    { index != (cardsIdArray.length - 1) && (
                      <Divider />
                    )}
                  </React.Fragment>
                )
              })
            )}
          </Grid>
        </DialogContent>
      </React.Fragment>
    );
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    formError: state.get('checkout').get('error'),
    cards: state.get('checkout').get('cards'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ updateSelectedCard }, dispatch),
  );
}
 
export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutCardsList));