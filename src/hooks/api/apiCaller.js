import { useState } from "react"
import axios from "axios"

const useGetCall = (URL) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const callApi = async () => {
        setLoading(true);
        try {
            const response = await axios.get(URL);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    return { data, loading, error, callApi }
}

const usePostCall = (URL) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const callApi = async (body, config) => {
        setLoading(true);
        try {
            const response = await axios.post(URL, body, config);
            setData(response);
            setError(false);
            setLoading(false);
            console.log("Data", response.data)
        } catch (error) {
            setError(true);
            setLoading(false);
            console.log("Error", error)
        }
    }

    return { data, loading, error, callApi }
}

const usePutCall = (URL) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const callApi = async (body) => {
        setLoading(true);
        try {
            const response = await axios.put(URL, body);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    return { data, loading, error, callApi }
}

const useDeleteCall = (URL) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const callApi = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(URL);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    return { data, loading, error, callApi }
}

export { useGetCall, usePostCall, usePutCall, useDeleteCall }