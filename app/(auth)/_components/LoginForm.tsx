"use client";
import React, { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialStateType, loginAction } from "../_actions/authActions";
import { toast } from "sonner";

const initialState: initialStateType = {
  success: false,
  statusCode: 0,
  message: "",
  data: {
    accessToken: "",
    refreshToken: "",
  },
};

const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, initialState);
  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message);
    }
    if (!state.success) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <div className="space-y-5">
      <form action={action}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input type="password" name="password" placeholder="••••••••" required />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            {pending ? "Submitting..." : "Login"}
          </Button>
          {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
        </CardFooter>
      </form>
    </div>
  );
};

export default LoginForm;
