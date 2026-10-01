'use client';
import Link from 'next/link';
import Card from '@/components/Card/Card';
import InputField from '@/components/Inputfield/Inputfield';
import Button from '@/components/Buttons/Button/Button';
import loginStyles from '@/app/login/login.module.scss';
import { MoveLeft } from 'lucide-react';

export default function loginPage() {
  function handleClick() {
    alert('Clicked');
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
            <div className={loginStyles.loginContent}>
              <InputField name="userName" label="Username" />
              <InputField name="password" label="Password" />
              <div className={loginStyles.buttonWrapper}>
                <Button variant="primary" onClick={handleClick}>
                  Sign in
                </Button>
              </div>
            </div>
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
