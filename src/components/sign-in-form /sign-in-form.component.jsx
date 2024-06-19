import { useState } from "react";
import { signInWithGooglePopUp, createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import '../sign-in-form /sign-in-form.styles.scss'
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";


const defaultFormFields = {
	email: '',
	password: '',
}


const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	}

	//const { setCurrentUser } = useContext(UserContext)
	const { email, password } = formFields;

	const signInWithGoogle = async (event) => {
		event.preventDefault();
		const { user } = await signInWithGooglePopUp();
		await createUserDocumentFromAuth(user);
		//setCurrentUser(user);
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		

		try {
			const user = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			console.log(user);
			
			// setCurrentUser(user);
	
			resetFormFields();

		} catch (error) {
			console.log(error);
			if (error.code === 'auth/invalid-credential'){
				alert('incorrect password or email')
			}


		}


	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value })

	};

	return (
		<div className="sign-up-container">
			<h2>Already have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>

				<FormInput label="Email" type='email' required onChange={handleChange} name="email" value={email} />

				<FormInput label="Password"
					type='password' required onChange={handleChange} name="password" value={password} />
				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button type='button' buttonType='google' onClick={signInWithGoogle}>
						Google sign in
					</Button>
				</div>


			</form>
		</div>
	)
}

export default SignInForm;