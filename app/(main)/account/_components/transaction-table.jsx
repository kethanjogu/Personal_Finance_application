"use client";


import React from 'react'
import { Checkbox } from "@/components/ui/checkbox";
import { Clock } from "lucide-react";
import { format } from "date-fns";
import{ Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { categoryColors } from '@/data/categories';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Badge } from 'lucide-react';

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};


export function TransactionTable ({ transactions })  {

const filteredAndSortedTransactions = transactions; // Placeholder for actual filtering and sorting logic

  const handleSort = () => {};
  return (
    <div className='space-y-4'>
    {/* Filters */}
    
    
    {/*Transactions */}
    <div className='rounded-md border'>

    
    <Table>

  <TableHeader>
    <TableRow>
      <TableHead className="w-[50px]">    <Checkbox /> 
      </TableHead>
    <TableHead 
    className="cursor-pointer"
    onclick={() => handleSort("date")}
    >
      <div className="flex items-center">Date</div>
    </TableHead>
     <TableHead> Description</TableHead> 
      <TableHead 
    className="cursor-pointer"
    onclick={() => handleSort("Category")}
    >
      <div className="flex items-center">
       Category </div>
    </TableHead>
     <TableHead 
    className="cursor-pointer"
    onclick={() => handleSort("amount")}
    >
      Amount
    </TableHead>
       <TableHead>Recurring</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {filteredAndSortedTransactions.length === 0? (
      <TableRow>
        <TableCell colSpan={7} className="text-center text-muted-foreground">
          No Transactions Found
        </TableCell>
      </TableRow>
    ): (
      filteredAndSortedTransactions.map((transactions) =>(
    <TableRow key={transactions.id}>
      <TableCell >
        <Checkbox/>
      </TableCell>
      <TableCell>
        {format(new Date(transactions.date), "PP")}
      </TableCell>
      <TableCell>{transactions.description}</TableCell>
        <TableCell className= "capitalize" >
          <span 
          style={{
            background: categoryColors[transactions.category],
          }}
          className='px-2 py-1 rounded text-white text-sm'
          >
            
          
          
          {transactions.category}
          </span>
          </TableCell>
          
      <TableCell className="text-right font-medium"
      style={{
        color: transactions.type === "EXPENSE" ? "red" : "green"
        
      }}
      >
        {transactions.type === "EXPENSE"? "-" : "+"}$
        {transactions.amount.toFixed(2)}
        </TableCell>
        <TableCell> {transactions.isRecurring?(
      <TooltipProvider>
      <Tooltip>
  <TooltipTrigger><Badge variant="outline" className='gap-1'>
            <Clock className='h-3 w-3' />
          {
                                RECURRING_INTERVALS[
                                  transactions.recurringInterval
                                ]
                              }
          </Badge></TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
</Tooltip>
</TooltipProvider>


        ):
        (
          <Badge variant="outline" className='gap-1'>
            <Clock className='h-3 w-3' />
          One-time
          </Badge>
        )}</TableCell>
    </TableRow> 
   ) )
   )}
  </TableBody>
</Table>
</div>

    </div>
  )
}

