import axios from "axios";

const Logger = {
    currentUser: "",
    log(msg) {
        axios.post(`http://localhost:8000/logger`, {log: msg})
          .catch(e => {
            console.log("error sending log");
            console.error(e);
          });
    }
  };
  export default Logger;
  