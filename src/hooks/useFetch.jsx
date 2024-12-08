const useFetch = (setData, setLoading, setError, fetchFunction) => {

    const fetchData = async () => {
        console.log("fetchData");
        setLoading(true);
        try {
            const response = await fetchFunction();
            console.log("useFetch response = "+response.data);
            setData(response);
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