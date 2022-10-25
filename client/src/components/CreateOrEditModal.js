import {
    Button,
    Modal,
    Form
} from 'react-bootstrap';

function CreateOrEditModal({ show, id, title, description, onTitleChange, onDescriptionChange, onModalHide, onFormSubmit, onButtonCloseClick }) {
    return (
        <Modal show={show} onHide={onModalHide}>
            <Form onSubmit={onFormSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="hidden" value={id} />
                    <Form.Group controlId="title">
                        <Form.Label>Judul</Form.Label>
                        <Form.Control type="text" value={title} onChange={onTitleChange} placeholder="isi judul..." />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Deskripsi</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={onDescriptionChange} placeholder="isi deskripsi..." />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onButtonCloseClick}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CreateOrEditModal;