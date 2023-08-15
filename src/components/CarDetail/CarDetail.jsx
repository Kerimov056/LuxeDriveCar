import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './CarDetail.scss'
import CursorZoom from 'react-cursor-zoom';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Button
} from '@chakra-ui/react'

const CarDetail = () => {
    const [img, setImg] = useState(null);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const Imgaetrasfer = (imageUrl) => {
        setImg(imageUrl)
        onOpen()
    }

    return (
        <>
            <Navbar />
            <div id='CarDetail'>
                <div>
                    <div className='CarD'>
                        <div className='CarImg'>
                            <div className='mainImg'>
                                <CursorZoom
                                    image={{
                                        src: "https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-img-03.jpg",
                                        width: 600,
                                        height: 750
                                    }}
                                    zoomImage={{
                                        src: "https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-img-03.jpg",
                                        width: 1300,
                                        height: 1000
                                    }}
                                    cursorOffset={{ x: 180, y: 0 }}
                                />
                            </div>
                            <div className='SecImg'>
                                <div><img onClick={() => Imgaetrasfer("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-gallery-img-02.jpg")} src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-gallery-img-02.jpg' alt="Image 1" /></div>
                                <AlertDialog
                                    isOpen={isOpen}
                                    leastDestructiveRef={cancelRef.current}
                                    onClose={onClose}
                                >
                                    <AlertDialogOverlay>
                                        <AlertDialogContent>
                                            <AlertDialogCloseButton />
                                            <AlertDialogBody>
                                                <div>
                                                    <img src={img} alt="Zoomed Image" />
                                                </div>
                                            </AlertDialogBody>
                                            <AlertDialogFooter>
                                                <Button ref={cancelRef} onClick={onClose}>
                                                    Close
                                                </Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialogOverlay>
                                </AlertDialog>
                                <div><img onClick={() => Imgaetrasfer("https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-gallery-img-01.jpg")} src='https://luxedrive.qodeinteractive.com/wp-content/uploads/2023/02/shop-single-gallery-img-01.jpg' alt="Image 2" /></div>
                            </div>
                        </div>
                        <div className='CarText'>
                            {/* ...Rest of your code */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CarDetail;
