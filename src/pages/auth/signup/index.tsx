import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import SignUpForm from './SignUpForm';

const SignUp: FC = ({}) => {
  const location = useLocation();

  return (
    <div
      className='bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center 
                    min-h-screen w-full flex justify-center items-center'
    >
      <div className='bg-white shadow-auth-card p-7 rounded-2xl sm:w-[480px] w-[90%] flex flex-col gap-4'>
        <div>
          <h5 className='font-medium text-[20px] leading-[34px]'>
            Create your account
          </h5>
          <p className='text-sm'>to continue to HangoutZ</p>
        </div>

        <SignUpForm />

        <div className='flex flex-row gap-2'>
          <p>Already have an account?</p>
          <Link
            to='/auth/log-in'
            className='text-primary-500'
            replace={true}
            state={{ from: location }}
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
