"use client";

import { useState, useEffect } from "react";
import { PageHeader, Button } from "@senlo/ui";
import { UserPlus, ListPlus } from "lucide-react";
import { ImportContactsDialog } from "./import-contacts-dialog";
import { useSearchParams } from "next/navigation";
import { 
  useAudienceData, 
  useContacts, 
  useRecipientLists, 
  useCreateContact,
  useCreateList,
  useDeleteContact 
} from "apps/web/queries/audience";

import { AudienceTabs } from "./components/audience-tabs";
import { ContactsTable } from "./components/contacts-table";
import { ListsGrid } from "./components/lists-grid";
import { CreateContactDialog } from "./components/create-contact-dialog";
import { CreateListDialog } from "./components/create-list-dialog";

export function AudienceContent() {
  const searchParams = useSearchParams();
  
  // Fetch projects using React Query
  const {
    data: projects = [],
    isLoading: projectsLoading,
    error: projectsError,
  } = useAudienceData();


  const initialListId = searchParams.get("listId")
    ? Number(searchParams.get("listId"))
    : null;

  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"contacts" | "lists">(
    initialListId ? "contacts" : "contacts"
  );
  const [selectedListId, setSelectedListId] = useState<number | null>(
    initialListId
  );

  // Update selectedProjectId when projects load or URL params change
  useEffect(() => {
    if (projects.length > 0 && !projectsLoading) {
      const urlProjectId = searchParams.get("projectId");
      const newDefaultProjectId = urlProjectId || projects[0]?.id.toString() || "";
      
      // Only update if current selection is empty or invalid
      if (!selectedProjectId || !projects.find(p => p.id.toString() === selectedProjectId)) {
        setSelectedProjectId(newDefaultProjectId);
      }
    }
  }, [projects, projectsLoading, searchParams, selectedProjectId]);

  const projectId = Number(selectedProjectId);
  
  // Use React Query hooks for data management
  const {
    data: contacts = [],
    isLoading: contactsLoading,
    error: contactsError,
  } = useContacts({
    projectId: projectId || undefined,
    listId: selectedListId || undefined,
  });

  const {
    data: lists = [],
    isLoading: listsLoading,
    error: listsError,
  } = useRecipientLists(projectId || undefined);

  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isListDialogOpen, setIsListDialogOpen] = useState(false);

  // Use React Query mutation hooks
  const { mutate: createContactMutation } = useCreateContact();
  const { mutate: createListMutation } = useCreateList();
  const { mutate: deleteContactMutation } = useDeleteContact();

  const handleCreateContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; // Capture form reference
    const formData = new FormData(form);
    
    createContactMutation(formData, {
      onSuccess: () => {
        setIsContactDialogOpen(false);
        form.reset(); // Use captured reference
      },
      onError: (error) => {
        // Handle field errors from the server action
        if (error && typeof error === "object" && "error" in error && error.error) {
          const fieldErrors = (error.error as any).fieldErrors;
          let errorMessage = "Validation failed";

          if (fieldErrors) {
            if ("email" in fieldErrors && fieldErrors.email?.[0]) {
              errorMessage = fieldErrors.email[0];
            } else if ("name" in fieldErrors && fieldErrors.name?.[0]) {
              errorMessage = fieldErrors.name[0];
            } else if ("projectId" in fieldErrors && fieldErrors.projectId?.[0]) {
              errorMessage = fieldErrors.projectId[0];
            } else if ("general" in fieldErrors && fieldErrors.general?.[0]) {
              errorMessage = fieldErrors.general[0];
            }
          }

          alert(`Error: ${errorMessage}`);
        } else {
          alert("Failed to create contact. Please try again.");
        }
      }
    });
  };

  const handleDeleteContact = (contactId: number) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    deleteContactMutation(contactId, {
      onError: () => {
        alert("Failed to delete contact. Please try again.");
      }
    });
  };

  const handleCreateList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; // Capture form reference
    const formData = new FormData(form);
    
    createListMutation(formData, {
      onSuccess: () => {
        setIsListDialogOpen(false);
        form.reset(); // Use captured reference
      },
      onError: (error) => {
        // Handle field errors from the server action
        if (error && typeof error === "object" && "error" in error && error.error) {
          const fieldErrors = (error.error as any).fieldErrors;
          let errorMessage = "Validation failed";

          if (fieldErrors) {
            if ("name" in fieldErrors && fieldErrors.name?.[0]) {
              errorMessage = fieldErrors.name[0];
            } else if ("description" in fieldErrors && fieldErrors.description?.[0]) {
              errorMessage = fieldErrors.description[0];
            } else if ("projectId" in fieldErrors && fieldErrors.projectId?.[0]) {
              errorMessage = fieldErrors.projectId[0];
            } else if ("general" in fieldErrors && fieldErrors.general?.[0]) {
              errorMessage = fieldErrors.general[0];
            }
          }

          alert(`Error: ${errorMessage}`);
        } else {
          alert("Failed to create list. Please try again.");
        }
      }
    });
  };

  const selectedList = lists.find((l) => l.id === selectedListId);

  // Show loading state while projects are loading
  if (projectsLoading) {
    return (
      <main className="max-w-6xl mx-auto py-10 px-8">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </main>
    );
  }

  // Show error state if projects failed to load
  if (projectsError) {
    return (
      <main className="max-w-6xl mx-auto py-10 px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Failed to load audience data
          </h1>
          <p className="text-gray-600">{projectsError.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-10 px-8">
      {(contactsError || listsError) && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">
            {contactsError?.message || listsError?.message}
          </p>
        </div>
      )}
      
      <PageHeader
        title="Audience"
        description="Manage your contacts and recipient lists across projects."
        actions={
          <div className="flex items-center gap-3">
            <select
              className="h-9 px-3 rounded-md border border-zinc-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              disabled={projectsLoading}
            >
              {projectsLoading ? (
                <option value="">Loading projects...</option>
              ) : projects.length === 0 ? (
                <option value="">No projects available</option>
              ) : (
                projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))
              )}
            </select>
            <Button 
              size="sm" 
              onClick={() => setIsContactDialogOpen(true)}
              disabled={!selectedProjectId || projectsLoading}
            >
              <UserPlus size={16} />
              Add Contact
            </Button>
            <ImportContactsDialog
              projectId={Number(selectedProjectId)}
              lists={lists}
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsListDialogOpen(true)}
              disabled={!selectedProjectId || projectsLoading}
            >
              <ListPlus size={16} />
              New List
            </Button>
          </div>
        }
      />

      <AudienceTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        contacts={contacts}
        lists={lists}
        selectedListId={selectedListId}
        onClearListFilter={() => setSelectedListId(null)}
        selectedList={selectedList}
      />

      {listsLoading ? (
        <div className="py-20 text-center text-zinc-500">
          Loading audience data...
        </div>
      ) : activeTab === "contacts" ? (
        contactsLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              <p className="text-zinc-500">Loading contacts...</p>
            </div>
          </div>
        ) : (
          <ContactsTable
            contacts={contacts}
            onAddContact={() => setIsContactDialogOpen(true)}
            onDeleteContact={handleDeleteContact}
          />
        )
      ) : (
        <ListsGrid
          lists={lists}
          onSelectList={(listId) => {
            setSelectedListId(listId);
            setActiveTab("contacts");
          }}
        />
      )}

      <CreateContactDialog
        isOpen={isContactDialogOpen}
        onClose={() => setIsContactDialogOpen(false)}
        onSubmit={handleCreateContact}
        projectId={selectedProjectId}
        lists={lists}
        selectedListId={selectedListId}
      />

      <CreateListDialog
        isOpen={isListDialogOpen}
        onClose={() => setIsListDialogOpen(false)}
        onSubmit={handleCreateList}
        projectId={Number(selectedProjectId)}
      />
    </main>
  );
}
