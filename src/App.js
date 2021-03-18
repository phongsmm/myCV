import './App.css';
import React,{useState,useEffect} from 'react';
import { IoIosCafe ,IoMdMail,IoMdCall } from 'react-icons/io';
import { Button ,Card,Container,Row,Col,Jumbotron,Image,ListGroup,Tab,Pagination,Badge } from 'react-bootstrap';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
var QRCode = require('qrcode.react');

export default function App() {

  const [repo,setRepo]=useState([])
  const [currentpage,setcurrentpage] = useState(1)
  const [perpage,setperpage] = useState(3)
  const [slicerepo,setslicerepo] = useState([])
  const [firstvalue,setfirstvalue] = useState()
  

  useEffect(()=>{
    async function api(){
      let res = await axios.get("https://api.github.com/users/phongsmm/repos")
      setRepo(res.data)
    
      




      
    }
    api()
    
  },[])


  const indexOfLast = currentpage * perpage;
  const indexOfFirst = indexOfLast - perpage;
  const current = repo.slice(indexOfFirst,indexOfLast)
  const pagenum = Math.round(repo.length/perpage)
  let items = [];
  for (let number = 1; number <= pagenum; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentpage} onClick={()=>setcurrentpage(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  



  return (
<div style={{backgroundColor:'#00917c',paddingBottom:10}}>
   

<Jumbotron fluid style={{backgroundColor:'#433520',color:'#fde8cd'}}>
  <Container>
    <Row>
      <Col xs lg={2} style={{justifyContent:'center',alignItems:'center',padding:2}}>
      </Col>
      <Col md="auto">
      <h1>Phongpisut Meemuk <IoIosCafe color="#f8f5f1"/> </h1>
    <p>
      Everyday is learning
    </p>
      </Col>
    </Row>
  
   
  </Container>
</Jumbotron>

<Container>
  
<Row style={{marginTop:20}}>
    <Col>    <Card>
  <Card.Body>
    <Card.Title>Info</Card.Title>
    <Card.Text>
    <h5>Education </h5>
    <p style={{opacity:0.8}}>Thai-Nichi Institute of Technology
Faculty :  Information Technology (B.Sc.)</p>
<p style={{opacity:0.8}}>[ Bachelor ]  GPAX 3.45</p>
<p style={{opacity:0.8}}>      TOEIC : 625</p>
<h5>Internship </h5>
<p style={{opacity:0.8}}>IBMSD TH (Application Service Management Side)</p>
 


    </Card.Text>
    <Row >
  
      <Button variant="primary" href="mailto: me.phongpisut_st@tni.ac.th" style={{margin:5}}>Email <IoMdMail/> </Button>

      <Button variant="success" href="tel:+660965342482" style={{margin:5}}>Call : 0965342482 <IoMdCall/> </Button>

    </Row>
    
    
  </Card.Body>
</Card>
</Col>

    <Col><Card style={{ marginTop:10 }}>
  <Card.Body>
    <Card.Title>Github Repository</Card.Title>
    <Tab.Container id="list-group-tabs-example" defaultActiveKey={'#fastapi-mongodb-example'}>
  <Row>
    <Col sm={4}>
      <ListGroup>
      {current.map((i,v)=>        
      <ListGroup.Item action href={`#${i.name}`}  key={`${i.name}`} >
          {` ID ${i.id}`}
        </ListGroup.Item> )}

      </ListGroup>
      <Pagination style={{alignSelf:'center' , marginTop:5}}>{items}</Pagination>
    </Col>
    <Col sm={8}>

      <Tab.Content>
      {repo.map((i,v)=>
      <Tab.Pane eventKey={`#${i.name}`} key={`${i.name}`}>
            <Container>
              <Row>
           
              <Col xs={6}>
                <Row>{i.name}</Row>
                <Row> <Badge variant="info">{i.language}</Badge> </Row>
                <Row style={{opacity:0.6,fontSize:12}}> Created at : {i.created_at}  </Row>
                
              </Col>
              <Col md="auto" style={{justifyContent:'center',alignItems:'end'}}> 
              <QRCode value={i.html_url} size={80}/>
              </Col>
            </Row>
            </Container>
  
          </Tab.Pane>)}
            

      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
    

  </Card.Body>
</Card></Col>
  </Row>
</Container>
  </div>





  );
}
