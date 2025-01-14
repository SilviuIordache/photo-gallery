import { createClient } from 'pexels';

const client = createClient(import.meta.env.VITE_PEXELS_API_KEY);

type PhotoClient = typeof client;
export default client;
export type { PhotoClient };
