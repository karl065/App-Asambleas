import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {VictoryLabel, VictoryPie} from 'victory';
import {setTimer} from '../../redux/actions';
import * as Yup from 'yup';
import Sound from 'react-sound';
import {useFormik} from 'formik';

const Timer = () => {
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(0);
  const time = useSelector((state) => state.asambleas.time);
  const DBConectada = useSelector((state) => state.asambleas.DBConectada);
  const [playBip, setPlayBip] = useState(false);
  const [playEndSound, setPlayEndSound] = useState(false);

  const validationSchema = Yup.object({
    tiempo: Yup.number().required('Campo obligatorio'),
  });

  const formik = useFormik({
    initialValues: {
      tiempo: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      setTimer(values.tiempo, DBConectada);
      resetForm({values: {tiempo: 0}});
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          if (prevTime <= 5) {
            setPlayBip(true);
          }
          return prevTime - 1;
        } else {
          clearInterval(interval);
          setPlayEndSound(true);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    setTimeLeft(time);
  }, [time]);

  const handleBipEnd = () => {
    setPlayBip(false);
  };

  const handleEndSoundEnd = () => {
    setPlayEndSound(false);
  };

  return (
    <div>
      {location.pathname === '/ControlAsambleas' && (
        <div>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <input
                type="number"
                name="tiempo"
                id="tiempo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tiempo}
                className={`bg-blue-700 border-4 font-bold border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-black dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  formik.touched.tiempo && formik.errors.tiempo
                    ? 'border-red-500'
                    : ''
                }`}
                placeholder="Tiempo"
              />
              {formik.touched.tiempo && formik.errors.tiempo ? (
                <div className="text-xs text-red-500">
                  {formik.errors.tiempo}
                </div>
              ) : null}
            </div>
            <button type="submit">Setear Timer</button>
          </form>
        </div>
      )}
      <div className="border border-white inline-block rounded-full overflow-hidden">
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <VictoryPie
            standalone={false}
            animate={{duration: 1000}}
            width={400}
            height={400}
            data={[
              {x: 'Tiempo', y: timeLeft},
              {x: 'Faltante', y: time - timeLeft},
            ]}
            innerRadius={120}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: {
                fill: ({datum}) =>
                  datum.x === 'Tiempo'
                    ? timeLeft > time / 2
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
            text={`${timeLeft}`}
            style={{
              fontFamily: 'Arial',
              fontSize: 45,
              fontWeight: 'bold',
              stroke: 'white',
              fill: timeLeft > time / 2 ? 'green' : 'red',
            }}
          />
        </svg>
      </div>
      {playBip && (
        <Sound
          url="/audios/bip_sound.mp3" // Ruta relativa al archivo de audio de bip
          playStatus={Sound.status.PLAYING}
          onFinishedPlaying={handleBipEnd}
        />
      )}
      {playEndSound && (
        <Sound
          url="/audios/end_sound.mp3" // Ruta relativa al archivo de audio de fin
          playStatus={Sound.status.PLAYING}
          onFinishedPlaying={handleEndSoundEnd}
        />
      )}
    </div>
  );
};

export default Timer;
