import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Contact, RecipientList, Project } from "@senlo/core";
import { 
  getAudienceData,
  listProjectContacts,
  listProjectLists,
  listListContacts,
  createContact,
  createList,
  deleteContact,
  importContactsAction,
} from "../app/(app)/audience/actions";
import { queryKeys } from "../providers";
import { logger } from "../lib/logger";

/**
 * Query function for fetching audience data (projects)
 */
async function fetchAudienceData(): Promise<{ projects: Project[] }> {
  const result = await getAudienceData();
  
  if (!result.success) {
    throw new Error(result.error.message);
  }
  
  return result.data;
}

/**
 * Query function for fetching contacts by project
 */
async function fetchProjectContacts(projectId: number): Promise<Contact[]> {
  const result = await listProjectContacts(projectId);
  
  if (!result.success) {
    throw new Error(result.error.message);
  }
  
  return result.data;
}

/**
 * Query function for fetching contacts by list
 */
async function fetchListContacts(listId: number): Promise<Contact[]> {
  const result = await listListContacts(listId);
  
  if (!result.success) {
    throw new Error(result.error.message);
  }
  
  return result.data;
}

/**
 * Query function for fetching recipient lists by project
 */
async function fetchProjectLists(projectId: number): Promise<RecipientList[]> {
  const result = await listProjectLists(projectId);
  
  if (!result.success) {
    throw new Error(result.error.message);
  }
  
  return result.data;
}

/**
 * Hook for fetching audience data (projects)
 */
export function useAudienceData() {
  return useQuery({
    queryKey: queryKeys.projects.lists(),
    queryFn: fetchAudienceData,
    select: (data) => data.projects,
  });
}

/**
 * Hook for fetching contacts with flexible filtering
 */
export function useContacts(filters: { 
  projectId?: number; 
  listId?: number; 
}) {
  const { projectId, listId } = filters;

  // Determine the appropriate query key and function based on filters
  const queryKey = listId 
    ? queryKeys.contacts.byList(listId)
    : projectId 
      ? queryKeys.contacts.byProject(projectId) 
      : queryKeys.contacts.all;

  const queryFn = listId 
    ? () => fetchListContacts(listId)
    : projectId 
      ? () => fetchProjectContacts(projectId)
      : () => Promise.resolve([]);

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!(projectId || listId),
  });
}

/**
 * Hook for fetching recipient lists by project
 */
export function useRecipientLists(projectId?: number) {
  return useQuery({
    queryKey: queryKeys.recipientLists.byProject(projectId || 0),
    queryFn: () => fetchProjectLists(projectId!),
    enabled: !!projectId,
  });
}

/**
 * Hook for creating a new contact
 */
export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await createContact(formData);
      if (!result.success) {
        throw result;
      }
      return result.data;
    },
    onError: (err) => {
      logger.error("Failed to create contact", {
        error: err instanceof Error ? err.message : String(err),
      });
    },
    onSuccess: (contact) => {
      logger.info("Contact created successfully", { contactId: contact.id });
    },
    onSettled: () => {
      // Invalidate all contact lists to refresh UI
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.contacts.lists() 
      });
    },
  });
}

/**
 * Hook for creating a new recipient list
 */
export function useCreateList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await createList(formData);
      if (!result.success) {
        throw result;
      }
      return result.data;
    },
    onError: (err) => {
      logger.error("Failed to create list", {
        error: err instanceof Error ? err.message : String(err),
      });
    },
    onSuccess: (list) => {
      logger.info("List created successfully", { listId: list.id });
    },
    onSettled: () => {
      // Invalidate all recipient lists to refresh UI
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.recipientLists.lists() 
      });
    },
  });
}

/**
 * Hook for deleting a contact
 */
export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contactId: number) => {
      const result = await deleteContact(contactId);
      if (!result.success) {
        throw result;
      }
      return contactId;
    },
    onError: (err, contactId) => {
      logger.error("Failed to delete contact", {
        contactId,
        error: err instanceof Error ? err.message : String(err),
      });
    },
    onSuccess: (contactId) => {
      logger.info("Contact deleted successfully", { contactId });
    },
    onSettled: () => {
      // Invalidate all contact lists to refresh UI
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.contacts.lists() 
      });
    },
  });
}

/**
 * Hook for importing contacts
 */
export function useImportContacts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      projectId: number;
      contacts: {
        email: string;
        name?: string;
        meta?: Record<string, unknown> | null;
      }[];
      listId?: number;
      newListName?: string;
    }) => {
      const result = await importContactsAction(data);
      if (!result.success) {
        throw result;
      }
      return result.data;
    },
    onError: (err) => {
      logger.error("Failed to import contacts", {
        error: err instanceof Error ? err.message : String(err),
      });
    },
    onSuccess: (result) => {
      logger.info("Contacts imported successfully", result);
    },
    onSettled: () => {
      // Invalidate both contacts and lists to refresh UI
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.contacts.lists() 
      });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.recipientLists.lists() 
      });
    },
  });
}