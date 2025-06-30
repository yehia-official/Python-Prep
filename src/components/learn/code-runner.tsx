
'use client';

import { useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Play, Loader2, Lightbulb } from 'lucide-react';
import { handleRunCode, handleExplainCode } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import dict from '@/locales/en.json';

export function CodeRunner({ 
  initialCode
}: {
  initialCode: string
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isExecuting, startExecutingTransition] = useTransition();
  const [isExplaining, startExplainingTransition] = useTransition();

  const isPending = isExecuting || isExplaining;
  const runnerDict = dict.codeRunner;

  const onRunCode = () => {
    setOutput('');
    setExplanation('');
    startExecutingTransition(async () => {
      const result = await handleRunCode(code);
      setOutput(result.output);
    });
  };

  const onExplainCode = () => {
    setOutput('');
    setExplanation('');
    startExplainingTransition(async () => {
      const result = await handleExplainCode(code);
      setExplanation(result.explanation);
    });
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={runnerDict.placeholder}
        className="font-code text-sm h-64 bg-muted"
        disabled={isPending}
        dir="ltr"
      />
      <div className='flex gap-2'>
        <Button onClick={onRunCode} disabled={isPending}>
          {isExecuting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Play className="mr-2 h-4 w-4" />
          )}
          {runnerDict.run}
        </Button>
        <Button onClick={onExplainCode} disabled={isPending} variant="secondary">
          {isExplaining ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Lightbulb className="mr-2 h-4 w-4" />
          )}
          {runnerDict.explain}
        </Button>
      </div>

      {isExecuting && (
        <div className="animate-in fade-in" dir="ltr">
          <h4 className="font-semibold mb-2">{runnerDict.output}:</h4>
          <pre className="bg-slate-900 text-white p-4 rounded-md text-sm overflow-x-auto">
            <code>{runnerDict.running}...</code>
          </pre>
        </div>
      )}

      {output && !isExecuting && (
        <div className="animate-in fade-in" dir="ltr">
          <h4 className="font-semibold mb-2">{runnerDict.output}:</h4>
          <pre className="bg-slate-900 text-white p-4 rounded-md text-sm overflow-x-auto">
            <code>{output}</code>
          </pre>
        </div>
      )}

      {isExplaining && (
         <Alert className="animate-in fade-in">
          <Loader2 className="h-4 w-4 animate-spin" />
          <AlertTitle>{runnerDict.explainingTitle}</AlertTitle>
          <AlertDescription>
            {runnerDict.explainingDesc}
          </AlertDescription>
        </Alert>
      )}

      {explanation && !isExplaining && (
        <Alert variant="default" className="bg-primary/10 border-primary/20 animate-in fade-in">
          <Lightbulb className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary font-headline">{runnerDict.explanationTitle}</AlertTitle>
          <AlertDescription className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
            {explanation}
          </AlertDescription>
        </Alert>
      )}

    </div>
  );
}
