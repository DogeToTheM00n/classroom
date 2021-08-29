import Card from 'react-bootstrap/Card'
import YourWork from '../YourWork/YourWork'
const AssignmentDetail = (props) => {
    return (
        <>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '3% 0'}}>
        <div>
        <Card style={{ width: '40vw', margin: '15px', border: '1px solid #06442027',
        boxShadow: '1px 4px 8px 1px rgba(0,0,0,0.2)',
        borderRadius: '1%' }}>
            <Card.Body style={{ color: "#064420" }}>
                <Card.Title>{props.title}</Card.Title>
                <div style = {{height: '0.5vh', backgroundColor: '#E4EFE7', margin: '0.5vh 0'}}></div>
                <Card.Text style = {{fontSize: '0.9vw'}}>
                    <div>
                    <div>{props.teacherName} | {props.postdate}</div> 
                    <div>
                    <span>{props.points} points</span> <span style={{float: 'right'}}>{props.duedate}</span>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc semper posuere ante. Praesent iaculis semper placerat. Phasellus hendrerit, orci quis rutrum rhoncus, libero magna iaculis purus, sed dignissim leo urna non erat. Praesent a rutrum est. Aenean dui tortor, auctor at nibh vel, venenatis pulvinar nulla.
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
        </div>
        <div>
            <YourWork/>
        </div>
        </div>
        </>
    )
}

export default AssignmentDetail