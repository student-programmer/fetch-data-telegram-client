import React, { useEffect, useState } from 'react';
import './Form.css';
const Form = () => {
    // Создаём состояния для наших инпутов.
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');

    // Состояния для валидации
    const [emailDirty, setEmailDirty] = useState(false);
    const [nameDirty, setNameDirty] = useState(false);
    const [phoneDirty, setPhoneDirty] = useState(false);
    const [nameError, setNameError] = useState('Имя не может быть пустым');
    const [emailError, setEmailError] = useState('email не может быть пустым');
    const [phoneError, setPhoneError] = useState(
        'Телефон не может быть пустым'
    );

    // Создаём функции для изменения состояния имени и валидации имени.
    const changeName = (e) => {
        setName(e.target.value);
        const re = /^([а-я]{1}[а-яё]{3,23}|[a-z]{1}[a-z]{3,23})$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setNameError('Некоректное имя');
        } else {
            setNameError('');
        }
    };

    // Создаём функции для изменения состояния имени и валидации email.
    const changeEmail = (e) => {
        setEmail(e.target.value);
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некоректный email');
        } else {
            setEmailError('');
        }
    };

    // Функци для изменения телефона и валидации телефона.
    const changeHandlerPhone = (e) => {
        setPhone(e.target.value);
        const re = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
        if (!re.test(String(e.target.value).toLowerCase())){
          setPhoneError("Некоректный номер телефона")
        }else{
          setPhoneError("")
        }
      };
      // Функция для изменения описания. 
      const changeHandlerDescription= (e) => {
        setDescription(e.target.value);
        
      };




      
    // Валидации всей формы и кнопки отправки 
    const [formValid, setFormValid] = useState(false)
    useEffect(() =>{
      if(emailError || phoneError || nameError){
        setFormValid(false)
      }else{
        setFormValid(true)
      }
    }, [emailError, phoneError, nameError])


    // Функция для отправки формы
    const submitData = (e) => {
        e.preventDefault();
        fetch(' http://localhost:5000/telegram', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone, description }),
        })
            .then((response) => response.json())
            .then((result) => alert(result.response.msg));
    };

    const blurHandler = (e) =>{
        switch(e.target.name){
          case "name":
            setNameDirty(true)
            break
            case "phone":
              setPhoneDirty(true)
              break
              case "email":
                setEmailDirty(true)
                break
                default:
        }
      }

    return (
        <div className='wrapper'>
            <div className='login-box'>
                <h2>Заявка</h2>
                <form >
                {(nameDirty && nameError) && <div className='error1'>{nameError}</div>}
                    <div className='user-box'>
                        <input
                            type='text'
                            value={name}
                            name='name'
                            onChange={changeName}
                            onBlur={e => blurHandler(e)}
                            placeholder='Введите ваше имя:'
                        />
                    </div>
                    {(emailDirty && emailError) && <div className='error2'>{emailError}</div>}
                    <div className='user-box'>
                        <input
                            type='text'
                            value={email}
                            name='email'
                            onChange={changeEmail}
                            onBlur={e => blurHandler(e)}
                            placeholder='Введите ваш e-mail:'
                        />
                    </div>
                    {(phoneDirty && phoneError) && <div className='error3'>{phoneError}</div>}
                    <div className='user-box'>
                        <input
                            onChange={changeHandlerPhone}
                            onBlur={e => blurHandler(e)}
                            type='text'
                            value={phone}
                            id=''
                            name='phone'
                            placeholder='Введите номер телефона:'
                        />
                    </div>
                    <div className='user-box'>
                    <textarea  onChange={changeHandlerDescription} name="description" placeholder="Комментарий..." value={description} id="" cols="30" rows="3"></textarea>
                    </div>
                    <button disabled={!formValid} type='submit' onClick={submitData}>
                        Отправить форму
                    </button>
         
                </form>
            </div>
        </div>
    );
};

export default Form;
