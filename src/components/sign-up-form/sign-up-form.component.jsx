import {useState} from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword){
            alert('Passwords do not match');
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocFromAuth(user, {displayName});
            resetFormFields();

        } catch (e) {
            if (e.code === 'auth/email-already-in-use'){
                alert('Error: Email already in use');
            } else {

                console.log('User creation error::', e);
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]:value});
    };

    return(
        <div>
            <h1>Sign up here</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Display Name</label>
                <input 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name='displayName' 
                    value={displayName} 
                />
                
                <label htmlFor="">Email</label>
                <input 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email} 
                />

                <label htmlFor="">Password</label>
                <input 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password} 
                />

                <label htmlFor="">Confirm Password</label>
                <input 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name='confirmPassword' 
                    value={confirmPassword} 
                />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
};

export default SignUpForm;