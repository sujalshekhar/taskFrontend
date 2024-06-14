import { useEffect } from "react";
import { usePostCall } from "./api/apiCaller";
import { useDispatch } from "react-redux";
import { changeUserData } from "../store/slice/user.slice";
import { useNavigate } from "react-router-dom";

const useLoginUser = () => {
    const URL = `${process.env.REACT_APP_BASE_URL}/api/user/login`;
    const {data, loading, error, callApi} = usePostCall(URL);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(loading) return;
        if(error === true) {
            navigate("/login");
            return;
        }
        if(data) {
            console.log("Data", data)
            if(!data?.data) {
                navigate("/login");
                return;
            }
            localStorage.setItem("token", data?.headers?.authorization);
            console.log("User Logged In", data?.data);
            dispatch(changeUserData(data?.data));
            navigate("/");
        }
    }, [data, loading, error]);

    const loginUser = async (body) => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": token,
            },
        };

        callApi(body, config);
    }

    return {data, loading, error, loginUser};
}

export default useLoginUser;