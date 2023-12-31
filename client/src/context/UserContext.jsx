import { useState, createContext, useEffect } from 'react'
import axios from "axios"


export const UserContext = createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});


export default function UserProvider(props) {

    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        tedList: [],
        errMsg: ""
    }


    const [userState, setUserState] = useState(initState)

    const [allTeds, setAllTeds] = useState([])

    const [allReviews, setAllReviews] = useState([])

   async function signup(creds){
    try {
        const res = await axios.post("/api/auth/signup", (creds))
        const {token, user} = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))

        setUserState({
          ...userState,
            token: token,
            user: user
        })
    } catch (err) {
        handleAuthErr(err.response.data.errMsg)
        console.log(err)
    }
    }

    async function login(creds){
        try {
            const res = await axios.post("/api/auth/login", creds)
            const {token, user} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState({
              ...userState,
                token: token,
                user: user
            })
            console.log('login succesful')
        } catch (err) {
            handleAuthErr(err.response.data.errMsg)
            console.log(err)
        }
    }

    function handleAuthErr(errMsg) {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg
        }))
    }

    function resetAuthErr() {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: ''
        })
        )
    }

    function logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: '',
            posts: [],
            errMsg: ''
        })
    }

    function addTed(inputs){
        userAxios.post("/api/main/ted", inputs)
        .then(res => {
            setAllTeds(prevTeds => {
                return [
                    ...prevTeds,
                    res.data
                ]
            })
        })
        .catch(err => console.err)
    }

    function deleteTed(id){
        userAxios.delete(`/api/main/ted/${id}`)
        .then(res => {
            setAllTeds(prevTeds=> prevTeds.filter(ted => id !== ted._id))
        })
        .catch(err => console.err)
    }

    useEffect(()=> {
        userAxios.get("/api/main/reviews")
        .then(res => setAllReviews(res.data))
        .catch(err => console.log(err))
    }, [])




    return (
        <UserContext.Provider value = {{allReviews, deleteTed, userAxios, addTed,signup, login, ...userState, resetAuthErr, logout, allTeds, setAllTeds, setAllReviews}}>
            {props.children}
        </UserContext.Provider>
    )
}