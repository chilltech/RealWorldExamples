import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles1 = theme => ({
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function CardSimple(props) {
  const { classes, className, title, subtitle, content, buttonName, onButtonActionClick, ...other } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        {title &&
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
        }
        {content &&
          <Typography className={classes.pos} color="textSecondary">
            {subtitle}
          </Typography>
        }
        {content &&
          <Typography component="p">
            {content}
          </Typography>
        }
      </CardContent>
      {buttonName &&
        <CardActions>
          <Button
            onClick={onButtonActionClick}
            size="small">
            {buttonName}
          </Button>
        </CardActions>
      }
    </Card>
  );
}

CardSimple.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  context: PropTypes.node,
  buttonName: PropTypes.node,
  onButtonActionClick: PropTypes.func
};

const myCard = withStyles(styles1)(CardSimple);
export { myCard as CardSimple }; 