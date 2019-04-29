import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

import ListWrapper from '../common/listWrapper';
import DialogWrapper from '../common/dialogWrapper';
import AddCardForm from './addCardForm';
import DeleteCard from './deleteCard';
import { getCards, setPrimaryCard, openDialog, closeDialog, exitDialog } from './cardsActions';
import { dialogs } from './cardsConstants';

const styles = theme => ({
  paper: {
    border: `1px solid ${theme.palette.custom.lightGrey}`,
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 6}px`,
    },
  },
  paperTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  paperTitle: {
    marginBottom: theme.spacing.unit * 3,
  },
  loaderContainer: {
    textAlign: 'center',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    margin: `${theme.spacing.unit * 2}px 0`,
    '&:first-child': {
      marginTop: 0,
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  chip: {
    marginLeft: 24
  },
  data: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  buttonContainer: {
    marginRight: -16,
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'start',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginRight: 0,
      marginTop: 0,
      flexDirection: 'column',
      textAlign: 'right',
      width: 'auto',
    }
  },
  button: {
    [theme.breakpoints.up('sm')]: {
      marginRight: -16,
    }
  },
  delete: {
    color: theme.palette.custom.red,
    '&:hover': {
      backgroundColor: 'rgba(255, 90, 95, 0.08)',
    },
  },
  addCardContainer: {
    marginTop: theme.spacing.unit * 4,
    textAlign: 'right',
  },
});

class Cards extends Component {

  handleDialogOpen = (dialog, id) => {
    this.props.openDialog(dialog, id);
  }

  handleDialogClose = () => {
    this.props.closeDialog();
  }

  handleDialogExited = () => {
    this.props.exitDialog();
  } 

  handleSetPrimary = (id) => {
    this.props.setPrimaryCard(id);
  }

  componentDidMount() {
    this.props.getCards();
  }

  render() {    
    const { classes, loading, error, dialog, dialogLoading, open } = this.props;

    const cards = this.props.cards ? this.props.cards.toJS() : null;
    const cardsIdArray = this.props.cards ? Object.keys(cards) : null;

    return (
      <Paper elevation={0} className={classes.paper}>
        <div className={classes.paperTitleContainer}>
          <Typography variant="h6" className={classes.paperTitle}>
            Métodos de pago
          </Typography>
        </div> 
        <ListWrapper
          list={cardsIdArray}
          loading={loading} 
          error={error} 
          noResultsText="Aun no tienes métodos de pago registrados"
        >
          {
            cardsIdArray && cardsIdArray.map((id, index) => {
              const item = cards[id];
              return(
                <React.Fragment key={item.id}>
                  <div className={classes.cardContainer}>
                    <div className={classes.infoContainer}>
                      <div>
                        <Typography variant="body2">
                          <span className={classes.capitalize}>{item.brand}</span> terminada en {item.cardNumber.slice(-4)} 
                        </Typography>
                        <Typography variant="body2" className={classes.data}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" className={classes.data}>
                          Vencimiento: {item.expiration}
                        </Typography>
                      </div>
                      <div>
                        { item.primary && (
                          <Chip
                            label="Principal" 
                            className={classes.chip} 
                            color="default" 
                          />
                        )}
                      </div>
                    </div>
                    <div className={classes.buttonContainer}>
                      <div>
                        <Button
                          color="primary"
                          onClick={() => this.handleDialogOpen(dialogs.DELETE_CARD_DIALOG, id)}
                          className={classNames(classes.button, classes.delete)}
                        >
                          Eliminar
                        </Button>
                      </div>
                      <div>
                        { !item.primary && (
                          <Button
                            color="primary"
                            onClick={() => this.handleSetPrimary(id)}
                            className={classes.button}
                          >
                            Usar como principal
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  { index != (cardsIdArray.length - 1) && (
                    <Divider />
                  )}
                </React.Fragment>
              )
            })
          }
        </ListWrapper>
        <DialogWrapper
          loading={dialogLoading} 
          open={open} 
          handleClose={this.handleDialogClose} 
          handleExited={this.handleDialogExited}
          disableFullScreen={dialog == dialogs.DELETE_CARD_DIALOG}>
          {{
            [dialogs.ADD_CARD_DIALOG]: (
              <AddCardForm handleClose={this.handleDialogClose} />
            ),
            [dialogs.DELETE_CARD_DIALOG]: (
              <DeleteCard handleClose={this.handleDialogClose} />
            ),
          }[dialog]}
        </DialogWrapper>
        <div className={classes.addCardContainer}>
          <Button
            size="small"
            color="primary"
            onClick={() => this.handleDialogOpen(dialogs.ADD_CARD_DIALOG)}
          >
            Agregar método de pago
          </Button>
        </div>
      </Paper>
    )
  }
}

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    loading: state.get('cards').get('getCardsLoading'),
    error: state.get('cards').get('getCardsError'),
    dialog: state.get('cards').get('dialog'),
    dialogLoading: state.get('cards').get('dialogLoading'),
    open: state.get('cards').get('openDialog'),
    cards: state.get('cards').get('cards'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ getCards }, dispatch),
    bindActionCreators({ setPrimaryCard }, dispatch),
    bindActionCreators({ openDialog }, dispatch),
    bindActionCreators({ closeDialog }, dispatch),
    bindActionCreators({ exitDialog }, dispatch),
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards)));