'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Card from '@/components/Card/Card';
import InputField from '@/components/Inputfield/Inputfield';
import Button from '@/components/Buttons/Button/Button';
import loginStyles from '@/app/login/login.module.scss';
import { MoveLeft, TriangleAlert } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  async function handleClick() {
    setErrorMessage('');

    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);

    const email = formData.get('email');
    const password = formData.get('password');

    if (typeof email !== 'string' || typeof password !== 'string') {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      setErrorMessage('Invalid email or password.');
      return;
    }

    router.push('/admin/manageDays');
  }

  return (
    <>
      <div className={loginStyles.loginHeader}>
        <h1>Admin Panel Login</h1>
        <p className={loginStyles.subtitle}>Accessibility Advent Calendar</p>
      </div>

      <div className={loginStyles.loginContainer}>
        <div className={loginStyles.loginCard}>
          <Card>
            <form
              ref={formRef}
              className={loginStyles.loginContent}
              onSubmit={(event) => {
                event.preventDefault();
                void handleClick();
              }}
            >
              <InputField
                name="email"
                label="Email"
                type="email"
                required
                aria-invalid={Boolean(errorMessage)}
              />

              <InputField
                name="password"
                label="Password"
                type="password"
                required
                aria-invalid={Boolean(errorMessage)}
              />

              <p role="alert" className={loginStyles.errorMessage}>
                {errorMessage && (
                  <>
                    <TriangleAlert aria-hidden="true" />
                    {errorMessage}
                  </>
                )}
              </p>

              <div className={loginStyles.buttonWrapper}>
                <Button variant="primary" onClick={handleClick}>
                  Sign in
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>

      <div className={loginStyles.backToCalendar}>
        <Link href="/">
          <MoveLeft />
          Back to calendar
        </Link>
      </div>
    </>
  );
}
