import React, { useState } from 'react';
import { Form, Button, FormControl, InputGroup } from 'react-bootstrap';

const SendMessageForms = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    return (
        <Form onSubmit={e => {
            e.preventDefault();
            sendMessage(message);
            setMessage('');
        }}>
            <InputGroup>
                <FormControl
                    type="text"
                    placeholder="Message..."
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                />
                <Button
                    variant="primary"
                    type="submit"
                    disabled={!message}
                >
                    Send
                </Button>
            </InputGroup>
        </Form>
    );
};

export default SendMessageForms;
 