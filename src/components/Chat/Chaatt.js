import MessageContainer from './MessageContainer'
import SendMessageForms from './SendMessageForms'
import ConnectedUsers from './ConnectedUsers '
import { Button } from 'react-bootstrap'


const Chaatt = ({ sendMessage, messages, users, closeConnection }) => <div>
    <div className='leave-room'>
        <Button variant='danger' onClick={() => closeConnection()}>Leave Room</Button>
    </div>
    <ConnectedUsers users={users} /> 
    <div className='chat'>
        <MessageContainer messages={messages} />
        <SendMessageForms sendMessage={sendMessage} />
    </div>
</div>


export default Chaatt

