import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export const NotFound = () => {
	return (
		<div className={styles.errorPage}>
			<div className={styles.errorContainer}>
				<h1 className={styles.errorTitle}> 404 </h1>
				<p className={styles.errorText}>
					Oops! The page you're looking for is not here.
				</p>
				<Link className={styles.errorLink} href="/">
					Go Back to Home
				</Link>
			</div>
		</div>
	);
};
