"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GoTriangleRight } from "react-icons/go";
import { z } from "zod";

export const SignInCard = () => {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Define onSignIn function to handle form submission
  const onSignIn = async (values: z.infer<typeof formSchema>) => {
    const { data, error } = await createClient().auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      form.setError("email", {
        message: error.message,
      });
    }
    if (data.user) {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="w-[400px]">
      <Card>
        <CardHeader className="text-center space-y-2">
          <CardTitle>Sign in to JustNotes</CardTitle>
          <CardDescription>
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSignIn)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel />
                    <FormDescription className="text-black">
                      Email address
                    </FormDescription>
                    <FormControl>
                      <input
                        onChange={onChange}
                        value={value}
                        placeholder="Enter your email address"
                        className="px-4 h-8 w-full text-sm border rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel />
                    <FormDescription className="text-black">
                      Password
                    </FormDescription>
                    <FormControl>
                      <input
                        onChange={onChange}
                        value={value}
                        placeholder="Enter your password"
                        className="px-4 h-8 w-full text-sm border rounded-md"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full h-8 bg-gray-800 rounded-md"
                type="submit"
              >
                Continue <GoTriangleRight />
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="p-6 h-16 bg-gray-100 flex items-center justify-center border rounded-b-md">
          <CardDescription>
            Don&apos;t have an account?{" "}
            <a href="/sign-up" className="text-blue-500">
              Sign up
            </a>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};
