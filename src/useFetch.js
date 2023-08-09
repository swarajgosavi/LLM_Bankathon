import { useEffect, useState } from "react";

export default function useFetch(url, requestOptions) {

    const [data, setData] = useState();
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        console.log("Req")
        fetch(url, requestOptions)
        .then(res => {
            if(!res.ok) {
                throw Error('Could not fetch the data for that resource')
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            setData(data)
            setIsPending(false)
            setError(null)
        })
        .catch(err => {
            setError(err.message)
            setIsPending(false)
        })
            
    }, []);

    return { data, isPending, error }
}