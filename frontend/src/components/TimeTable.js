import { useState, useEffect } from "react"
import SingleDay from "./SingleDay"
const TimeTable = () => {
    const [schedule, setSchedule] = useState({ 'Monday': [], 'Tuesday': [], 'Wednesday': [], 'Thursday': [], 'Friday': [], 'Saturday': [], 'Sunday': [] })

    useEffect(() => {
        setSchedule({ ...schedule, 'Monday': [{ 'startTime': '12:00', 'endTime': '13:00', 'subjectName': 'Computer Networks' }, { 'startTime': '12:00', 'endTime': '13:00', 'subjectName': 'Computer Networks' }, { 'startTime': '12:00', 'endTime': '13:00', 'subjectName': 'Computer Networks' }, { 'startTime': '12:00', 'endTime': '13:00', 'subjectName': 'Computer Networks' }, { 'startTime': '12:00', 'endTime': '13:00', 'subjectName': 'Computer Networks' }, { 'startTime': '12:00', 'endTime': '13:00', 'subjectName': 'Computer Networks' }, { 'startTime': '12:00', 'endTime': '13:00', 'subjectName': 'Computer Networks' }, { 'startTime': '12:00', 'endTime': '13:00', 'subjectName': 'Computer Networks' }] })
    }, [])
    return (
        <div style = {{backgroundColor: '#FDFAF6', width: '80%', margin: 'auto', paddingLeft: '1vw', paddingRight: '1vw', border: '1px solid #06442027',
        boxShadow: '1px 4px 8px 1px rgba(0,0,0,0.2)'}}>
            {
                Object.keys(schedule).map((key) => <SingleDay day = {key} lectures = {schedule[key]} key={key}/>)
            }
        </div>
    )
}

export default TimeTable