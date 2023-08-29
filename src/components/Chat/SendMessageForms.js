import { Button, FormControl, InputGroup } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Form } from 'react-router-dom';

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
 