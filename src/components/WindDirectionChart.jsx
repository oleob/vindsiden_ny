import React, { Component } from 'react';

class WindDirectionChart extends Component {
  state = {
    data: {}
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { dataPoints } = this.props;
      if (dataPoints.length > 0) {
        const firstX = dataPoints[0].date.valueOf();
        const lastX = dataPoints[dataPoints.length - 1].date.valueOf();
        const xLength = lastX - firstX;
        const directions = dataPoints.map(point => {
          const x = 60 + (910 * (point.date.valueOf() - firstX)) / xLength;
          return {
            x,
            direction: point.direction
          };
        });
        this.setState({
          data: directions
        });
      }
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div className="windDirectionChart">
        {data.length > 0 && (
          <div>
            <h3>Vindretning</h3>
            <svg viewBox="0 0 1000 50">
              {data.map((point, i) => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 300 300"
                  width="20"
                  height="20"
                  x={point.x}
                  key={i}
                >
                  <defs />
                  <g
                    id="Layer_2"
                    data-name="Layer 2"
                    transform={`rotate(${180 + point.direction}, 150, 150)`}
                  >
                    <polygon
                      className="cls-1"
                      points="50 200 0 150 150 0 300 150 250 200 190 140 190 300 110 300 110 140 50 200"
                      id="Layer_1-2"
                      data-name="Layer 1"
                    />
                  </g>
                </svg>
              ))}
            </svg>
          </div>
        )}
      </div>
    );
  }
}

export default WindDirectionChart;
