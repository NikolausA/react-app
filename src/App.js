import * as yup from 'yup';
import { useStore } from './useStore';
import styles from './App.module.css';
import { useState } from 'react';

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passwordPattern =
	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-#!$@%^&*_+~=:;?\/])[-\w#!$@%^&*+~=:;?\/]{8,15}$/;

const emailBlurSchema = yup
	.string()
	.matches(emailPattern, 'Введенное значение не соответствует электронной почте')
	.required('Поле должно быть заполнено');

const passwordBlurSchema = yup
	.string()
	.matches(
		passwordPattern,
		'Пароль должен содержать не менее одной строчной, заглавной буквы, цифры и специального символа. Длина пароля от 8 до 15 символов',
	)
	.required('Поле должно быть заполнено');

const confirmationBlurSchema = yup
	.string()
	.oneOf([yup.ref('password')], 'Не совпадает со значение в поле пароль')
	.required('Поле должно быть заполнено');

const validateAndGetErrorMessage = (schema, value) => {
	let errorMessage = null;

	try {
		schema.validateSync(value, { abortEarly: false });
	} catch ({ errors }) {
		errorMessage = errors
			.reduce((message, error) => message + error + 'n' + '')
			.trim();
	}

	return errorMessage;
};

export const App = () => {
	const { getState, updateState } = useStore();
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [confirmationError, setConfirmationError] = useState(null);

	const { email, password, confirmation } = getState();

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(getState());
	};

	const onChange = ({ target }) => {
		updateState(target.name, target.value);
	};

	const onBlur = ({ target }) => {
		let newError = null;
		switch (target.name) {
			case 'email':
				newError = validateAndGetErrorMessage(emailBlurSchema, target.value);
				setEmailError(newError);
				break;

			case 'password':
				newError = validateAndGetErrorMessage(passwordBlurSchema, target.value);
				setPasswordError(newError);
				break;

			case 'confirmation':
				newError = validateAndGetErrorMessage(
					confirmationBlurSchema,
					target.value,
				);
				setConfirmationError(newError);
				break;
			default:
				break;
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles.formTitle}>
				Страница регистрации нового пользователя:
			</h1>
			<form action="#" onSubmit={onSubmit} className={styles.form} noValidate>
				<label htmlFor="email" className={styles.label}>
					Электронная почта
				</label>
				<input
					className={
						emailError
							? `${styles.input} ${styles.invalid}`
							: `${styles.input}`
					}
					value={email}
					id="email"
					type="email"
					name="email"
					placeholder="Email"
					onBlur={onBlur}
					onChange={onChange}
				/>
				{emailError && <span className={styles.inputError}>{emailError}</span>}

				<label htmlFor="password" className={styles.label}>
					Пароль
				</label>
				<input
					className={
						passwordError
							? `${styles.input} ${styles.invalid}`
							: `${styles.input}`
					}
					value={password}
					id="password"
					type="password"
					name="password"
					placeholder="Пароль"
					onChange={onChange}
					onBlur={onBlur}
				/>
				{passwordError && (
					<span className={styles.inputError}>{passwordError}</span>
				)}
				<label htmlFor="confirmation" className={styles.label}>
					Подтверждение пароля
				</label>
				<input
					className={
						confirmationError
							? `${styles.input} ${styles.invalid}`
							: `${styles.input}`
					}
					value={confirmation}
					id="confirmation"
					type="password"
					name="confirmation"
					placeholder="Подтверждение пароля"
					onChange={onChange}
					onBlur={onBlur}
					disabled={!email || emailError || !password || passwordError}
				/>
				{confirmationError && (
					<span className={styles.inputError}>{confirmationError}</span>
				)}
				<button
					className={styles.buttonSubmit}
					disabled={!confirmation || password !== confirmation}
					type="submit"
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

// const onBlur = ({ target }) => {
//   switch (target.name) {
//     case 'email':
//       if (!target.value) {
//         setEmailError('Поле должно быть заполнено');
//       } else if (!emailPattern.test(target.value)) {
//         setEmailError(
//           'Введенное значение не соответствует электронной почте',
//         );
//       }
//       break;
//     case 'password':
//       if (!target.value) {
//         setPasswordError('Поле должно быть заполнено');
//       } else if (!passwordPattern.test(target.value)) {
//         setPasswordError(
//           'Пароль должен содержать не менее одной строчной, заглавной буквы, цифры и специального символа. Длина пароля от 8 до 15 символов',
//         );
//       }
//       break;
//     case 'confirmation':
//       if (target.value !== password) {
//         setConfirmationError('Не совпадает со значение в поле пароль');
//       }
//       break;
//     default:
//       break;
//   }
// };
