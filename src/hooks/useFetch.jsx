import { useState } from "react";

const useFetch = (setData, setLoading, setError, fetchFunction) => {

    const fetchData = async () => {
        console.log("fetchData");
        setLoading(true);
        try {
            const response = await (async () => fetchFunction)();
            setData(await response.json());
        } catch (error) {
            console.log("error = "+error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    if (fetchFunction) {
        fetchData();
    }
}

export default useFetch;