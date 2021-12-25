import style from "./login.module.css"
import {loginCreator, } from "../../redax/authReducer";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {FC} from "react";
import {useTypesSelector} from "../../types/hooks";
import {useDispatch} from "react-redux";


let Login = ({}) => {
    let dispatch = useDispatch()
    let history = useHistory()
    let isLog = useTypesSelector(state => state.auth.isLog)
    let onSubmit = (data:DataType) => {
        dispatch(loginCreator(data.login,data.password,data.rememberMe,data.captcha))
    }
    if (isLog){
        history.push("/profile")
    }
    return (
        <div className={style.loginWrapper}>
            <LoginForm onSubmit={onSubmit}/>
        </div>
    )
}
type DataType = {
    login: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormPropsType = {
    onSubmit: (data: DataType) => void
}

let LoginForm:FC<LoginFormPropsType>= (props) => {
    const { register, handleSubmit, formState: {errors}} = useForm();
    let captchaUrl = useTypesSelector(state => state.auth.urlCaptcha)
    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div>
                <input {...register("login",{maxLength:{value:25,message:"слишком много букв"}})} placeholder={"login"} name={'login'} />
                <span>{errors?.login?.message}</span>
            </div>
            <div>
                <input {...register("password")} placeholder={"password"} name={'password'} />
            </div>
            <div>
                <input type={"checkbox"} {...register("rememberMe")} name={'rememberMe'}/>remember me
            </div>
            {!!captchaUrl && <img src={captchaUrl} alt=""/>}
            {!!captchaUrl && <input type="text" {...register("captcha")}/>}
            <div>
                <button>submit</button>
            </div>
        </form>
    )
}
export default Login

//export default connect(null,{loginCreator,logoutCreator})(Login)