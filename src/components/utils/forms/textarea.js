import style from "./forms.module.css"
export let Textarea = ({input,meta, ...props}) => {
    return (
        <div className={""}>
            <textarea {...input} {...props}/>
            {meta.touched && ( meta.error && <span className={style.spanError}>{meta.error}</span>)}
        </div>
    )
}

export let Input = ({input,meta, ...props}) => {
    return (
        <div className={""}>
            <input {...input} {...props}/>
            {meta.touched && ( meta.error && <span className={style.spanError}>{meta.error}</span>)}
        </div>
    )
}

