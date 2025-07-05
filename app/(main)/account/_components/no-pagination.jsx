"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import React from 'react'
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal,Clock,ChevronDown,Trash,

  ChevronUp,
  Search,
 } from "lucide-react";
import { format } from "date-fns";
import{ Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { categoryColors } from '@/data/categories';
import { Badge } from 'lucide-react';
import { Input } from "@/components/ui/input";


const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};


export function TransactionTable ({ transactions })  {
const router = useRouter();
const [selectedIds, setSelectedIds] = useState([]);
const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });

const [searchTerm, setSearchTerm] = useState("");
const [typeFilter, setTypeFilter] = useState("");
const [recurringFilter, setRecurringFilter] = useState("");

const filteredAndSortedTransactions = transactions; // Placeholder for actual filtering and sorting logic

  const handleSort = (field) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field === field && current.direction === "asc" ? "desc" : "asc",
    }));
  };

    const handleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

   const handleSelectAll = () => {
    setSelectedIds((current) =>
      current.length ===filteredAndSortedTransactions.length
        ? []
        : filteredAndSortedTransactions.map((t) => t.id)
    );
  };

    const handleBulkDelete = async () => {
   
  };

  const {
    loading: deleteLoading,
    fn: deleteFn,
    data: deleted,
  } = useFetch(bulkDeleteTransactions);


const handleClearFilters = () => {
    setSearchTerm("");
    setTypeFilter("");
    setRecurringFilter("");
    setCurrentPage(1);
  };


  return (
    <div className='space-y-4'>
    {/* Filters */}
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-8"
          />
        </div>
      <div>

          <Select
            value={typeFilter}
            onValueChange={(value) => {
              setTypeFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INCOME">Income</SelectItem>
              <SelectItem value="EXPENSE">Expense</SelectItem>
            </SelectContent>
          </Select>

      <Select
            value={recurringFilter}
            onValueChange={(value) => {
              setRecurringFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Transactions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recurring">Recurring Only</SelectItem>
              <SelectItem value="non-recurring">Non-recurring Only</SelectItem>
            </SelectContent>
        </Select>
      
     { /* Bulk Actions */}
                 {selectedIds.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete Selected ({selectedIds.length})
              </Button>
            </div>
          )}
      
      {(searchTerm || typeFilter || recurringFilter) && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleClearFilters}
              title="Clear filters"
            >
              <X className="h-4 w-5" />
            </Button>
          )}

      
      </div>
    </div>

    
    {/*Transactions */}
    <div className='rounded-md border'>

    
    <Table>

  <TableHeader>
    <TableRow>
      <TableHead className="w-[50px]">
         <Checkbox 
      checked={
                    selectedIds.length === filteredAndSortedTransactions.length &&
                    filteredAndSortedTransactions.length > 0
                  }
      onCheckedChange={handleSelectAll}
   
      /> 
      </TableHead>
    <TableHead 
    className="cursor-pointer"
    onclick={() => handleSort("date")}
    >
        <div className="flex items-center">
                  Date
                  {sortConfig.field === "date" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
    </TableHead>
     <TableHead> Description</TableHead> 
      <TableHead 
    className="cursor-pointer"
    onclick={() => handleSort("Category")}
    >
    <div className="flex items-center">
                  Category
                  {sortConfig.field === "category" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>

    </TableHead>
     <TableHead 
    className="cursor-pointer"
    onclick={() => handleSort("amount")}
    >
       <div className="flex items-center justify-end">
                  Amount
                  {sortConfig.field === "amount" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
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
        <Checkbox onCheckedChange={() => handleSelect(transactions.id)}
        checked = {selectedIds.includes(transactions.id)}
         />
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
  <TooltipTrigger><Badge variant="outline" className='gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200"'>
            <Clock className='h-3 w-3' />
          {
            RECURRING_INTERVALS[
         transactions.recurringInterval ]   }
          </Badge></TooltipTrigger>
  <TooltipContent>
  <div className="text-sm">
      <div className="font-medium">Next Date:</div>
              <div>
                   {format(
                     new Date(transactions.nextRecurringDate),
                                  "PP"
                      )}
                              </div>
   </div>

  </TooltipContent>
</Tooltip>
</TooltipProvider>


        ):
        (
          <Badge variant="outline" className='gap-1'>
            <Clock className='h-3 w-3' />
          One-time
          </Badge>
        )}
    </TableCell>
                      <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/transaction/create?edit=${transaction.id}`
                            )
                          }
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => deleteFn([transaction.id])}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>

    </TableRow> 
   ))
   )}
  </TableBody>
</Table>
</div>

    </div>
  )
}
