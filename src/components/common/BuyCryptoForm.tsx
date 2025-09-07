/** @format */

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "@/apis/axiosInstance";
import Cookies from "js-cookie";
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
import toast from "react-hot-toast";

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

      await axiosInstance.post("/transactions/send", {
        fromAddress: myAddress,
        toAddress: values.toAddress,
        amount: values.amount,
        signature: values.signature,
      });

      toast.success(
        `Sent ${values.amount} MCoin to ${values.toAddress} successfully!`
      );
      form.reset();
      window.location.href = "/cryptocurrencies";
    } catch (error) {
      console.error("Transaction failed:", error);
      toast.error("Transaction failed. Please try again!");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-center mb-4">Send Coin</h1>

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
                  <Input placeholder="To Address" type="text" {...field} />
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
                <FormLabel>Amount (MCoin)</FormLabel>
                <FormControl>
                  <Input placeholder="Amount" type="number" {...field} />
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
                    placeholder="Your Private Key"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="primary-btn w-full mt-4">
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
}
