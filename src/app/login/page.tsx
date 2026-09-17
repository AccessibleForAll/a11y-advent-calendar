'use client';
import Link from 'next/link';
import Card from '@/components/Card/Card';
import InputField from '@/components/Inputfield/Inputfield';
import Button from '@/components/Buttons/Button/Button';
import basicStyles from '@/app/page.module.scss';
import textStyles from '@/components/Inputfield/Inputfield.module.scss';
import loginStyles from '@/app/login/login.module.scss';
import { MoveLeft } from 'lucide-react';

export default function loginPage() {
  function handleClick() {
    alert('Clicked');
  }
  return (
    <>
      <div className={loginStyles.upper}>
        <h1 className={basicStyles.title}>Admin Panel Login</h1>
        <p className={textStyles.label}>Accessibility Advent Calendar</p>
      </div>
      <div className={loginStyles.container}>
        <Card className={loginStyles.loginCard}>
          <InputField name="userName" label="Username" />
          <InputField name="password" label="Password" />
          <div className={loginStyles.buttonWrapper}>
            <Button variant="primary" onClick={handleClick}>
              Sign in
            </Button>
          </div>
        </Card>
      </div>
      <div className={loginStyles.back}>
        <Link href="/">
          <MoveLeft />
          Back to calendar
        </Link>
      </div>
    </>
  );
}
