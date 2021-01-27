/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Color from '../Assets/Color';
// partials
import { Input } from '../Atom/Input';
import { Form } from '../Atom/Form';
import { TextArea } from '../Atom/TextArea';
import { Btn } from '../Atom/Button';
import ErrorBox from '../Atom/ErrorBox';

const Contact: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const [flash, setFlash] = useState('');

  async function SendMail() {
    const data = {
      email,
      message,
    };
    setErrors([]);
    await axios
      .post('/contacts', data)
      .then((res) => {
        console.log(res);
        setErrors([]);
        setEmail('');
        setMessage('');
        setFlash(res.data.message);
        const form = document.getElementById('form');
        form.style.display = 'none';
      })
      .catch((err) => {
        setErrors(err.response.data);
      });
  }
  useEffect(() => {}, [email, message, errors, flash]);
  return (
    <Form>
      <h2>お問い合わせフォーム</h2>
      <ErrorBox>
        {errors.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ErrorBox>
      <h2 style={{ color: Color.blue }}>{flash}</h2>
      <div id="form">
        <label htmlFor="email">email</label>
        <Input
          type="email"
          id="email"
          autocomplete="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <label htmlFor="email">お問い合わせ内容</label>
        <TextArea onChange={(e) => setMessage(e.target.value)} />

        <Btn
          type="button"
          value="Send"
          style={{ marginTop: '10px' }}
          onClick={() => SendMail()}
        />
      </div>
    </Form>
  );
};

export default Contact;
