'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import Link from 'next/link'
import { useForm } from 'react-hook-form'

import serverForgottenPasswordSubmit from 'src/actions/forgottenPassword'

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

import { ForgottenPasswordInputs, ForgottenPasswordSchema } from 'src/lib/serverActions/schema'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { RotateCw } from 'lucide-react'
import { Input } from '../ui/input'

const ForgottenPasswordForm = () => {
  const form = useForm<ForgottenPasswordInputs>({
    resolver: zodResolver(ForgottenPasswordSchema),
  })

  const onSubmit = async (data: ForgottenPasswordInputs) => {
    const safeData = ForgottenPasswordSchema.safeParse(data)
    if (safeData.success) {
      const { email } = safeData.data

      const sendForgottenPassword = await serverForgottenPasswordSubmit({
        email,
      })

      if (sendForgottenPassword.success) {
        // toast.success('Password Reset Requested');
        // toast.success(`Password reset email sent to ${email}.`)
        console.log(`Password reset email sent to ${email}.`)
      } else if (!sendForgottenPassword.success) {
        console.log('Unable to Request Password Reset')
        // toast.error('Unable to Request Password Reset')
      }
      return sendForgottenPassword
    }
    // signin({ email: data.email, password: data.password });
  }

  return (
    <>
      <Form {...form}>
        <form
          method="POST"
          onSubmit={form.handleSubmit(onSubmit)}
          className="z-10 flex w-full flex-col items-center gap-4 md:mx-auto"
        >
          <div className="relative z-20 mx-auto flex w-full flex-col items-center justify-center space-y-8 overflow-clip rounded-3xl border-0 border-transparent bg-stone-100 p-4 sm:w-[35ch] ">
            <div className="my-4 mb-20 w-full max-w-prose space-y-4">
              <div className="grid gap-6 ">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <Label
                        className="whitespace-nowrap font-someSans text-2xl lg:text-3xl"
                        htmlFor="email"
                      >
                        Email
                      </Label>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              variant="secondary"
              className="absolute bottom-0 left-0 right-0 h-14 min-w-full rounded-none font-someSans text-xl font-bold"
              disabled={
                form.formState.isLoading ||
                form.formState.isSubmitting ||
                form.formState.isSubmitted
              }
            >
              {' '}
              {(form.formState.isLoading || form.formState.isSubmitting) && (
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
              )}
              {/* {isError && <XCircle className="mr-2 h-4 w-4" />} */}
              {form.formState.isLoading || form.formState.isSubmitting
                ? 'Requesting Password Reset'
                : form.formState.isSubmitSuccessful
                ? 'Password Reset Requested'
                : !form.formState.isSubmitSuccessful && form.formState.isSubmitted
                ? 'Unable to Request Password Reset'
                : 'Request Password Reset'}
            </Button>
          </div>
          {/* <div className="relative mb-20">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-stone-100 px-2 text-muted-foreground">or</span>
            </div>
          </div> */}
          {/* {isSeller ? (
            <Button
              type="button"
              variant="secondary"
              disabled={isLoading}
              onClick={continueAsBuyer}
            >
              Continue As Customer
            </Button>
          ) : (
            <Button type="button" className="w-full" variant="secondary" onClick={continueAsSeller}>
              Continue As Seller
            </Button>
          )} */}
          <Link href="/sign-up">Don&apos;t have an account? Sign up!</Link>
          <Link href="/sign-in">Remember your password? Sign in!</Link>
        </form>
      </Form>
    </>
  )
}

export default ForgottenPasswordForm
