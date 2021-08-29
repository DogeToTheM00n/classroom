import SubjectCard from "../components/SubjectCard"
import { useState, useEffect } from "react"
import axios from '../axiosClass'
const Dashboard = () => {
    const [Subjects, setSubjects] = useState([])
    useEffect(() => {
        //axios call for setting state
        const req = async () => {
            const response = await axios.get('/api/dashboard', {
                params: {
                    username: 'tp1201',
                    role: 0
                }
            })
            setSubjects(response.data.SubjectsArray)
        }
        req()
    }, [])
    return (
        <>
            <div className="topContainer" style={{ width: '80%', margin: 'auto', marginTop: '3%' }}>
                {
                    Subjects.map((item) => <SubjectCard subjectName={item.name} teacherName={item.teachersName} key={item.subjectID} />)
                }
            </div>
        </>
    )
}

export default Dashboard;