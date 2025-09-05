import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import React from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/apis/axiosInstance";
import Cookies from "js-cookie";

const formSchema = z.object({
  toAddress: z.string(),
  fromAddress: z.string(),
  amount: z.string(),
  signature: z.string(),
});

export default function BuyCryptoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      toAddress: "",
      fromAddress: "",
      amount: "0",
      signature: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const myAddress = Cookies.get("walletAddress");

      console.log("My Address:", myAddress);
      //   if (!myAddress) {
      //     alert("Please connect your wallet first!");
      //     return;
      //   }

      const response = await axiosInstance.post("/transactions/send", {
        fromAddress: myAddress,
        toAddress: values.toAddress,
        amount: values.amount,
        signature: values.signature,
      });

      console.log("Send coin successful!", response?.data);

      //   window.location.reload();
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center mb-4">Send Coin</h1>
        <p className="text-secondary">S</p>
        {/* <button className="mb-4 flex text-secondary justify-between items-center rounded-2xl border-input bg-background px-4 py-3 text-sm">
				Connect Your Wallet
				<OpenSideBarBtn
					ButtonText="Connect"
					ClassNames="primary-btn px-6 py-2 rounded-full text-secondary2"
				/>
			</button>
			<button className="primary-btn self-center px-6 py-4 rounded-full">Submit</button>
			 */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="toAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To Address</FormLabel>
                  <FormControl>
                    <Input
                      className="border-hidden focus-visible:shadow-none"
                      placeholder="To Address"
                      type="toAddress"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      className="border-hidden"
                      placeholder="Amount"
                      type="amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="signature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Signature</FormLabel>
                  <FormControl>
                    <Input
                      className="border-hidden"
                      placeholder="Your Private Key"
                      type="signature"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="primary-btn w-full mt-4">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
