
"use client";

import type { Metadata } from 'next';
import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

// Metadata can't be used in client components directly in App Router.
// It should be defined in a parent Server Component or layout if dynamic,
// or as a static export from the page file if it's a Server Component.
// For now, we'll skip page-specific metadata here as it's a client component.

const LOAN_AMOUNT_MIN = 50000;
const LOAN_AMOUNT_MAX = 5000000; // 50 Lakhs
const LOAN_AMOUNT_STEP = 10000;

const INTEREST_RATE_MIN = 5; // %
const INTEREST_RATE_MAX = 25; // %
const INTEREST_RATE_STEP = 0.1; // %

const TENURE_YEARS_MIN = 1;
const TENURE_YEARS_MAX = 7;
const TENURE_MONTHS_MIN = 1;
const TENURE_MONTHS_MAX = 84; // 7 years

const formatCurrency = (value: number | null, defaultString: string = '₹ 0') => {
  if (value === null || isNaN(value)) return defaultString;
  return value.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export default function EmiCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<number>(750000);
  const [interestRate, setInterestRate] = useState<number>(11); // Annual percentage
  const [loanTenure, setLoanTenure] = useState<number>(3); // Value based on tenureType
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');

  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);

  const calculateEmi = useCallback(() => {
    if (loanAmount <= 0) {
      setEmi(0);
      setTotalInterest(0);
      setTotalPayment(0);
      return;
    }

    const principal = loanAmount;
    const annualRate = interestRate;
    const tenureInMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;

    if (tenureInMonths <= 0) {
      setEmi(0);
      setTotalInterest(0);
      setTotalPayment(principal);
      return;
    }
    
    if (annualRate === 0) {
        const calculatedEmi = principal / tenureInMonths;
        setEmi(calculatedEmi);
        setTotalInterest(0);
        setTotalPayment(principal);
        return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const numerator = Math.pow(1 + monthlyRate, tenureInMonths);
    const calculatedEmi = (principal * monthlyRate * numerator) / (numerator - 1);

    if (isFinite(calculatedEmi)) {
      setEmi(calculatedEmi);
      const totalPaid = calculatedEmi * tenureInMonths;
      setTotalPayment(totalPaid);
      setTotalInterest(totalPaid - principal);
    } else {
      setEmi(null);
      setTotalInterest(null);
      setTotalPayment(null);
    }
  }, [loanAmount, interestRate, loanTenure, tenureType]);

  useEffect(() => {
    calculateEmi();
  }, [calculateEmi]);

  const handleLoanAmountChange = (value: number[]) => {
    setLoanAmount(value[0]);
  };

  const handleInterestRateChange = (value: number[]) => {
    setInterestRate(value[0]);
  };

  const handleLoanTenureChange = (value: number[]) => {
    setLoanTenure(value[0]);
  };

  const handleTenureTypeChange = (type: 'years' | 'months') => {
    if (tenureType === type) return;

    if (type === 'months') {
      // Convert years to months
      if (tenureType === 'years') {
        setLoanTenure(Math.round(loanTenure * 12));
      }
    } else {
      // Convert months to years
      if (tenureType === 'months') {
         setLoanTenure(Math.max(TENURE_YEARS_MIN, Math.round(loanTenure / 12)));
      }
    }
    setTenureType(type);
  };
  
  const getTenureSliderMax = () => tenureType === 'years' ? TENURE_YEARS_MAX : TENURE_MONTHS_MAX;
  const getTenureSliderMin = () => tenureType === 'years' ? TENURE_YEARS_MIN : TENURE_MONTHS_MIN;


  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-4 bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">EMI Calculator</h1>
          <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Loan Details</CardTitle>
              <CardDescription>Adjust the sliders or enter values to calculate your EMI.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-2">
              {/* Loan Amount */}
              <div className="space-y-2">
                <Label htmlFor="loanAmount" className="text-base font-medium">Loan Amount</Label>
                <div className="flex items-center rounded-md border border-input focus-within:ring-2 focus-within:ring-ring">
                  <Input
                    id="loanAmount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val)) setLoanAmount(Math.max(LOAN_AMOUNT_MIN, Math.min(val, LOAN_AMOUNT_MAX)));
                        else if (e.target.value === "") setLoanAmount(LOAN_AMOUNT_MIN);
                    }}
                    className="border-0 focus-visible:ring-0 flex-grow text-lg px-3 py-2.5"
                    min={LOAN_AMOUNT_MIN}
                    max={LOAN_AMOUNT_MAX}
                  />
                  <span className="px-4 py-2.5 bg-muted text-muted-foreground text-lg rounded-r-md">₹</span>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={handleLoanAmountChange}
                  min={LOAN_AMOUNT_MIN}
                  max={LOAN_AMOUNT_MAX}
                  step={LOAN_AMOUNT_STEP}
                  className="my-3"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatCurrency(LOAN_AMOUNT_MIN)}</span>
                    <span>{formatCurrency(LOAN_AMOUNT_MAX)}</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <Label htmlFor="interestRate" className="text-base font-medium">Interest Rate (p.a.)</Label>
                 <div className="flex items-center rounded-md border border-input focus-within:ring-2 focus-within:ring-ring">
                  <Input
                    id="interestRate"
                    type="number"
                    value={interestRate}
                     onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val)) setInterestRate(Math.max(INTEREST_RATE_MIN, Math.min(val, INTEREST_RATE_MAX)));
                         else if (e.target.value === "") setInterestRate(INTEREST_RATE_MIN);
                    }}
                    className="border-0 focus-visible:ring-0 flex-grow text-lg px-3 py-2.5"
                    min={INTEREST_RATE_MIN}
                    max={INTEREST_RATE_MAX}
                    step={INTEREST_RATE_STEP}
                  />
                  <span className="px-4 py-2.5 bg-muted text-muted-foreground text-lg rounded-r-md">%</span>
                </div>
                <Slider
                  value={[interestRate]}
                  onValueChange={handleInterestRateChange}
                  min={INTEREST_RATE_MIN}
                  max={INTEREST_RATE_MAX}
                  step={INTEREST_RATE_STEP}
                  className="my-3"
                />
                 <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{INTEREST_RATE_MIN}%</span>
                    <span>{INTEREST_RATE_MAX}%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div className="space-y-2">
                <Label htmlFor="loanTenure" className="text-base font-medium">Loan Tenure</Label>
                <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center rounded-md border border-input focus-within:ring-2 focus-within:ring-ring flex-grow">
                        <Input
                            id="loanTenure"
                            type="number"
                            value={loanTenure}
                            onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                if (!isNaN(val)) setLoanTenure(Math.max(getTenureSliderMin(), Math.min(val, getTenureSliderMax())));
                                else if (e.target.value === "") setLoanTenure(getTenureSliderMin());
                            }}
                            className="border-0 focus-visible:ring-0 flex-grow text-lg px-3 py-2.5"
                            min={getTenureSliderMin()}
                            max={getTenureSliderMax()}
                        />
                    </div>
                    <Button
                        variant={tenureType === 'years' ? 'secondary' : 'outline'}
                        onClick={() => handleTenureTypeChange('years')}
                        className="px-4 py-2.5 text-base"
                    >
                        Yr
                    </Button>
                    <Button
                        variant={tenureType === 'months' ? 'secondary' : 'outline'}
                        onClick={() => handleTenureTypeChange('months')}
                        className="px-4 py-2.5 text-base"
                    >
                        Mo
                    </Button>
                </div>
                <Slider
                  value={[loanTenure]}
                  onValueChange={handleLoanTenureChange}
                  min={getTenureSliderMin()}
                  max={getTenureSliderMax()}
                  step={1}
                  className="my-3"
                />
                 <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{getTenureSliderMin()} {tenureType === 'years' ? 'Yr' : 'Mo'}</span>
                    <span>{getTenureSliderMax()} {tenureType === 'years' ? 'Yr' : 'Mo'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-xl md:sticky md:top-28">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">EMI Summary</CardTitle>
              <CardDescription>Monthly payment and total costs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-lg">
              <div className="flex justify-between items-center">
                <span className="text-foreground/80">Loan EMI</span>
                <span className="font-semibold text-primary text-2xl">{formatCurrency(emi)}</span>
              </div>
              <hr/>
              <div className="flex justify-between items-center">
                <span className="text-foreground/80">Total Interest Payable</span>
                <span className="font-semibold text-accent">{formatCurrency(totalInterest)}</span>
              </div>
               <hr/>
              <div className="flex justify-between items-center">
                <span className="text-foreground/80">Total Payment <br/>(Principal + Interest)</span>
                <span className="font-semibold text-foreground">{formatCurrency(totalPayment)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="py-8 bg-secondary/30 border-t border-border text-center mt-12">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Open MaduraAI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

    
