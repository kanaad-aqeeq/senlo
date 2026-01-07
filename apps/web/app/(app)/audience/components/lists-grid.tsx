"use client";

import { Card, Badge } from "@senlo/ui";
import { RecipientList } from "@senlo/core";
import { Folder, Calendar, ChevronRight } from "lucide-react";

interface ListsGridProps {
  lists: RecipientList[];
  onSelectList: (listId: number) => void;
}

export function ListsGrid({ lists, onSelectList }: ListsGridProps) {
  if (lists.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full py-12 text-center border-2 border-dashed border-zinc-100 rounded-xl">
          <p className="text-zinc-500">No lists created yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lists.map((list) => (
        <Card
          key={list.id}
          className="p-5 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
              <Folder size={20} />
            </div>
            <Badge variant="outline" className="text-zinc-500">
              List
            </Badge>
          </div>
          <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
            {list.name}
          </h3>
          <p className="text-sm text-zinc-500 mt-1 line-clamp-2">
            {list.description || "No description provided."}
          </p>
          <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              {list.createdAt instanceof Date
                ? list.createdAt.toLocaleDateString("en-GB")
                : String(list.createdAt)}
            </div>
            <button
              onClick={() => onSelectList(list.id)}
              className="flex items-center gap-1 text-blue-600 font-medium hover:underline"
            >
              View Contacts
              <ChevronRight size={14} />
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}

