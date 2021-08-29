import Lecture from "./Lecture"
const SingleDay = (props) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomStyle: 'solid',
            borderBottomWidth: '0.15em',
            borderBottomColor: '#E4EFE7',
            height: '10vh',
        }}>
            <div style={{width: '7vw', textAlign: 'center'}}>
            {props.day}
            </div>
            {
                props.lectures.map((item) =>  <Lecture start = {item['startTime']} end = {item['endTime']} subject = {item['subjectName']} key={item['startTime']}/>)
            }
        </div>
    )
}

export default SingleDay