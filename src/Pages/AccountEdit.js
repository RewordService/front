/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from 'react';
// scripts
import {
  UserPatch,
  UserDelete,
  UserInfo,
  CurrentUser,
} from '../Axios/UsersController';
// partials
import { FormSection } from '../Atom/Form';
import { Input } from '../Atom/Input';
import RadioButton from '../Atom/RadioButton';
import { Btn, AlertBtn } from '../Atom/Button';
import FlexJustify from '../Atom/FlexJustify';
import Content from '../Atom/Content';
import Section from '../Atom/Section';
import FlashCard from '../Atom/Flash';
import LeftBar from '../Organisms/LeftBar';

const AccountEdit: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [birth, setBirth] = useState('');
  const [sex, setSex] = useState(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    UserInfo(CurrentUser()).then((res) => {
      setEmail(res.email);
      setBirth(res.birth_year);
      setSex(res.sex);
    });
  }, []);

  function EmailPatch() {
    UserPatch({ email });
  }
  function SexPatch() {
    UserPatch({ sex });
  }
  function BirthPatch() {
    UserPatch({ birth_year: birth });
  }
  function PasswordPatch() {
    const data = {
      password,
      passwordConfirmation,
    };
    PasswordPatch(data);
  }

  function UserDeleteConfirm() {
    UserDelete();
  }

  return (
    <FlexJustify>
      <FlashCard />
      <LeftBar />
      <div>
        <Content>
          <Section>
            <h2>プロフィール詳細</h2>

            <h3>性別</h3>
            <FormSection>
              <FormSection>
                <RadioButton
                  type="radio"
                  name="sex"
                  value="男性"
                  onClick={() => setSex(true)}
                />
                <p>男性</p>
                <RadioButton
                  type="radio"
                  name="sex"
                  value="女性"
                  onClick={() => setSex(false)}
                />
                <p>女性</p>
                <RadioButton
                  type="radio"
                  name="sex"
                  value="その他"
                  onClick={() => setSex(null)}
                />
                <p>その他</p>
              </FormSection>

              <Btn value="変更" type="button" onClick={() => SexPatch()} />
            </FormSection>
          </Section>

          <Section className="margin-none">
            <h2>誕生年</h2>

            <FormSection>
              <Input
                type="text"
                value={birth}
                placeholder={`例)${year}`}
                onChange={(e) => setBirth(e.target.value)}
              />
              <Btn value="変更" type="button" onClick={() => BirthPatch()} />
            </FormSection>
          </Section>
        </Content>
        <Content>
          <Section>
            <h2>メールアドレス変更</h2>
            <FormSection>
              <Input
                value={email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Btn value="変更" type="button" onClick={() => EmailPatch()} />
            </FormSection>
          </Section>
          <Section>
            <h2>パスワード変更</h2>
            <FormSection>
              <div style={{ width: '100%', margin: '0' }}>
                <label htmlFor="password">新しいパスワード</label>
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password_confirmation">
                  新しいパスワード(確認)
                </label>
                <Input
                  type="password"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </div>
              <Btn value="変更" type="button" onClick={() => PasswordPatch()} />
            </FormSection>
          </Section>
          <Section className="margin-none">
            <h2>アカウント削除</h2>
            <AlertBtn
              value="削除"
              type="button"
              onClick={() => UserDeleteConfirm()}
            />
          </Section>
        </Content>
      </div>
    </FlexJustify>
  );
};

export default AccountEdit;
