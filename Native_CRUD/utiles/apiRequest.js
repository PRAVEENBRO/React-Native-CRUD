import axios from "axios"

export const Postmethod = async(url, payload) => {

    try {

        const resp = await axios.post(url, payload)
        console.log("try")
        return resp
    } catch (err) {
        console.log("err")

        return err
    }

}

