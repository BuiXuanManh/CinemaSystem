import {Form,Button} from 'react-bootstrap';

const ViewForm = ({handleSubmit,seatText,labelText,defaultValue}) => {
  return (

    <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{labelText}</Form.Label>
            <Form.Control ref={seatText} as="textarea" rows={3} defaultValue={defaultValue} />
        </Form.Group>
        <Button variant="outline-info" onClick={handleSubmit}>Bình luận</Button>
    </Form>   

  )
}

export default ViewForm
