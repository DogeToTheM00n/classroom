import { useState, useEffect } from "react"
import SingleDay from "./SingleDay"
import { useSelector } from "react-redux"
import axios from '../axiosClass'
import { Redirect } from "react-router"
const TimeTable = () => {
    const [schedule, setSchedule] = useState({ 'Monday': [], 'Tuesday': [], 'Wednesday': [], 'Thursday': [], 'Friday': [], 'Saturday': [], 'Sunday': [] })
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
        const req = async () => {
            const response = await axios.get('api/calender', {
                params: {
                    role: user.role,
                    username: user.username
                }
            })
            const temp = { 'Monday': [], 'Tuesday': [], 'Wednesday': [], 'Thursday': [], 'Friday': [], 'Saturday': [], 'Sunday': [] }
            response.data.forEach(element => {
                const subname = element.subjectName;
                element.lectureSchemaArray.forEach(ele => {
                    const obj = {}
                    obj['startTime'] = ele.lecture['startTime']
                    obj['endTime'] = ele.lecture['endTime']
                    obj['subjectName'] = subname
                    obj['id'] = ele.lecture['_id']
                    temp[ele.lecture['day']].push(obj)
                });
            });
            Object.keys(temp).map((key) => {
                temp[key].sort((a, b) => {
                    let fa = new Date("1970-01-01 " + a.startTime + ":00"),
                        fb = new Date("1970-01-01 " + b.startTime + ":00");

                    if (fa > fb) {
                        return 1;
                    }
                    if (fa < fb) {
                        return -1;
                    }
                    return 0;
                })
            })
            setSchedule(temp);

        }
        if (auth)
            req()
    }, [])
    return (
        <>
            {!auth ? <Redirect to="/" /> : null}
            {auth ?
                <>
                    <div style={{
                        backgroundColor: '#FDFAF6', width: '80%', margin: 'auto', marginTop: '3%', paddingLeft: '1vw', paddingRight: '1vw', border: '1px solid #06442027',
                        boxShadow: '1px 4px 8px 1px rgba(0,0,0,0.2)'
                    }}>
                        {
                            Object.keys(schedule).map((key) => <SingleDay day={key} lectures={schedule[key]} key={key} />)
                        }
                    </div>
                </> : null}
        </>
    )
}

export default TimeTable