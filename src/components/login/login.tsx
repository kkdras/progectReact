import style from "./login.module.css"
import { logIn, } from "../../redax/authReducer";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FC } from "react";
import { useTypesSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";


let Login = () => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let isLog = useTypesSelector(state => state.auth.isLog)
    let onSubmit = (data: DataType) => {
        debugger
        dispatch(logIn({
            email: data.login,
            password: data.password,
            rememberMe: data.rememberMe,
            captcha: data.captcha
        }))
    }
    if (isLog) {
        navigate("/profile", { replace: true })
    }
    return (
        <div className={style.loginWrapper}>
            <LoginForm onSubmit={onSubmit} />
        </div>
    )
}
interface DataType extends Record<string, any> {
    login: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormPropsType = {
    onSubmit: (data: DataType) => void
}


let LoginForm: FC<LoginFormPropsType> = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<DataType>();
    let captchaUrl = useTypesSelector(state => state.auth.urlCaptcha)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input {...register("login", { maxLength: { value: 25, message: "слишком много букв" } })} placeholder={"login"} name={'login'} />
                <span>{errors?.login?.message}</span>
            </div>
            <div>
                <input {...register("password")} placeholder={"password"} name={'password'} />
            </div>
            <div>
                <input type={"checkbox"} {...register("rememberMe")} name={'rememberMe'} />remember me
            </div>
            {!!captchaUrl && <img src={captchaUrl} alt="" />}
            {!!captchaUrl && <input type="text" {...register("captcha")} />}
            <div>
                <button>submit</button>
            </div>
        </form>
    )
}
export default Login

//export default connect(null,{loginCreator,logoutCreator})(Login)