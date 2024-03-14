import Swal from 'sweetalert2';
import {
  setDebateActions,
  setInterventoresAction,
  setTimer,
} from '../redux/actions';

export const alertSuccess = (msg) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  Toast.fire({
    icon: 'success',
    title: msg,
  });
};

export const alertInfo = (msg) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  Toast.fire({
    icon: 'info',
    title: msg,
  });
};
export const alertWarning = (msg) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  Toast.fire({
    icon: 'warning',
    title: msg,
  });
};

export const alertIntervenciones = (DBConectada, interventores, debate) => {
  const Toast = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
  });

  Toast.fire({
    title: `Se acabo el tiempo de la ${debate}`,
    text: `¿Desea extender la ${debate}?`,
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#4CAF50',
    cancelButtonColor: '#FF5252',
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const {value: tiempo} = await Toast.fire({
        title: 'Ingrese el tiempo adicional',
        input: 'number',
        inputPlaceholder: 'Tiempo en segundos',
      });
      if (tiempo) {
        setTimer(tiempo, DBConectada);
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      if (debate === 'intervención') {
        Toast.fire({
          title: '¿Para esta intervención habrá replica?',
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#4CAF50',
          cancelButtonColor: '#FF5252',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
        }).then(async (result) => {
          if (result.isConfirmed) {
            setDebateActions('replica', DBConectada);
            const {value: tiempo} = await Toast.fire({
              title: 'Ingrese el tiempo de replica',
              input: 'number',
              inputPlaceholder: 'Tiempo en segundos',
            });
            if (tiempo) {
              setTimer(tiempo, DBConectada);
            }
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Toast.fire({
              title: 'Finalizado',
              text: 'Esta intervención a finalizado',
              confirmButtonColor: '#4CAF50',
              icon: 'success',
            });

            setDebateActions('', DBConectada);
            const nuevosInterventores = [...interventores];
            nuevosInterventores.shift();
            setInterventoresAction(nuevosInterventores, DBConectada);
          }
        });
      } else {
        Toast.fire({
          title: 'Finalizado',
          confirmButtonColor: '#4CAF50',
          text: 'Esta intervención a finalizado',
          icon: 'success',
        });
        setDebateActions('', DBConectada);
        const nuevosInterventores = [...interventores];
        nuevosInterventores.shift();
        setInterventoresAction(nuevosInterventores, DBConectada);
      }
    }
  });
};
