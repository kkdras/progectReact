import style from "./login.module.css"
import {connect, useSelector} from "react-redux";
import {loginCreator, logoutCreator} from "../../redax/authReducer";
import {Redirect, useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";


let Login = (props) => {
    let history = useHistory()
    let isLog = useSelector(state => state.auth.isLog)
    let onSubmit = (data) => {
        props.loginCreator(data.login,data.password,data.rememberMe,data.captcha)
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
let LoginForm = (props) => {
    const { register, handleSubmit, formState: {errors}} = useForm();
    let captchaUrl = useSelector(state => state.auth.urlCaptcha)
    //console.log(errors)
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

export default connect(null,{loginCreator,logoutCreator})(Login)