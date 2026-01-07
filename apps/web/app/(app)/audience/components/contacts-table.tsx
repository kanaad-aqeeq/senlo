"use client";

import { Card, Badge, Button, DropdownMenu } from "@senlo/ui";
import { Contact } from "@senlo/core";
import { Users, Mail, MoreVertical, Trash2 } from "lucide-react";

interface ContactsTableProps {
  contacts: Contact[];
  onAddContact: () => void;
  onDeleteContact?: (contactId: number) => void;
}

export function ContactsTable({
  contacts,
  onAddContact,
  onDeleteContact,
}: ContactsTableProps) {
  if (contacts.length === 0) {
    return (
      <div className="space-y-4">
        <Card className="py-12 text-center border-dashed">
          <Users size={40} className="mx-auto text-zinc-300 mb-4" />
          <p className="text-zinc-500">No contacts in this project yet.</p>
          <Button variant="outline" className="mt-4" onClick={onAddContact}>
            Add your first contact
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-100">
              <th className="px-6 py-3 text-xs font-semibold text-zinc-500 uppercase">
                Contact
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-zinc-500 uppercase">
                Added
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-zinc-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {contacts.map((contact) => (
              <tr
                key={contact.id}
                className="hover:bg-zinc-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-bold">
                      {contact.name ? (
                        contact.name[0].toUpperCase()
                      ) : (
                        <Mail size={14} />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-zinc-900 flex items-center gap-2">
                        {contact.name || "Anonymous"}
                        {contact.unsubscribed && (
                          <Badge
                            variant="outline"
                            className="text-[10px] py-0 px-1.5 bg-red-50 text-red-600 border-red-100 uppercase font-bold"
                          >
                            Unsubscribed
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {contact.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-500">
                  {contact.createdAt instanceof Date
                    ? contact.createdAt.toLocaleDateString("en-GB")
                    : String(contact.createdAt)}
                </td>
                <td className="px-6 py-4 text-right">
                  <DropdownMenu
                    trigger={
                      <button className="text-zinc-400 hover:text-zinc-600">
                        <MoreVertical size={16} />
                      </button>
                    }
                    items={[
                      {
                        label: "Delete Contact",
                        icon: <Trash2 size={14} />,
                        onClick: () => onDeleteContact?.(contact.id),
                        className: "text-red-600",
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
