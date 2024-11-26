import React from 'react';
import { useRouter } from 'expo-router';
import VerifyPinCode from '@/components/verifyPinCode/VerifyPinCode';

const ForgotPasswordVerifyEmail: React.FC = () => {
  const router = useRouter();

  const handleVerification = (pinCode: string) => {
    // Implémenter la logique pour le vérifier le PIN code ici
    router.push('/hub/(login)/forgotPassword');
  };

  return (
    <VerifyPinCode
      title="Verify Your Email"
      subtitle="Please enter the PIN code sent to your email address."
      pinNotReceivedLink="/hub/auth"
      onSubmit={handleVerification}
    />
  );
};

export default ForgotPasswordVerifyEmail;
