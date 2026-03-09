const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: { 'Content-Type': 'application/json', ...options?.headers },
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(err.detail ?? `API error ${res.status}`);
    }
    return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Lead {
    id: number;
    name: string;
    company: string;
    email: string;
    industry: string | null;
    company_size: number | null;
    location: string | null;
    job_title: string | null;
    score: number;
    status: string;
    created_at: string;
}

export interface PaginatedLeads {
    total: number;
    page: number;
    limit: number;
    results: Lead[];
}

export interface Campaign {
    id: number;
    name: string;
    status: string;
    contacts_count: number;
    open_rate: string | null;
    reply_rate: string | null;
    meetings: number;
    created_at: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

export interface DashboardMetric {
    label: string;
    value: string;
    trend: string;
}

export interface DashboardTask {
    id: number;
    name: string;
    company: string;
    email: string;
    status: string;
    score: number;
}

export interface DashboardSummary {
    metrics: DashboardMetric[];
    tasks: DashboardTask[];
}

export interface RepPerformance {
    name: string;
    email: string;
    meetings: number;
}

export interface AnalyticsSummary {
    total_leads: number;
    total_meetings: number;
    total_campaigns: number;
    reps: RepPerformance[];
}

// ---------------------------------------------------------------------------
// Leads / Contacts
// ---------------------------------------------------------------------------

export const getLeads = (params?: { search?: string; page?: number; limit?: number }) => {
    const qs = new URLSearchParams();
    if (params?.search) qs.set('search', params.search);
    if (params?.page) qs.set('page', String(params.page));
    if (params?.limit) qs.set('limit', String(params.limit));
    return apiFetch<PaginatedLeads>(`/leads/?${qs.toString()}`);
};

export const createLead = (data: Omit<Lead, 'id' | 'score' | 'status' | 'created_at'>) =>
    apiFetch<Lead>('/leads/', { method: 'POST', body: JSON.stringify(data) });

export const deleteLead = (id: number) =>
    apiFetch<void>(`/leads/${id}`, { method: 'DELETE' });

// ---------------------------------------------------------------------------
// Campaigns
// ---------------------------------------------------------------------------

export const getCampaigns = () => apiFetch<Campaign[]>('/campaigns/');

export const createCampaign = (data: Omit<Campaign, 'id' | 'created_at'>) =>
    apiFetch<Campaign>('/campaigns/', { method: 'POST', body: JSON.stringify(data) });

export const updateCampaign = (id: number, data: Partial<Campaign>) =>
    apiFetch<Campaign>(`/campaigns/${id}`, { method: 'PUT', body: JSON.stringify(data) });

export const deleteCampaign = (id: number) =>
    apiFetch<void>(`/campaigns/${id}`, { method: 'DELETE' });

// ---------------------------------------------------------------------------
// Team / Users
// ---------------------------------------------------------------------------

export const getUsers = () => apiFetch<User[]>('/users/');

export const createUser = (data: Pick<User, 'name' | 'email' | 'role'>) =>
    apiFetch<User>('/users/', { method: 'POST', body: JSON.stringify(data) });

export const deleteUser = (id: string) =>
    apiFetch<void>(`/users/${id}`, { method: 'DELETE' });

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------

export const getDashboardSummary = () => apiFetch<DashboardSummary>('/dashboard/summary');

// ---------------------------------------------------------------------------
// Analytics
// ---------------------------------------------------------------------------

export const getAnalyticsSummary = () => apiFetch<AnalyticsSummary>('/analytics/summary');
