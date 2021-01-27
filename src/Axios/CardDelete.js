/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import TokenHeaders from './TokenHeaders';

export default async function CardDelete() {
  axios.delete('/cards', { headers: TokenHeaders() });
  window.location.reload();
}
