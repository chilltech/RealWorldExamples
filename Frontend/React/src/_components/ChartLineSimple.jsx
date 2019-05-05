import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

const styles1 = theme => ({
  });
  
function ChartLineSimple(props) {
    const { classes, className, lineData, ...other } = props;
  return (
      
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={320}>
      <LineChart data={lineData}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Visits" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Orders" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

ChartLineSimple.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    lineData: PropTypes.node,
  };

const chart = withStyles(styles1)(ChartLineSimple);
export { chart as ChartLineSimple }; 