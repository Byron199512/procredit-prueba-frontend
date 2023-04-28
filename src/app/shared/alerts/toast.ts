import Swal from 'sweetalert2';
import { TYPE_ALERT } from './values.config';


export function basicAlert(title: string = '',icon = TYPE_ALERT.SUCCESS) {
    Swal.fire({
        title,
        icon,
        position: 'top',
        width:500,
        showConfirmButton: false,
        toast: true,
        timer: 5000,
        timerProgressBar: true
      });
}
