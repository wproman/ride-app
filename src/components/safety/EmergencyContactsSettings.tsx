/* eslint-disable @typescript-eslint/no-unused-vars */
// components/safety/EmergencyContactsSettings.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpdateEmergencyContactsMutation } from '@/redux/features/user/profileApi';
import {
    Save,
    Shield,
    Trash2,
    UserPlus,
    Users
} from 'lucide-react';
import { useState } from 'react';
import { toast } from "sonner";

interface EmergencyContact {
  name: string;
  number: string;
  type: 'personal' | 'police' | 'hospital';
}

const EmergencyContactsSettings = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { name: 'Police', number: '911', type: 'police' },
    { name: 'Hospital', number: '911', type: 'hospital' }
  ]);
  const [newContact, setNewContact] = useState({ name: '', number: '' });
  const [updateEmergencyContacts, { isLoading }] = useUpdateEmergencyContactsMutation();


  const handleAddContact = () => {
    if (!newContact.name.trim() || !newContact.number.trim()) {
  
   toast.error("Validation Error");
    toast.info(`Please fill in both name and number`);
      return;
    }

    const contact: EmergencyContact = {
      ...newContact,
      type: 'personal'
    };

    setContacts([...contacts, contact]);
    setNewContact({ name: '', number: '' });
    toast.success("Contact Added");
    toast.info(`${newContact.name}`);
  };

  const handleRemoveContact = (index: number) => {
    const contact = contacts[index];
    if (contact.type === 'police' || contact.type === 'hospital') {
    toast.warning("Cannot Remove");
    toast.info(`Default emergency services cannot be removed`);
      return;
    }

    setContacts(contacts.filter((_, i) => i !== index));
   toast.success("Contact Removed");
    toast.info(`${contact.name} has been removed from emergency contacts`);
  };

  const handleSaveContacts = async () => {
    try {
      await updateEmergencyContacts({ emergencyContacts: contacts }).unwrap();
    toast.success("Contacts Saved");
    toast.info(`Your emergency contacts have been updated successfully`);
    } catch (error) {
      toast.error("Save Failed");
    toast.info(`Failed to update emergency contacts. Please try again.`)

    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          Emergency Contacts
        </CardTitle>
        <CardDescription>
          Set up emergency contacts that will be notified when you use the SOS button
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Contacts */}
        <div className="space-y-4">
          <Label>Current Emergency Contacts</Label>
          {contacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{contact.name}</div>
                  <div className="text-sm text-muted-foreground">{contact.number}</div>
                </div>
                {contact.type !== 'personal' && (
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    System
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveContact(index)}
                disabled={contact.type !== 'personal'}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Add New Contact */}
        <div className="space-y-4">
          <Label>Add New Emergency Contact</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact-name">Contact Name</Label>
              <Input
                id="contact-name"
                placeholder="John Doe"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="contact-number">Phone Number</Label>
              <Input
                id="contact-number"
                placeholder="+1234567890"
                value={newContact.number}
                onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={handleAddContact} className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add Contact
          </Button>
        </div>

        {/* Save Button */}
        <Button 
          onClick={handleSaveContacts} 
          disabled={isLoading}
          className="w-full flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          {isLoading ? 'Saving...' : 'Save Emergency Contacts'}
        </Button>

        <div className="text-sm text-muted-foreground">
          <p>• Emergency contacts will receive your location when you use the SOS button</p>
          <p>• Police and hospital numbers are pre-set for your safety</p>
          <p>• You can add up to 5 personal emergency contacts</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyContactsSettings;