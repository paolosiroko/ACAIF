export interface Influencer {
    _id: string;
    name: string;
    email: string;
    campaigns: string[]; // Array of campaign IDs
    submissions: { campaignId: string; submissionUrl: string; date: Date }[];
}