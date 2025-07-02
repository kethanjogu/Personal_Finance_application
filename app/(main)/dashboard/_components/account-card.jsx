import { Switch } from "@/components/ui/switch";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import React from 'react'

const Accountcard = ({account}) => {
    const {name, balance, type, id , isDefault} = account;
  return (
    <Card>
        <Link href={`/account/${id}`} >
  <CardHeader>
    <CardTitle>{name}</CardTitle>
    
   <Switch/>
  </CardHeader>
  <CardContent>
   <div className='text-2xl font-bold'>
    ${parseFloat(balance).toFixed(2)}
   </div>
   <p className='text-sm text-muted-foreground '>{type.chartAt(0) + type.slice(1).toLowercase()}
    Account
   </p>
  </CardContent>
  <CardFooter>
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

export default Accountcard;