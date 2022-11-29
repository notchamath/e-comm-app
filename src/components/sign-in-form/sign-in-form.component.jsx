import {useState, useContext} from 'react';

import FormInput from '../form-input/form-input.component'; 
import Button from '../button/button.component'; 

import { UserContext } from '../../contexts/user.context';

import { signInWithGooglePopup, createUserDocFromAuth, signInUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocFromAuth(user);
        setCurrentUser(user);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const {user} = await signInUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            
            resetFormFields();

        } catch (e) {
            if (e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found'){
                alert('Incorrect password or email');
            }
            console.log(e)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]:value});
    };

    return(
        <div className='sign-up-container'>
            <h2>Have an account?</h2>
            <span>Sign in here</span>
            <form onSubmit={handleSubmit}>
                  
                <FormInput
                    label='Email' 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email} 
                />

                <FormInput
                    label='Password' 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password} 
                />

                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    )
};

export default SignInForm;