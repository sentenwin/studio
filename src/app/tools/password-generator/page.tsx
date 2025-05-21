
"use client";

import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Copy, RefreshCw, CheckIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MIN_LENGTH = 8;
const MAX_LENGTH = 64;
const DEFAULT_LENGTH = 12;

const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState<string>('');
  const [length, setLength] = useState<number>(DEFAULT_LENGTH);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const { toast } = useToast();

  const generatePassword = useCallback(() => {
    let characterPool = '';
    if (includeUppercase) characterPool += CHAR_SETS.uppercase;
    if (includeLowercase) characterPool += CHAR_SETS.lowercase;
    if (includeNumbers) characterPool += CHAR_SETS.numbers;
    if (includeSymbols) characterPool += CHAR_SETS.symbols;

    if (characterPool === '') {
      setPassword('');
      toast({
        title: "Cannot Generate Password",
        description: "Please select at least one character type.",
        variant: "destructive",
      });
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      newPassword += characterPool[randomIndex];
    }
    setPassword(newPassword);
    setCopied(false); // Reset copied state when new password is generated
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, toast]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      toast({
        title: "Copied to Clipboard!",
        description: "The password has been copied.",
      });
      setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        title: "Copy Failed",
        description: "Could not copy password to clipboard.",
        variant: "destructive",
      });
    });
  };

  const handleLengthChange = (value: number | number[]) => {
    const newLength = Array.isArray(value) ? value[0] : value;
    if (newLength >= MIN_LENGTH && newLength <= MAX_LENGTH) {
      setLength(newLength);
    }
  };
  
  const handleLengthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
        if (val >= MIN_LENGTH && val <= MAX_LENGTH) setLength(val);
    } else if (e.target.value === "") {
        // Allow clearing the input, but slider won't update until a valid number is re-entered
        // Or, you could reset to MIN_LENGTH, e.g., setLength(MIN_LENGTH);
    }
  };


  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-4 bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Password Generator</h1>
          <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="max-w-lg mx-auto shadow-lg rounded-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">Instantly generate a secure, random password</CardTitle>
            <CardDescription>Use our online password generator tool to instantly create a secure, random password.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Password Display */}
            <div className="bg-muted p-4 rounded-md border border-border">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-mono break-all text-foreground flex-grow mr-2" data-testid="generated-password">
                  {password || "Generating..."}
                </span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={handleCopyToClipboard} aria-label="Copy password">
                    {copied ? <CheckIcon className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={generatePassword} aria-label="Refresh password">
                    <RefreshCw className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Customize Password Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Customize your password</h3>
              <div className="space-y-4">
                {/* Password Length */}
                <div className="space-y-2">
                  <Label htmlFor="passwordLength" className="text-base font-medium">Password Length: {length}</Label>
                  <div className="flex items-center space-x-3">
                    <Input
                      id="passwordLengthInput"
                      type="number"
                      value={length}
                      onChange={handleLengthInputChange}
                      onBlur={(e) => { // Ensure length is within bounds when focus is lost
                        let val = parseInt(e.target.value, 10);
                        if(isNaN(val) || val < MIN_LENGTH) val = MIN_LENGTH;
                        if(val > MAX_LENGTH) val = MAX_LENGTH;
                        setLength(val);
                      }}
                      className="w-20 text-center h-10"
                      min={MIN_LENGTH}
                      max={MAX_LENGTH}
                    />
                    <Slider
                      id="passwordLength"
                      min={MIN_LENGTH}
                      max={MAX_LENGTH}
                      step={1}
                      value={[length]}
                      onValueChange={handleLengthChange}
                      className="flex-grow"
                    />
                  </div>
                </div>

                {/* Character Options */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeUppercase" 
                      checked={includeUppercase} 
                      onCheckedChange={(checked) => setIncludeUppercase(Boolean(checked))}
                    />
                    <Label htmlFor="includeUppercase" className="font-normal">Uppercase (A-Z)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeLowercase" 
                      checked={includeLowercase} 
                      onCheckedChange={(checked) => setIncludeLowercase(Boolean(checked))}
                    />
                    <Label htmlFor="includeLowercase" className="font-normal">Lowercase (a-z)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeNumbers" 
                      checked={includeNumbers} 
                      onCheckedChange={(checked) => setIncludeNumbers(Boolean(checked))}
                    />
                    <Label htmlFor="includeNumbers" className="font-normal">Numbers (0-9)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeSymbols" 
                      checked={includeSymbols} 
                      onCheckedChange={(checked) => setIncludeSymbols(Boolean(checked))}
                    />
                    <Label htmlFor="includeSymbols" className="font-normal">Symbols (!@#...)</Label>
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={handleCopyToClipboard} className="w-full text-lg py-3 mt-6 bg-destructive hover:bg-destructive/90 text-destructive-foreground">
              Copy password
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

    