import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import './authentication.styles.scss'
import SignUpForm  from '../../components/sign-up-form/sign-up-form.component';

import SignInForm from '../../components/sign-in-form /sign-in-form.component';
import {
	auth,
	signInWithGooglePopUp,
	createUserDocumentFromAuth,
	signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils'



const SignIn = () => {
	useEffect(async() => {
		const { user } = getRedirectResult(auth);
		if(user) {
			const userDocRef = await createUserDocumentFromAuth(user);
		}
	}, [])

	
	
	return (
		<div className='authentication-container'>
			<SignInForm/>
			{/*<button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>*/}
			<SignUpForm/>
		</div>
	);
};

export default SignIn;