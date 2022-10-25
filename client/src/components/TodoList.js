import {
    Row,
    Col,
    Button,
    Card
} from 'react-bootstrap';

function TodoList({ todos, onDelete, onGetEdit }) {
    return todos.map((item, i) => {
        return (
            <Row key={i} className='mt-1'>
                <Col xs={12} md={12} sm={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                            <hr></hr>
                            <Button variant="danger" className="float-right mr-2" onClick={() => { onDelete(item._id) }}>Hapus</Button>
                            <Button variant="warning" className="float-right mr-2" onClick={() => { onGetEdit(item._id) }}>Ubah</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
        )
    })
}

export default TodoList;