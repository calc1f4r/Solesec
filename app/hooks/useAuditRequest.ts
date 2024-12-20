import { useState } from "react";
import { API_ENDPOINTS } from "../config";

interface AuditResult {
  success: boolean;
  message: string;
}

export function useAuditRequest() {
  const [result, setResult] = useState<AuditResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const requestAudit = async (userQuery: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_ENDPOINTS.audit, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_query: userQuery }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: AuditResult = await response.json();
      console.log("Received data:", data);
      setResult(data);
      return data; // Return the data directly
    } catch (err) {
      console.error("Error in requestAudit:", err);
      setError(err instanceof Error ? err : new Error("An error occurred"));
      throw err; // Re-throw the error to be caught in handleSubmit
    } finally {
      setIsLoading(false);
    }
  };

  return { result, isLoading, error, requestAudit };
}
