import Swal from "sweetalert2";

export function Swalfire(handleAction: any) {
  return Swal.fire({
    title: "Deseja cancelar esta viagem?",

    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: "Sim",
    cancelButtonText: "Não",
    background: "#FAFAFA",
    cancelButtonColor: "#590bd8",
    confirmButtonColor: "#aaa",
    color: "#312a4f",
    focusCancel: true,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      handleAction();
    }
  });
}
