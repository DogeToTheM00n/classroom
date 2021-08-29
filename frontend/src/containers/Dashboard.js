import SubjectCard from "../components/SubjectCard"
import { useState, useEffect } from "react"
const Dashboard = () => {
    const [Subjects, setSubjects] = useState([])
    useEffect(()=>{
        //axios call for setting state
        setSubjects([{subjectName: 'Computer Netoworks', teacherName: 'Jeevraj'}, {subjectName: 'Computer Net', teacherName: 'Jeevraj'}])
    }, [])
    return (
    <>
      <div className="topContainer" style={{width: '80%', margin: 'auto', marginTop: '3%'}}>
       {
           Subjects.map((item) => <SubjectCard subjectName = {item.subjectName} teacherName = {item.teacherName} key = {item.subjectName}/>)
       }
      </div>
    </>
    )
}

export default Dashboard;