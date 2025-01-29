// frontend/types/campaign.ts
export interface Campaign {
    _id: string;
    name: string;
    status: string;
    deadline: Date;
    approved?: boolean; // Optional field
    // Add other fields as necessary
  }