import { useEffect } from 'react';
import {getRedirectResult} from 'firebase/auth'

import {auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocFromAuth} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () =>{

    useEffect( () => {
        const func = async () => {
            const response = await getRedirectResult(auth);
            
            if(response){
                const userDocRef = await createUserDocFromAuth(response.user);
            }
        }
        func();
    }, []);

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
    };
    
    return(
        <div>
            <h1>Sign in here</h1>
            <button onClick={logGoogleUser}>Sign in with google popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with google redirect</button>

            <SignUpForm/>
        </div>
    )
}

export default SignIn;