import { ITokenHeaders, ISign } from '../interfaces';

const TokenHeaders = (): { headers: ITokenHeaders } => {
  const { headers }: { headers: ITokenHeaders } = JSON.parse(
    localStorage.sign
  ) as ISign;
  return {
    headers: {
      'content-type': headers['content-type'],
      accesstoken: headers.accesstoken,
      client: headers.client,
      uid: headers.uid,
    },
  };
};

export default TokenHeaders;
