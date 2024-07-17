'use client'

import { Fade, Modal, Button } from "@mui/material";
import { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/navigation";

const PremiumModal = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
            <Fade in={open} timeout={500}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    position: 'relative',
                }}>
                    <img
                        src='/modal.png'
                        alt="Modal Content"
                        style={{ maxHeight: "70%", maxWidth: "70%" }}
                    />
                    <Button
                        variant="contained"
                        sx={{
                            background: '#00FFFF',
                            width: '150px',
                            position: 'absolute',
                            bottom: 'calc((100% - 73%))',
                            left: 'calc((100% - 10%) / 2)'
                        }}
                        onClick={() => { router.push('/payment') }}
                    >
                        Nâng cấp tài khoản ngay!!!
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{
                            position: 'absolute',
                            top: 'calc((100% - 85%))',
                            right: 'calc((100% - 33%) / 2)',
                            background: 'white',
                            color: 'black'
                        }}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </Button>
                </div>
            </Fade>
        </Modal>
    );
};

export default PremiumModal;
