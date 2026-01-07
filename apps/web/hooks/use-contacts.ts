import { useState, useEffect, useMemo, useCallback } from "react";
import { Contact } from "@senlo/core";
import {
  listListContacts,
  listProjectContacts,
} from "../app/(app)/audience/actions";

export interface ContactFilters {
  projectId: number; // Required for contacts
  listId?: number;
  search?: string;
  unsubscribed?: boolean;
}

export interface UseContactsOptions {
  filters: ContactFilters;
  enabled?: boolean;
}

/**
 * Hook for loading and filtering contacts
 *
 * @param options - Configuration options with required projectId and optional filters
 * @returns Object with contacts data, loading state, error state, and filtering functions
 */
export function useContacts(options: UseContactsOptions) {
  const { filters, enabled = true } = options;
  const { projectId, listId, search, unsubscribed } = filters;

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load contacts based on filters
  useEffect(() => {
    if (!enabled || !projectId) return;

    const loadContacts = async () => {
      try {
        setLoading(true);
        setError(null);

        let result;
        if (listId) {
          // Load contacts from specific list
          result = await listListContacts(listId);
        } else {
          // Load all contacts for project
          result = await listProjectContacts(projectId);
        }

        if (result.success) {
          setContacts(result.data);
        } else {
          setError(result.error.message);
          setContacts([]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load contacts"
        );
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, [enabled, projectId, listId]);

  // Filter contacts based on current filters
  const filteredContacts = useMemo(() => {
    let filtered = [...contacts];

    // Filter by search term (email or name)
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (contact) =>
          contact.email.toLowerCase().includes(searchLower) ||
          (contact.name && contact.name.toLowerCase().includes(searchLower))
      );
    }

    // Filter by unsubscribed status
    if (unsubscribed !== undefined) {
      filtered = filtered.filter(
        (contact) => contact.unsubscribed === unsubscribed
      );
    }

    return filtered;
  }, [contacts, search, unsubscribed]);

  const refetch = useCallback(async () => {
    if (!enabled || !projectId) return;

    try {
      setLoading(true);
      setError(null);

      let result;
      if (listId) {
        result = await listListContacts(listId);
      } else {
        result = await listProjectContacts(projectId);
      }

      if (result.success) {
        setContacts(result.data);
      } else {
        setError(result.error.message);
        setContacts([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load contacts");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, [enabled, projectId, listId]);

  // Optimistic updates
  const addContactOptimistic = useCallback((newContact: Contact) => {
    setContacts(prev => [...prev, newContact]);
  }, []);

  const updateContactOptimistic = useCallback((contactId: number, updates: Partial<Contact>) => {
    setContacts(prev => 
      prev.map(contact => 
        contact.id === contactId ? { ...contact, ...updates } : contact
      )
    );
  }, []);

  const removeContactOptimistic = useCallback((contactId: number) => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  }, []);

  return {
    contacts: filteredContacts,
    allContacts: contacts,
    loading,
    error,
    refetch,
    // Computed values
    totalCount: contacts.length,
    filteredCount: filteredContacts.length,
    subscribedCount: contacts.filter((c) => !c.unsubscribed).length,
    unsubscribedCount: contacts.filter((c) => c.unsubscribed).length,
    // Optimistic update methods
    addContactOptimistic,
    updateContactOptimistic,
    removeContactOptimistic,
  };
}
