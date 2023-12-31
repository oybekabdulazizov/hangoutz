import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useTokens from '@/pages/hooks/useTokens';
import { useResetPasswordMutation } from '@/store';
import { resetPasswordFormSchema } from '@/lib/schemas/authSchemas';
import { resetPasswordInitialValues } from '@/lib/constants';

const ResetPasswordForm: FC = ({}) => {
  const [resetPassword] = useResetPasswordMutation();
  const { removeTokens } = useTokens();

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: resetPasswordInitialValues,
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordFormSchema>) => {
    try {
      await resetPassword(values).unwrap();
      form.reset();
      removeTokens('session-token');
      removeTokens('refresh-token');
    } catch (err: any) {
      console.log('caught error: ');
      console.log(err);
      return;
    }
    form.reset();
  };

  return (
    <div className='w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-5'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Email'
                    {...field}
                    className='input-field'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='oldPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Old password'
                    {...field}
                    className='input-field'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='newPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='New password'
                    {...field}
                    className='input-field'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmNewPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='New password confirmation'
                    {...field}
                    className='input-field'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='rounded-xl'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
