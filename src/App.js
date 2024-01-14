import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStore } from './useStore';
import styles from './App.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passwordPattern =
	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-#!$@%^&*_+~=:;?\/])[-\w#!$@%^&*+~=:;?\/]{8,15}$/;

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const { getState, updateState } = useStore();

	const formSchema = yup.object().shape({
		email: yup
			.string()
			.matches(
				emailPattern,
				'Введенное значение не соответствует электронной почте',
			)
			.required('Поле должно быть заполнено'),
		password: yup
			.string()
			.matches(
				passwordPattern,
				'Пароль должен содержать не менее одной строчной, заглавной буквы, цифры и специального символа. Длина пароля от 8 до 15 символов',
			)
			.required('Поле должно быть заполнено'),
		confirmation: yup
			.string()
			.oneOf([yup.ref('password')], 'Не совпадает со значение в поле пароль')
			.required('Поле должно быть заполнено'),
	});

	const { email, password, confirmation } = getState();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		defaultValue: { email: '', password: '', confirmation: '' },
		resolver: yupResolver(formSchema),
	});

	const onSubmit = (e) => {
		// e.preventDefault();
		sendFormData(getState());
	};

	const onChange = ({ target }) => {
		updateState(target.name, target.value);
	};

	return (
		<div className={styles.app}>
			<h1 className={styles.formTitle}>
				Страница регистрации нового пользователя:
			</h1>
			<form
				action="#"
				onSubmit={handleSubmit(onSubmit)}
				className={styles.form}
				noValidate
			>
				<label htmlFor="email" className={styles.label}>
					Электронная почта
				</label>
				<input
					className={styles.input}
					value={email}
					id="email"
					type="email"
					name="email"
					placeholder="Email"
					{...register('email')}
					onChange={onChange}
				/>
				<div className={styles.inputError}>{errors.email?.message}</div>
				<label htmlFor="password" className={styles.label}>
					Пароль
				</label>
				<input
					className={styles.input}
					value={password}
					id="password"
					type="password"
					name="password"
					placeholder="Пароль"
					{...register('password')}
					onChange={onChange}
				/>
				<div className={styles.inputError}>{errors.password?.message}</div>
				<label htmlFor="confirmation" className={styles.label}>
					Подтверждение пароля
				</label>
				<input
					className={styles.input}
					value={confirmation}
					id="confirmation"
					type="password"
					name="confirmation"
					placeholder="Подтверждение пароля"
					{...register('confirmation')}
					onChange={onChange}
				/>
				<div className={styles.inputError}>{errors.confirmation?.message}</div>
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
