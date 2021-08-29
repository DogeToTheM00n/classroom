
const SingleFile = (props) => {
    const deleteHandler = () => {
       //delete file request (axios)
       console.log('Deleted')
    }
    return  (
       <div style = {{width: '100%', height: '5.5vh', border: '1px solid #06442027'}}>
          <i className = "fas fa-file" style={{fontSize: '1.5vw', margin: '1vh'}}></i>
           <span>{props.filename}</span>
           <span style={{float: 'right', paddingTop: '1vh'}} onClick={deleteHandler}><i class="fas fa-trash" style={{padding: '1vh'}}></i></span>
       </div>
    )
}

export default SingleFile