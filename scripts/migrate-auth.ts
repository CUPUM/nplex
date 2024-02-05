import { exit } from 'process';
import { createDrizzle } from './common';

const db = createDrizzle();

console.info('🚧 Preparing for auth schema update...');
try {
	await db.transaction(async (tx) => {});
	console.info('🚀 Data prepared successfully for auth migration!');
} catch (error) {
	console.error(error);
	console.error('❌ Failed (see error above).');
} finally {
	exit();
}
