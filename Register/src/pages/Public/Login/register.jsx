import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const userInputDebounce = useDebounce({ email, password }, 2000);
  const [debounceState, setDebounceState] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState(''); 

  const navigate = useNavigate();

  const handleOnChange = (event, type) => {
    setDebounceState(false);
    setIsFieldsDirty(true);

    switch (type) {
      case 'email':
        setEmail(event.target.value);
        break;

      case 'password':
        setPassword(event.target.value);
        break;

      case 'firstName':
        setFirstName(event.target.value);
        break;

      case 'middleName':
        setMiddleName(event.target.value);
        break;

      case 'lastName':
        setLastName(event.target.value);
        break;

      case 'contactNo':
        setContactNo(event.target.value);
        break;

      default:
        break;
    }
  };

  const handleRegister = async () => {
    const data = { email, password, firstName, middleName, lastName, contactNo };
    setStatus('loading');
    setErrorMessage(''); 

    try {
      const res = await axios({
        method: 'post',
        url: '/register', 
        data,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      console.log(res);
      localStorage.setItem('accessToken', res.data.access_token);
      navigate('/main/dashboard');
      setStatus('idle');

      setEmail('');
      setPassword('');
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setContactNo('');
    } catch (e) {
      console.log(e);
      setStatus('idle');
      setErrorMessage('Registration failed. Please try again.'); 
    }
  };

  useEffect(() => {
    setDebounceState(true);
  }, [userInputDebounce]);

  return (
    <div className='Login'>
      <div className='main-container'>
        <h3>Register</h3>
        <form>
          <div className='form-container'>
            <div>
              <div className='form-group'>
                <label>Email:</label>
                <input
                  type='text'
                  name='email'
                  ref={emailRef}
                  value={email}
                  onChange={(e) => handleOnChange(e, 'email')}
                />
              </div>
              {debounceState && isFieldsDirty && email === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>Password:</label>
                <input
                  name='password'
                  ref={passwordRef}
                  value={password}
                  onChange={(e) => handleOnChange(e, 'password')}
                />
              </div>
              {debounceState && isFieldsDirty && password === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>First Name:</label>
                <input
                  type='text'
                  name='firstName'
                  value={firstName}
                  onChange={(e) => handleOnChange(e, 'firstName')}
                />
              </div>
              {debounceState && isFieldsDirty && email === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>Middle Name:</label>
                <input
                  type='text'
                  name='middleName'
                  value={middleName}
                  onChange={(e) => handleOnChange(e, 'middleName')}
                />
              </div>
              {debounceState && isFieldsDirty && email === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>Last Name:</label>
                <input
                  type='text'
                  name='lastName'
                  value={lastName}
                  onChange={(e) => handleOnChange(e, 'lastName')}
                />
              </div>
              {debounceState && isFieldsDirty && email === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>Contact Number:</label>
                <input
                  type='text'
                  name='contactNo'
                  value={contactNo}
                  onChange={(e) => handleOnChange(e, 'contactNo')}
                />
              </div>
              {debounceState && isFieldsDirty && email === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>

            {errorMessage && <p className='error-message'>{errorMessage}</p>}

            <div className='submit-container'>
              <button
                type='button'
                disabled={status === 'loading'}
                onClick={() => {
                  if (status === 'loading') {
                    return;
                  }
                  if (email && password && firstName && lastName && contactNo) {
                    handleRegister();
                  } else {
                    setIsFieldsDirty(true);
                    if (email === '') {
                      emailRef.current.focus();
                    }
                    if (password === '') {
                      passwordRef.current.focus();
                    }
                  }
                }}
              >
                {status === 'idle' ? 'Register' : 'Loading'}
              </button>
            </div>
            
            <div className='login-container'>
            <a href="/">Login</a>     
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
