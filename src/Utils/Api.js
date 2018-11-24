import ky from 'ky';
import config from '../config';

export default ky.extend({ prefixUrl: config.API_URL });
