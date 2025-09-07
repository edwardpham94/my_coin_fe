/** @format */

"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/apis/axiosInstance";
import Cookies from "js-cookie";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const formSchema = z
  .object({
    username: z.string(),
    password: z.string().min(3),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    }
  );

export default function SignUpForm() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [privateKey, setPrivateKey] = useState("abcs-private jet");
  const [isHidden, setIsHidden] = useState(false);

  const toggleVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(privateKey);
    alert("Private key copied to clipboard!");
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        username: values.username,
        password: values.password,
      });

      Cookies.set("isLoggedIn", "true", { expires: 7 });
      Cookies.set("walletAddress", response?.data?.walletAddress, {
        expires: 7,
      });
      Cookies.set("username", response?.data?.username, { expires: 7 });
      Cookies.set("publicKey", response?.data?.publicKey, { expires: 7 });
      Cookies.set("privateKey", response?.data?.privateKey, { expires: 7 });
      Cookies.set("accessToken", response?.data?.accessToken, { expires: 7 });

      setPrivateKey(response?.data?.privateKey);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="border-transparent focus-visible:shadow-none"
                    placeholder="Username"
                    type="username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="border-hidden"
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    className="border-hidden"
                    placeholder="Confirm Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="primary-btn w-full mt-4">
            Sign Up
          </Button>
        </form>
      </Form>

      <Dialog open={isModalVisible} onOpenChange={setIsModalVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Wallet Successfully!</DialogTitle>
          </DialogHeader>
          <p className="text-sm">
            Please save your private key securely. You will not be able to
            retrieve it again.
          </p>
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <div className="relative">
              <div className="flex items-center gap-2 justify-between">
                <code className="text-sm break-all text-black">
                  {privateKey}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="mt-2 text-sm text-white bg-blue-500 px-4 py-2 rounded"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="btn-primary mt-2 border-[2px] rounded-md w-fit px-4 py-2 "
              onClick={() => {
                setIsModalVisible(false);
                window.location.href = "/profile";
              }}
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
