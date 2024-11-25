import { toast } from "react-toastify";
import { StatusEnum } from "../../types/Status";

export const toasityComponent = (Message, status) => {
  switch (status) {
    case StatusEnum.SUCCESS:
      return toast.success(Message, {
        position: "top-center",
      });
    case StatusEnum.ERROR:
      return toast.error(Message, {
        position: "top-center",
      });
    case StatusEnum.WARNING:
      return toast.warning(Message, {
        position: "top-center",
      });
    case StatusEnum.INFO:
      return toast.info(Message, {
        position: "top-center",
      });  
    default:
      return toast.loading(Message, {
        position: "top-center",
      });
  }
};
