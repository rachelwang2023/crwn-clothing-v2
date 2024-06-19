import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import './authentication.styles.scss'
import SignUpForm  from '../../components/sign-up-form/sign-up-form.component';

import SignInForm from '../../components/sign-in-form /sign-in-form.component';
import {
	auth,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'



const SignIn = () => {
	useEffect(() => {
			const fetchUser = async () => {
					const result = await getRedirectResult(auth);
					if (result && result.user) {
							await createUserDocumentFromAuth(result.user);
					}
			};

			fetchUser();
	}, []);

	
	
	return (
		<div className='authentication-container'>
			<SignInForm/>
			{/*<button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>*/}
			<SignUpForm/>
		</div>
	);
};

export default SignIn;