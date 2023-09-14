import { Container } from '@chakra-ui/react';
import React, { useState } from 'react';

const PaymentForm2 = () => {
    const [formData, setFormData] = useState({
        Cvc: '',
        Name: '',
        amount: 0,
        userId: '',
        CardNumber: '',
        ExpirationYear: '',
        ExpirationMonth: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:7152/api/Payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Ödeme başarıyla tamamlandı!');
            } else {
                console.error('Ödeme başarısız oldu.');
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
    };

    return (
        <>
            <Container style={{backgroundColor:"green"}}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Name:
                            <input type="text" name="Name" value={formData.Name} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Card Number:
                            <input type="text" name="CardNumber" value={formData.CardNumber} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Expiration Year:
                            <input type="text" name="ExpirationYear" value={formData.ExpirationYear} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Expiration Month:
                            <input type="text" name="ExpirationMonth" value={formData.ExpirationMonth} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            CVC:
                            <input type="text" name="Cvc" value={formData.Cvc} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Amount:
                            <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            User ID:
                            <input type="text" name="userId" value={formData.userId} onChange={handleChange} />
                        </label>
                    </div>
                    <button type="submit">Ödeme Yap</button>
                </form>
            </Container>
        </>
    );
};

export default PaymentForm2;
