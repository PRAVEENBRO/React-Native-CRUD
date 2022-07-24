export const validate = (values) => {
    let err = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    console.log("valid---", values);


    if (!values.email) {
        err.email = "Email is required!";
    } else if (!regex.test(values.email)) {
        err.email = "This is not a valid email format!";
    }

    if (values.for === "signup" || values.for === "signin") {

        if (!values.password) {
            err.password = "Password is required";
        } else if (values.password.length < 4) {
            err.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            err.password = "Password cannot exceed more than 10 characters";
        }
    }

    if (values.for === "signup") {
        if (values.Comfpassword !== values.password) {
            err.Comfpassword = "password match failed"
        } else {
            return err;
        }

    }

    if (values.for === "adduser") {
        if (!values.place) {
            err.place = 'required'
        }
        if (!values.name) {
            err.name = 'required'
        }

        if (!values.phone) {
            err.phone = 'required'
        } else if (values.phone.length !== 9) {
            err.phone = 'check number'
        }
    }

    return err;
};