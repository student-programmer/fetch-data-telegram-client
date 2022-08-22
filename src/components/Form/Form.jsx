import React, { useState } from 'react';
import './Form.css';
const Form = ( ) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const changeName = (e) => {
        setName(e.target.value);
    };
    const changeEmail= (e) => {
        setEmail(e.target.value);
    };
    const submitData = (e) => {
        e.preventDefault();
        fetch(' http://localhost:5000/telegram', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        })
            .then((response) => response.json())
            .then((result) => alert(result.response.msg));
    };

    return (
        <div className='wrapper'>
            <div className='login-box'>
                <h2>Заявка</h2>
                <form>
                    <div className='user-box'>
                        <input
                            type='text'
                            value={name}
                            onChange={changeName}
                            placeholder='Введите ваше имя:'
                        />
                    </div>
                    <div className='user-box'>
                        <input
                            type='text'
                            value={email}
                            onChange={changeEmail}
                            placeholder='Введите ваш e-mail:'
                        />
                    </div>
                    <button type='submit' onClick={submitData}>
                        Отправить форму
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;
