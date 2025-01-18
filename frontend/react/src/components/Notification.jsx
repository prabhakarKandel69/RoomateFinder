import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = (message, type = "success") => {
  if (message) {
    if (type === "success") {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000, // 2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }
};

export default Notification;
