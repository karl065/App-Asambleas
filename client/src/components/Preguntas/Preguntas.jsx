/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from 'victory';
import {getRandomColor} from '../../helpers/ColorAleatorio';

const Preguntas = ({pregunta}) => {
  const activos = useSelector((state) => state.asambleas.usuariosActivos);
  const [dataPreguntas, setDataPreguntas] = useState([]);

  const transformPreguntas = () => {
    const respuestas = pregunta.respuestas.map((respuesta) => ({
      x: respuesta.respuesta,
      y: respuesta.conteo,
      color: getRandomColor(),
    }));
    setDataPreguntas(respuestas);
  };

  useEffect(() => {
    transformPreguntas();
  }, [pregunta]);

  return (
    <div className="uppercase bg-white inline-block max-w-md p-2 rounded-lg shadow-md">
      <div className="border-2 border-black p-2 w-full h-full rounded-lg bg-black text-white space-y-2">
        <h1 className="font-bold">{pregunta.pregunta}</h1>
        <hr className="border-t-2 border-white" />
        <div>
          <VictoryChart
            domainPadding={{x: 100}}
            width={400}
            theme={VictoryTheme.material}
            style={{
              parent: {
                border: '2px solid white',
                borderRadius: 15,
              },
            }}
          >
            <VictoryBar
              alignment="center"
              cornerRadius={5}
              style={{
                labels: {fill: 'white'},
                data: {
                  fill: ({datum}) => datum.color,
                  width: 25,
                  stroke: 'white',
                  strokeWidth: 2,
                },
              }}
              labels={dataPreguntas.map((data) => data.y)}
              labelComponent={
                <VictoryLabel
                  style={{
                    fill: 'white',
                    fontWeight: 'bold',
                    stroke: 'blue',
                    fontSize: 30,
                    fontFamily: 'Arial',
                  }}
                />
              }
              data={dataPreguntas}
              x="x"
              y="y"
            />
            <VictoryAxis
              tickValues={dataPreguntas.map((data) => data.x)}
              tickLabelComponent={
                <VictoryLabel
                  style={{
                    fill: 'white',
                    fontWeight: 'bold',
                    stroke: 'blue',
                    fontSize: 20,
                    fontFamily: 'Arial',
                  }}
                />
              }
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(tick) => `${tick}`}
              label="Votos"
              tickLabelComponent={
                <VictoryLabel
                  style={{
                    fill: 'white',
                    fontWeight: 'bold',
                    stroke: 'blue',
                    fontSize: 15,
                    fontFamily: 'Arial',
                  }}
                />
              }
              axisLabelComponent={
                <VictoryLabel
                  style={{
                    fill: 'white',
                    fontWeight: 'bold',
                    stroke: 'blue',
                    fontSize: 20,
                    fontFamily: 'Arial',
                  }}
                />
              }
              tickValues={[...Array(activos + 1).keys()]}
              style={{
                grid: {stroke: 'gray', strokeWidth: 0.5},
                tickLabels: {fill: 'white', padding: 10},
                axis: {fill: 'white', stroke: 'gray'},
                axisLabel: {fill: 'white', padding: 30},
              }}
            />
          </VictoryChart>
        </div>
      </div>
    </div>
  );
};

export default Preguntas;
