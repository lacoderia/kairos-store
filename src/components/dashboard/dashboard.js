import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

import Snackbar from '../notification/snackbar';
import { getSummary, getMonthDetail, closeNotification, exitNotification } from './dashboardActions';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    height: 48,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    height: 'auto',
  },
  container: {
    padding: `${theme.spacing.unit * 4}px 0`,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing.unit * 6,
    },
  },
  title: {
    fontWeight: 500,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 4,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing.unit * 0,
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 3,
    },
  },
  paper: {
    border: `1px solid ${theme.palette.custom.lightGrey}`,
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 6}px`,
    },
  },
  fullHeight: {
    height: '100%',
  },
  paperTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.unit * 4,
  },
  table: {
    margin: `0 -${theme.spacing.unit * 4}px`,
    width: `calc(100% + ${theme.spacing.unit * 8}px)`,
    [theme.breakpoints.up('sm')]: {
      margin: 0,
      width: '100%',
    },
  },
  tableHead: {
    height: 48,
  },
  detailButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  detailButton: {
    marginRight: 16,
    textTransform: 'capitalize',
  },
});

class DashboardView extends Component {

  getMonthDetail = (month) => {
    this.props.getMonthDetail(month, this.props.email);
  }

  handleNotificationClose = () => {
    this.props.closeNotification();
  }

  handleNotificationExit = () => {
    this.props.exitNotification();
  }

  componentDidMount() {
    this.props.getSummary();
  }

  render() {
    const { classes, loading, error, loadingEmail, snackbarMessage, snackbarErrorMessage, openSnackbar } = this.props;
    const summary = this.props.summary ? this.props.summary.toJS() : null;

    return (
      <Grid container 
        justify="center"
        className={classNames(classes.root, classes.container)}
      >
        <Grid item xs={12} xl={9}>
          <Typography variant="h5" className={classes.title}>
            Resumen
          </Typography>
          {
            summary && (
              <Grid 
                container 
                alignContent="stretch"
                spacing={32}
              >
                <Grid item xs={12} lg={6}>
                  <Paper elevation={0} className={classNames(classes.paper, classes.fullHeight)}>
                    <div>
                      <div className={classes.paperTitleContainer}>
                        <Typography variant="h6" className={classes.paperTitle}>
                          Omein
                        </Typography>
                        <Typography variant="subtitle1" className={classes.paperTitle}>
                          Rango máximo: {summary.ranks.max}
                        </Typography>
                      </div>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow className={classes.tableHead}>
                            <CustomTableCell></CustomTableCell>
                            <CustomTableCell align="right">{summary.current_month.name}</CustomTableCell>
                            <CustomTableCell align="right">{summary.previous_month.name}</CustomTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <CustomTableCell>Vol. personal</CustomTableCell>
                            <CustomTableCell align="right">{summary.current_month.omein_vp}</CustomTableCell>
                            <CustomTableCell align="right">{summary.previous_month.omein_vp}</CustomTableCell>
                          </TableRow>
                          <TableRow>
                            <CustomTableCell>Vol. grupal</CustomTableCell>
                            <CustomTableCell align="right">{summary.current_month.omein_vg}</CustomTableCell>
                            <CustomTableCell align="right">{summary.previous_month.omein_vg}</CustomTableCell>
                          </TableRow>
                          <TableRow>
                            <CustomTableCell>Rango calificado</CustomTableCell>
                            <CustomTableCell align="right">-</CustomTableCell>
                            <CustomTableCell align="right">{summary.ranks.previous}</CustomTableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Paper elevation={0} className={classNames(classes.paper, classes.fullHeight)}>
                    <div>
                      <div className={classes.paperTitleContainer}>
                        <Typography variant="h6" className={classes.paperTitle}>
                          Prana
                        </Typography>
                      </div>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow className={classes.tableHead}>
                            <CustomTableCell></CustomTableCell>
                            <CustomTableCell align="right">{summary.current_month.name}</CustomTableCell>
                            <CustomTableCell align="right">{summary.previous_month.name}</CustomTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <CustomTableCell>Vol. personal</CustomTableCell>
                            <CustomTableCell align="right">{summary.current_month.prana_vp}</CustomTableCell>
                            <CustomTableCell align="right">{summary.previous_month.prana_vp}</CustomTableCell>
                          </TableRow>
                          <TableRow>
                            <CustomTableCell>Vol. grupal</CustomTableCell>
                            <CustomTableCell align="right">{summary.current_month.prana_vg}</CustomTableCell>
                            <CustomTableCell align="right">{summary.previous_month.prana_vg}</CustomTableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            )
          }
        </Grid>
        <Grid item xs={12} xl={9}>
          <Typography variant="h5" className={classes.title} style={{marginTop: 40}}>
            Detalle de volumen
          </Typography>
          <Paper elevation={0} className={classes.paper}>
            { summary && (
              <React.Fragment>
                <div className={classes.paperTitleContainer}>
                  <Typography variant="subtitle1" className={classes.paperTitle}>
                    Selecciona un mes para recibir el detalle en tu correo electrónico registrado.
                  </Typography>
                </div>
                <div className={classes.detailButtonsContainer}>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={() => this.getMonthDetail(summary.previous_month)}
                    className={classes.detailButton}
                  >
                    {summary.previous_month.name}
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={() => this.getMonthDetail(summary.current_month)}
                    className={classes.detailButton}
                  >
                    {summary.current_month.name}
                  </Button>
                  { loadingEmail && (
                    <CircularProgress size={24} className={classes.progress} />
                  )}
                </div>
                <Snackbar 
                  open={openSnackbar} 
                  variant={snackbarErrorMessage ? 'error' : 'success'}
                  message={snackbarErrorMessage ? snackbarErrorMessage : snackbarMessage}
                  handleClose={this.handleNotificationClose}
                  handleExit={this.handleNotificationExit}
                />
                
              </React.Fragment>
            )}
          </Paper>
        </Grid>
      </Grid>
    )
  }
  
};

const mapStateToProps = function mapStateToProps(state, props) {
  return {
    email: state.get('session').get('email'),
    summary: state.get('dashboard').get('summary'),
    loading: state.get('dashboard').get('loading'),
    error: state.get('dashboard').get('error'),
    loadingEmail: state.get('dashboard').get('loadingEmail'),
    openSnackbar: state.get('dashboard').get('openSnackbar'),
    snackbarMessage: state.get('dashboard').get('snackbarMessage'),
    snackbarErrorMessage: state.get('dashboard').get('snackbarErrorMessage'),
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign({},
    bindActionCreators({ getSummary }, dispatch),
    bindActionCreators({ getMonthDetail }, dispatch),
    bindActionCreators({ closeNotification }, dispatch),
    bindActionCreators({ exitNotification }, dispatch),
  );
}

export default withStyles(styles)((connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardView)));