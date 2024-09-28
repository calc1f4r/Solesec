"use client";

import { useAuditRequest } from "../hooks/useAuditRequest";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuditResultsProps {
  userQuery: string;
}

export function AuditResults({ userQuery }: AuditResultsProps) {
  const {
    result: auditResult,
    isLoading,
    error,
    requestAudit,
  } = useAuditRequest();

  const handleSendRequest = () => {
    requestAudit(userQuery);
  };

  return (
    <div>
      <Button onClick={handleSendRequest} className="mb-4">
        Send Audit Request
      </Button>
      {isLoading && <Skeleton className="w-full h-32" />}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to fetch audit results. Please try again.
          </AlertDescription>
        </Alert>
      )}
      {auditResult && (
        <div className="bg-purple-900 text-white p-4 rounded-md">
          <h2 className="text-xl font-bold mb-2">Audit Results</h2>
          <pre className="whitespace-pre-wrap">{auditResult.message}</pre>
        </div>
      )}
    </div>
  );
}
