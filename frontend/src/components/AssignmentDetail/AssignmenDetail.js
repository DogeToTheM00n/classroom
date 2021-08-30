import Card from 'react-bootstrap/Card'
import YourWork from '../YourWork/YourWork'
import TeacherEditOptions from '../TeacherEditOptions/TeacherEditOptions'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
const AssignmentDetail = (props) => {
    const [state, setState] = useState(null)
    const user = useSelector((state) => state.user)
    useEffect(() => {
       const req = async () => {
           const response = await axios.get('/api/assignments', {
               asg_id: props.assignmentId,
               sub_id: props.subjectId,
               username: user.username,
               role: user.role
           })
           setState({
               title: response.data.Asg_array.asg.title,
               date: response.data.Asg_array.asg.date,
               deadline: response.data.Asg_array.asg.deadline, 
               description: response.data.Asg_array.asg.body,
               marks: response.data.User_makrs.marks,
               maxmarks: response.data.Asg_array.asg.points
           })
       }
       req()


    }, [])
    return (
        <>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '3% 0'}}>
        <div>
        <Card style={{ width: '40vw', margin: '15px', border: '1px solid #06442027',
        boxShadow: '1px 4px 8px 1px rgba(0,0,0,0.2)',
        borderRadius: '1%' }}>
            <Card.Body style={{ color: "#064420" }}>
                <Card.Title>{state.title}</Card.Title>
                <div style = {{height: '0.5vh', backgroundColor: '#E4EFE7', margin: '0.5vh 0'}}></div>
                <Card.Text style = {{fontSize: '0.9vw'}}>
                    <div>
                    <div>Posted on: {state.date}</div> 
                    <div>
                    <span>{state.marks} of {state.maxmarks}</span> <span style={{float: 'right'}}>{state.date}</span>
                    </div>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
        <Card style={{ width: '40vw', margin: '15px', border: '1px solid #06442027',
        boxShadow: '1px 4px 8px 1px rgba(0,0,0,0.2)',
        borderRadius: '1%' }}>
            <Card.Body style={{ color: "#064420" }}>
                <Card.Text style = {{fontSize: '0.9vw'}}>
                    <div>
                    {state.description}
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
        </div>
        <div>
            {/* <YourWork/> */}
            <TeacherEditOptions subjectId={subjectId} assignmentId = {assignmentId}/>
        </div>
        </div>
        </>
    )
}

export default AssignmentDetail