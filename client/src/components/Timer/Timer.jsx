/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {VictoryLabel, VictoryPie} from 'victory';
import {setTimer} from '../../redux/actions';
import * as Yup from 'yup';
import AudioPlayer from 'react-audio-player';
import {useFormik} from 'formik';
import {setTime} from '../../redux/appSlice';
import {FaCaretSquareRight} from 'react-icons/fa';

const Timer = () => {
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(0);
  const dispatch = useDispatch();
  const time = useSelector((state) => state.asambleas.time);
  const DBConectada = useSelector((state) => state.asambleas.DBConectada);
  const [playBip, setPlayBip] = useState(false);
  const [playEndSound, setPlayEndSound] = useState(false);
  const [loaded, setLoaded] = useState(false);

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

  useEffect(() => {
    if (loaded) {
      setPlayBip(false);
      setPlayEndSound(false);
    } else {
      setLoaded(true);
    }
  }, [loaded]);

  const handleBipEnd = () => {
    setPlayBip(false);
  };

  const handleEndSoundEnd = () => {
    setPlayEndSound(false);
  };

  useEffect(() => {
    if (timeLeft === 0) dispatch(setTime(timeLeft));
  }, [timeLeft]);

  return (
    <div className="space-y-2">
      {location.pathname === '/ControlAsambleas' && (
        <div>
          <form className="flex space-x-2" onSubmit={formik.handleSubmit}>
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
            <button type="submit">
              <FaCaretSquareRight size={24} style={{color: 'blue'}} />
            </button>
          </form>
        </div>
      )}
      {location.pathname === '/ControlAsambleas' && (
        <hr className="border-4 rounded-2xl" />
      )}
      <div className="inline-block overflow-hidden border-2 border-black rounded-full">
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
      {location.pathname === '/view' && (
        <div>
          {playBip && (
            <AudioPlayer
              autoPlay
              src="/audios/bip_sound.mp3" // Ruta relativa al archivo de audio de bip
              onEnded={handleBipEnd}
              controls={true}
              style={{display: 'none'}}
            />
          )}
          {playEndSound && (
            <AudioPlayer
              autoPlay
              src="/audios/end_sound.mp3" // Ruta relativa al archivo de audio de fin
              onEnded={handleEndSoundEnd}
              controls={true}
              style={{display: 'none'}}
            />
          )}
        </div>
      )}
      {location.pathname === '/ControlAsambleas' && (
        <hr className="border-4 rounded-2xl" />
      )}
    </div>
  );
};

export default Timer;
