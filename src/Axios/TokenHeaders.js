/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AuthDelete } from './AuthAction';

export default function TokenHeaders() {
  let headers;
  try {
    const storageHeader = JSON.parse(localStorage.Reword).headers;
    headers = {
      'Content-Type': 'application/json',
      accesstoken: storageHeader.accesstoken,
      client: storageHeader.client,
      uid: storageHeader.uid,
    };
  } catch {
    AuthDelete();
    return null;
  }
  return { headers };
}
