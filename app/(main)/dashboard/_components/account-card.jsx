"use client";



import { Switch } from "@/components/ui/switch";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
//import { useFetch } from "@/hooks/use-fetch";
import useFetch from "@/hooks/use-fetch";
import { updateDefaultAccount } from "@/actions/account";
import { useEffect } from "react";
import { toast } from "sonner";

import React from 'react';

export const Accountcard = ({account}) => {
    const {name, balance, type, id, isDefault } = account;

     const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount, updateDefaultLoading]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);


  return (
    <Card className="hover:shadow-md transition-shadow group relative">
        <Link href={`/account/${id}`} >
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
    <CardTitle className="text-sm font-medium capitalize">{name}</CardTitle>
    
   <Switch
   checked={isDefault}
   onClick={handleDefaultChange}
   disabled={updateDefaultLoading}

   />
  </CardHeader>
  <CardContent>
   <div className='text-2xl font-bold'>
    ${parseFloat(balance).toFixed(2)}
   </div>
  <p className='text-sm text-muted-foreground '>
  {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()} Account
</p>
  </CardContent>
  <CardFooter className="flex justify-between text-sm text-muted-foreground" >
      <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
        </div>
  </CardFooter>
  </Link>
  </Card>
  )
}

