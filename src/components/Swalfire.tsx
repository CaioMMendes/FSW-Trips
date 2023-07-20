import Swal from "sweetalert2";

export function Swalfire(
  handleAction: any,
  title: string,
  html: string | string[],
  confirmText: string,
  cancelText: string,
  focusCancel: boolean,
  confirmColor: string,
  cancelColor: string
) {
  return Swal.fire({
    title,
    html,
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    background: "#FAFAFA",
    cancelButtonColor: confirmColor,
    confirmButtonColor: cancelColor,
    color: "#312a4f",
    focusCancel,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      handleAction();
    }
  });
}
