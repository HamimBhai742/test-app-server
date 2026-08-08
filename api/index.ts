import app from '../src/app';
import { connectedDB } from '../src/app/db/connected.db';

// Initialize DB connection
connectedDB();

export default app;
