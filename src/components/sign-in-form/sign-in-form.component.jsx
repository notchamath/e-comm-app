import {useState} from 'react';

import FormInput from '../form-input/form-input.component'; 
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'; 

import { signInWithGooglePopup, createUserDocFromAuth, signInUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import {SignInContainer, BtnsContainer} from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();       
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const {user} = await signInUserWithEmailAndPassword(email, password);
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
        <SignInContainer>
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

                <BtnsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button 
                        type="button"
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </BtnsContainer>
            </form>
        </SignInContainer>
    )
};

export default SignInForm;