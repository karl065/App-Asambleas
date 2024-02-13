/* eslint-disable react/prop-types */
import {VictoryLabel, VictoryPie} from 'victory';

const Pie = ({porcentajeData}) => {
  return (
    <svg viewBox="0 0 400 400" width="100%" height="100%">
      <VictoryPie
        standalone={false}
        animate={{duration: 1000}}
        width={400}
        height={400}
        data={[
          {x: 'Quórum', y: porcentajeData},
          {x: 'Faltante', y: 100 - porcentajeData},
        ]}
        innerRadius={120}
        cornerRadius={25}
        labels={() => null}
        style={{
          data: {
            fill: ({datum}) =>
              datum.x === 'Quórum'
                ? porcentajeData > 50
                  ? 'green'
                  : 'red'
                : 'transparent',
          },
        }}
      />
      <VictoryLabel
        textAnchor="middle"
        verticalAnchor="middle"
        x={200}
        y={200}
        text={`${Math.round(porcentajeData)}%`}
        style={{
          fontFamily: 'Arial',
          fontSize: 45,
          fontWeight: 'bold',
          stroke: 'white',
          fill: porcentajeData > 50 ? 'green' : 'red',
        }}
      />
    </svg>
  );
};

export default Pie;
