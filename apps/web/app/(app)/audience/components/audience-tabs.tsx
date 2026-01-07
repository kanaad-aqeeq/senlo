"use client";

import { Badge } from "@senlo/ui";
import { X } from "lucide-react";
import { Contact, RecipientList } from "@senlo/core";

interface AudienceTabsProps {
  activeTab: "contacts" | "lists";
  onTabChange: (tab: "contacts" | "lists") => void;
  contacts: Contact[];
  lists: RecipientList[];
  selectedListId: number | null;
  onClearListFilter: () => void;
  selectedList?: RecipientList;
}

export function AudienceTabs({
  activeTab,
  onTabChange,
  contacts,
  lists,
  selectedListId,
  onClearListFilter,
  selectedList,
}: AudienceTabsProps) {
  const handleContactsClick = () => {
    onTabChange("contacts");
    if (selectedListId) {
      onClearListFilter();
    }
  };

  const handleListsClick = () => {
    onTabChange("lists");
  };

  return (
    <>
      <div className="flex items-center gap-6 border-b border-zinc-100 mb-8">
        <button
          onClick={handleContactsClick}
          className={`pb-4 text-sm font-medium transition-colors relative ${
            activeTab === "contacts" && !selectedListId
              ? "text-blue-600"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          All Contacts
          <Badge variant="secondary" className="ml-2">
            {activeTab === "contacts" && !selectedListId
              ? contacts.length
              : "..."}
          </Badge>
          {activeTab === "contacts" && !selectedListId && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
          )}
        </button>
        <button
          onClick={handleListsClick}
          className={`pb-4 text-sm font-medium transition-colors relative ${
            activeTab === "lists" || selectedListId
              ? "text-blue-600"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          Lists
          <Badge variant="secondary" className="ml-2">
            {lists.length}
          </Badge>
          {(activeTab === "lists" || selectedListId) && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
          )}
        </button>
      </div>

      {selectedListId && activeTab === "contacts" && selectedList && (
        <div className="flex items-center gap-2 mb-6">
          <Badge
            variant="outline"
            className="flex items-center gap-2 py-1 px-3 bg-blue-50 border-blue-100 text-blue-700 font-medium"
          >
            Filter: {selectedList.name}
            <button
              onClick={onClearListFilter}
              className="hover:text-blue-900 transition-colors"
            >
              <X size={14} />
            </button>
          </Badge>
        </div>
      )}
    </>
  );
}

