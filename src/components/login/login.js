import style from "./login.module.css"
import {reduxForm} from "redux-form";
import {Field} from "redux-form";
import {required} from "../utils/validations/main";
import {Input} from "../utils/forms/textarea";
import {connect} from "react-redux";
import {loginCreator, logoutCreator} from "../../redax/authReducer";
import {Redirect} from "react-router-dom";


let Login = (props) => {
    let onSubmit = (data) => {
        props.loginCreator(data.login,data.password,data.rememberMe)
    }
    if (props.isLog){
        return <Redirect to="/profile"/>
    }
    return (
        <div className={style.loginWrapper}>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}
let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[required]} placegolder="login" name={'login'} component={Input}/>
            </div>
            <div>
                <Field validate={[required]} placegolder="Password" name={'password'} component={Input}/>
            </div>
            <div>
                <Field type={"checkbox"} name={'rememberMe'} component={"input"}/>remember me
            </div>
            {props.error && <div className={style.fieldError}>{props.error}</div>}
            <div>
                <button>submit</button>
            </div>
        </form>
    )
}
let LoginReduxForm = reduxForm({form: "login"})(LoginForm)
let mapStateToProps = (state) => {
    return {
        isLog: state.auth.isLog
    }
}

export default connect(mapStateToProps,{loginCreator,logoutCreator})(Login)