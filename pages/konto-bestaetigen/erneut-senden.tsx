import React, { useState } from 'react';
import Layout from '../../elements/core/container/Layout/Layout';
import { FlexEvenly, FlexRight, ViewWrapper } from '../../styles/global.styles';
import AuthImage from '../../elements/authentication/components/AuthImage/AuthImage';
import AuthInfo from '../../elements/authentication/components/AuthInfo/AuthInfo';
import { SignInHeading } from '../../elements/authentication/container/SignInForm/SignInForm.styles';
import FormInput from '../../elements/core/components/FormInput/FormInput';
import Button from '../../elements/core/components/Button/Button';
import { resendCode } from '../../util/api';
import { useStoreDispatch } from '../../context/custom_store';
import { MessageType } from '../../models/IMessage';

function ForgotPasswordPage() {
  const [isSuccess, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const { setMessage } = useStoreDispatch();
  const sendEmail = async () => {
    const { content, error } = await resendCode(email);
    if (error) {
      setMessage({
        content: 'Ein Fehler ist aufgetreten',
        type: MessageType.error,
      });
    }
    if (content) {
      setMessage({
        content: 'E-Mail wurde verschickt.',
        type: MessageType.success,
      });
      setSuccess(true);
    }
  };

  return (
    <Layout title="Code erneut senden - Brickboard 2.0">
      <ViewWrapper>
        <FlexEvenly>
          {!isSuccess ? (
            <AuthInfo>
              <SignInHeading>Wie lautet deine E-Mail?</SignInHeading>
              <FormInput type="email" placeholder="brick@brickfilm.com" onChange={(value) => setEmail(value)} />
              <br />
              <br />
              <FlexRight>
                <Button
                  small
                  disabled={email.length < 6}
                  onClick={() => sendEmail()}
                >
                  Senden
                </Button>
              </FlexRight>
            </AuthInfo>
          )
            : (
              <AuthInfo>
                <SignInHeading>E-Mail verschickt!</SignInHeading>
                <br />
                <p>Du solltest eine Mail mit einem neuen Link erhalten haben.</p>
                <br />
                <p>Klicke auf diesen Link um dein Konto zu bestätigen.</p>
              </AuthInfo>
            )}

          <AuthImage path={!isSuccess ? '/assets/images/forgotpassword.webp' : '/assets/images/email.webp'} />
        </FlexEvenly>
      </ViewWrapper>
    </Layout>
  );
}

export default ForgotPasswordPage;
