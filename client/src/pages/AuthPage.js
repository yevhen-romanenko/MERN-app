import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
      window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      //   console.log('DATA', data);
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
      message(data.message);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Minimilize Your Link</h1>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Autorization</span>
            <div>
              <div className="input-field">
                <input placeholder="Enter your email" id="email" type="text" name="email" className="yellow-input" onChange={changeHandler} />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input placeholder="Enter password" id="password" type="password" name="password" className="yellow-input" onChange={changeHandler} />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4" style={{ marginRight: 10 }} disabled={loading} onClick={loginHandler}>
              Login
            </button>
            <button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading}>
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
