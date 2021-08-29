import styles from './TeacherEditOptions.module.css'
import EditSubjectModal from '../EditSubjectModal'
import { useState } from 'react'
const TeacherEditOptions = (props) => {
    const [show, setShow] = useState(false)
    const handleEdit = () => {
        //edit modal
        setShow(!show)
    }
    const handleDelete = () => {
        //axios subject deletion request
    }
    const handleScore = () => {
        //scoring page

    }
    
    const callback = () => {
        setShow(false)
    }
    return (
        <div style = {{display: 'flex', flexDirection: 'column', fontSize: '1.5vw', padding: '1vh', boxShadow: '1px 4px 8px 1px rgba(0,0,0,0.2)',
        borderRadius: '1%', margin: '1vw'}}>
            <i className={`fas fa-edit ${styles.icon}`} onClick = {handleEdit}></i>
            <i class={`fas fa-check-circle ${styles.icon}`} onClick = {handleScore}></i>
            <i class={`fas fa-trash-alt ${styles.icon}`} onClick = {handleDelete}></i>
            <EditSubjectModal show={show} callback={callback}/>
        </div>
    )
}

export default TeacherEditOptions