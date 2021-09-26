import React from 'react';

import { VictoryAxis, VictoryLine, VictoryLabel } from 'victory';

const addSeconds = (startTime, seconds) => {
  return new Date(startTime.getTime() + seconds * 1000);
};

export default class CustomTheme extends React.Component {
  startTimeOne = new Date();

  render() {
    const styles = this.getStyles();
    const dataSetOne = this.getDataSetOne();
    const tickValues = this.getTickValues();

    return (
      <svg style={styles.parent} viewBox="0 0 450 350">
        <rect x="0" y="0" width="10" height="30" fill="#f01616" />
        <VictoryLabel x={25} y={24} style={styles.title} text="Performance" />

        <g transform={'translate(0, 40)'}>
          {/* Add shared independent axis */}
          <VictoryAxis
            scale="time"
            standalone={false}
            style={styles.axisSeconds}
            tickValues={tickValues}
            tickFormat={(x) => {
              if (x % 5 === 0) {
                return x;
              }
            }}
          />

          <VictoryAxis
            dependentAxis
            domain={[0, 20]}
            offsetX={50}
            orientation="left"
            standalone={false}
            style={styles.axisOne}
          />

          <VictoryLine
            data={dataSetOne}
            domain={{
              x: [this.startTimeOne, addSeconds(this.startTimeOne, 30)],
              y: [0, 20]
            }}
            interpolation="monotoneX"
            scale={{ x: 'time', y: 'linear' }}
            standalone={false}
            style={styles.lineOne}
          />
        </g>
      </svg>
    );
  }

  getDataSetOne() {
    return [
      { x: addSeconds(this.startTimeOne, 0), y: 12.6545 },
      { x: addSeconds(this.startTimeOne, 1), y: 12 },
      { x: addSeconds(this.startTimeOne, 2), y: 10 },
      { x: addSeconds(this.startTimeOne, 3), y: 11 },
      { x: addSeconds(this.startTimeOne, 4), y: 5 },
      { x: addSeconds(this.startTimeOne, 5), y: 4 },
      { x: addSeconds(this.startTimeOne, 6), y: 6 },
      { x: addSeconds(this.startTimeOne, 7), y: 5 },
      { x: addSeconds(this.startTimeOne, 8), y: 7 },
      { x: addSeconds(this.startTimeOne, 9), y: 8 },
      { x: addSeconds(this.startTimeOne, 10), y: 9 },
      { x: addSeconds(this.startTimeOne, 11), y: 1.5 },
      { x: addSeconds(this.startTimeOne, 12), y: 4 },
      { x: addSeconds(this.startTimeOne, 13), y: 5 },
      { x: addSeconds(this.startTimeOne, 14), y: 1 },
      { x: addSeconds(this.startTimeOne, 15), y: 2 },
      { x: addSeconds(this.startTimeOne, 16), y: 5 }
    ];
  }

  getTickValues() {
    const list = [];

    for (let i = 0; i <= 30; i++) {
      list.push(i);
    }

    return list;
  }

  getStyles() {
    const BLUE_COLOR = '#00a3de';

    return {
      parent: {
        background: '#ccdee8',
        boxSizing: 'border-box',
        display: 'inline',
        padding: 0,
        fontFamily: "'Fira Sans', sans-serif"
      },
      title: {
        textAnchor: 'start',
        verticalAnchor: 'end',
        fill: '#000000',
        fontFamily: 'inherit',
        fontSize: '18px',
        fontWeight: 'bold'
      },

      // INDEPENDENT AXIS
      axisSeconds: {
        grid: {
          stroke: ({ tick }) => (tick % 5 === 0 ? 'black' : 'transparent'),
          strokeWidth: 1
        },
        axis: { stroke: 'black', strokeWidth: 1 },
        ticks: {
          size: ({ tick }) => {
            const tickSize = tick % 5 === 0 ? 10 : 5;
            return tickSize;
          },
          stroke: 'black',
          strokeWidth: 1
        },
        tickLabels: {
          fill: 'black',
          fontFamily: 'inherit',
          fontSize: 12
        }
      },

      // DATA SET ONE
      axisOne: {
        grid: {
          stroke: ({ tick }) => 'black',
          strokeWidth: 1
        },
        axis: { stroke: 'black', strokeWidth: 0 },
        ticks: { strokeWidth: 1 },
        tickLabels: {
          fill: 'black',
          fontFamily: 'inherit',
          fontSize: 12
        }
      },
      labelOne: {
        fill: BLUE_COLOR,
        fontFamily: 'inherit',
        fontSize: 12,
        fontStyle: 'italic'
      },
      lineOne: {
        data: { stroke: BLUE_COLOR, strokeWidth: 2.5 }
      },
      axisOneCustomLabel: {
        fill: BLUE_COLOR,
        fontFamily: 'inherit',
        fontWeight: 300,
        fontSize: 21
      }
    };
  }
}
