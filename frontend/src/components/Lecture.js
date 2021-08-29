const Lecture = (props) => {

    return (
        <div style = {{margin: '1vh', backgroundColor: '#E4EFE7', padding: '0.3vw', borderRadius: '10px', fontSize: '0.8vw', textAlign: 'center'}}>
               <span> {props.start} - {props.end}
                <br/>
                {props.subject}
                </span>
        </div>
    )
}

export default Lecture