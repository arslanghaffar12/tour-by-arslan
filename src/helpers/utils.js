const { toast } = require("react-toastify")

export function toastFunction(message, situation) {
    situation((message),{
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
    })
   
}

