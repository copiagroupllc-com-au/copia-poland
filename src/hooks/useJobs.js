import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
const OWNERNAME = import.meta.env.VITE_OWNER_NAME;

/**
 * Fetches active jobs from the API (connected to Supabase).
 */
export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const url = `${API}/api/jobs/list?admin_name=${OWNERNAME}`;

        const res = await fetch(url);
        const body = await res.json();

        if (!res.ok) {
          throw new Error(body.error || "Failed to load jobs.");
        }

        if (!cancelled) {
          setJobs(body.jobs || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setJobs([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadJobs();

    return () => {
      cancelled = true;
    };
  }, [OWNERNAME]);

  return { jobs, loading, error };
}