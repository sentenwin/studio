
"use client";

import Link from 'next/link';
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const GST_RATES = [5, 12, 18, 28];

const formatCurrency = (value: number | null, fractionDigits = 2) => {
  if (value === null || isNaN(value)) return '₹ 0.00';
  return `₹ ${value.toLocaleString('en-IN', { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits })}`;
};

export default function GstCalculatorPage() {
  const [selectedGstRate, setSelectedGstRate] = useState<number>(18);
  const [amountStr, setAmountStr] = useState<string>('');
  const [isInclusive, setIsInclusive] = useState<boolean>(false); // false = amountStr is exclusive, true = amountStr is inclusive

  const handleAmountChange = (value: string, type: 'exclusive' | 'inclusive') => {
    const sanitizedValue = value.replace(/[^0-9.]/g, '');
    setAmountStr(sanitizedValue);
    setIsInclusive(type === 'inclusive');
  };

  const calculations = useMemo(() => {
    const numericAmount = parseFloat(amountStr);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return {
        baseAmount: null,
        gstAmount: null,
        totalAmount: null,
        cgstSgstAmount: null,
      };
    }

    let base: number;
    let gst: number;
    let total: number;

    if (isInclusive) {
      total = numericAmount;
      base = total / (1 + selectedGstRate / 100);
      gst = total - base;
    } else {
      base = numericAmount;
      gst = base * (selectedGstRate / 100);
      total = base + gst;
    }

    return {
      baseAmount: base,
      gstAmount: gst,
      totalAmount: total,
      cgstSgstAmount: gst / 2,
    };
  }, [amountStr, selectedGstRate, isInclusive]);

  const clearForm = () => {
    setAmountStr('');
    setSelectedGstRate(18);
    setIsInclusive(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-4 bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">GST Calculator</h1>
          <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="max-w-md mx-auto shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Calculate GST</CardTitle>
            <CardDescription>Enter an amount and select a GST rate.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-2 block">Select GST Rate <span className="text-destructive">*</span></Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {GST_RATES.map(rate => (
                  <Button
                    key={rate}
                    variant={selectedGstRate === rate ? 'default' : 'outline'}
                    onClick={() => setSelectedGstRate(rate)}
                    className={cn(
                      "w-full py-3 text-sm sm:text-base",
                      selectedGstRate === rate ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2" : "hover:bg-primary/10"
                    )}
                  >
                    {rate}%
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amountWithoutGst" className="text-base font-medium">Amount without GST</Label>
              <Input
                id="amountWithoutGst"
                type="text"
                value={isInclusive && calculations.baseAmount !== null ? calculations.baseAmount.toFixed(2) : (isInclusive ? "" : amountStr) }
                onChange={(e) => handleAmountChange(e.target.value, 'exclusive')}
                onFocus={() => {
                    if(isInclusive && calculations.baseAmount !== null) {
                        setAmountStr(calculations.baseAmount.toFixed(2));
                    }
                    setIsInclusive(false);
                }}
                placeholder="e.g., 10000"
                className="text-lg h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amountWithGst" className="text-base font-medium">Amount with GST</Label>
              <Input
                id="amountWithGst"
                type="text"
                value={!isInclusive && calculations.totalAmount !== null ? calculations.totalAmount.toFixed(2) : (!isInclusive ? "" : amountStr)}
                onChange={(e) => handleAmountChange(e.target.value, 'inclusive')}
                 onFocus={() => {
                    if(!isInclusive && calculations.totalAmount !== null) {
                        setAmountStr(calculations.totalAmount.toFixed(2));
                    }
                    setIsInclusive(true);
                }}
                placeholder="e.g., 11800"
                className="text-lg h-12"
              />
            </div>
            
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <Label className="text-base font-medium text-muted-foreground">GST Amount:</Label>
                <span className="text-lg font-semibold text-primary">{formatCurrency(calculations.gstAmount)}</span>
              </div>
              <hr className="border-dashed"/>
              <div className="text-base space-y-1">
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">IGST:</span> 
                    <span className="font-medium">{formatCurrency(calculations.gstAmount)}</span>
                  </p>
                  <p className="text-center text-sm text-muted-foreground my-1">OR</p>
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">CGST:</span> 
                    <span className="font-medium">{formatCurrency(calculations.cgstSgstAmount)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">SGST/UTGST:</span> 
                    <span className="font-medium">{formatCurrency(calculations.cgstSgstAmount)}</span>
                  </p>
              </div>
            </div>

            <Button onClick={clearForm} variant="outline" className="w-full text-base py-3">
              Clear
            </Button>
          </CardContent>
        </Card>
      </main>

      <footer className="py-8 bg-secondary/30 border-t border-border text-center mt-12">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Open MaduraAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
