import s from "./dilogs.module.css"
import Massage from "./Massage/massage";
import Companion from "./Сompanion/companion";

function Dilogs() {

    let userData = [
        {id: 1, name: "Polina"},
        {id: 2, name: "Lina"},
        {id: 3, name: "Anastasy"},
        {id: 4, name: "Julya"},
        {id: 5, name: "Sofy"},
    ];

    let massageData = [
        {id: 1, massage: "Hi, how you are you?"},
        {id: 1, massage: "Good"},
    ]


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsWrapper}>
                {
                    userData.map(item => <Companion name={item.name} id={item.id} />)
                }
            </div>

            <div className={s.messageWrapper}>
                {
                    massageData.map(item => <Massage m={item.massage} id={item.id}/>)
                }
            </div>
        </div>
    )
}

export default Dilogs;