/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// function
import CardDelete from '../Axios/CardDelete';
import { UserInfo, CurrentUser } from '../Axios/UsersController';
import TokenHeaders from '../Axios/TokenHeaders';
// partials
import { Btn } from '../Atom/Button';
import Content from '../Atom/Content';
import Section from '../Atom/Section';
import FlexJustify from '../Atom/FlexJustify';

const AccountStatus: React.FC = () => {
  const [status, setStatus] = useState(false);
  useEffect(() => {
    UserInfo(CurrentUser()).then((res) => setStatus(res.status));
  }, []);
  const TokenPost = async function () {
    const data = document.getElementsByName('payjp-token')[0].value;
    await axios
      .post('/cards', { 'payjp-token': data }, { headers: TokenHeaders() })
      .then((res) => {
        window.location.reload();
      });
  };
  return (
    <FlexJustify>
      <div>
        <Content id="body">
          <Section>
            <h2>会員ステータス</h2>
            {status ? (
              <>
                <h3>有料会員</h3>
                <Btn
                  type="button"
                  value="カードを削除する"
                  onClick={CardDelete}
                />
                <h2>IOS</h2>
                <p>開発中</p>
                <h2>Android</h2>
              </>
            ) : (
              <>
                <h3>無料会員</h3>
                <p style={{ color: 'red' }}>
                  ただいま、決済サービスへの申請を行っています。
                </p>
                <div>
                  有料会員になることで、アプリケーションをインストールすることができます。
                </div>
                <p style={{ color: 'red' }}>
                  IOSアプリは未対応です。申し訳ございません
                </p>
              </>
            )}
          </Section>
        </Content>
      </div>
    </FlexJustify>
  );
};

export default AccountStatus;
