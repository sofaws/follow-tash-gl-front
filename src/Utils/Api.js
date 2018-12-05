import ky from 'ky';
import { API_URL } from '../config';

export default ky.extend({ prefixUrl: API_URL });
