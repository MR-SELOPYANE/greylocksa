import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as createRouter, u as useRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, d as useLocation, O as Outlet, L as Link, e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { T as Trigger, I as Icon, S as ScrollUpButton, a as ScrollDownButton, P as Portal, C as Content2, V as Viewport, L as Label, b as Item, c as ItemIndicator, d as ItemText, e as Separator, R as Root2, f as Value } from "../_libs/radix-ui__react-select.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { _ as _e } from "../_libs/cmdk.mjs";
import { O as Overlay, P as Portal$1, C as Content, a as Close, T as Title, D as Description, R as Root, b as Trigger$1 } from "../_libs/radix-ui__react-dialog.mjs";
import { C as ChevronDown, a as ChevronUp, b as Check, X, S as Search, D as Database, B as Bug, R as Radio, A as Archive, F as FolderSearch, M as MessageSquare, c as FingerprintPattern, U as Users, d as FileText, e as Activity, f as Shield, L as Lock, g as ChevronRight, h as ChevronLeft, O as OctagonAlert, i as LoaderCircle, Z as Zap, j as ShieldAlert, k as LogOut, H as House, l as FolderPlus, m as Download, E as Eye } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-presence.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const mockEntities = [
  { id: "ENT-001", type: "person", identifier: "Viktor Petrov", riskScore: 87, status: "black", lastUpdated: "2026-04-14T08:22:00Z", metadata: { nationality: "RU", dob: "1978-03-12", aliases: ["V. Petrov", "Viktor P."], sanctions: ["OFAC SDN"] }, evidenceRefs: ["EVD-101", "EVD-102", "EVD-145"], statusHistory: [{ from: "grey", to: "black", changedBy: "analyst.chen", timestamp: "2026-04-10T14:00:00Z", reason: "Confirmed sanctions match" }] },
  { id: "ENT-002", type: "org", identifier: "Meridian Holdings LLC", riskScore: 92, status: "black", lastUpdated: "2026-04-13T15:45:00Z", metadata: { jurisdiction: "CY", registeredDate: "2019-06-15", type: "Shell company", linkedPersons: ["ENT-001", "ENT-005"] }, evidenceRefs: ["EVD-200", "EVD-201"], statusHistory: [{ from: "grey", to: "black", changedBy: "analyst.smith", timestamp: "2026-04-13T15:45:00Z", reason: "Shell company linked to sanctioned entities" }] },
  { id: "ENT-003", type: "ip", identifier: "185.234.72.19", riskScore: 65, status: "grey", lastUpdated: "2026-04-12T10:30:00Z", metadata: { asn: "AS48031", country: "DE", isp: "VPN Provider GmbH", lastSeen: "2026-04-12T10:30:00Z" }, evidenceRefs: ["EVD-300"], statusHistory: [] },
  { id: "ENT-004", type: "domain", identifier: "secure-transfers.cc", riskScore: 78, status: "grey", lastUpdated: "2026-04-11T22:15:00Z", metadata: { registrar: "NameCheap", createdDate: "2025-11-03", dnsRecords: ["A: 185.234.72.19"], whoisPrivacy: true }, evidenceRefs: ["EVD-400", "EVD-401"], statusHistory: [] },
  { id: "ENT-005", type: "person", identifier: "Elena Voronova", riskScore: 74, status: "grey", lastUpdated: "2026-04-10T09:00:00Z", metadata: { nationality: "UA", dob: "1985-07-22", role: "CFO at Meridian Holdings", aliases: [] }, evidenceRefs: ["EVD-500"], statusHistory: [] },
  { id: "ENT-006", type: "org", identifier: "Northern Star Trading AG", riskScore: 45, status: "white", lastUpdated: "2026-04-09T13:20:00Z", metadata: { jurisdiction: "CH", registeredDate: "2015-01-20", type: "Trading firm", compliance: "Verified" }, evidenceRefs: [], statusHistory: [{ from: "grey", to: "white", changedBy: "analyst.chen", timestamp: "2026-04-09T13:20:00Z", reason: "Cleared after compliance review" }] },
  { id: "ENT-007", type: "ip", identifier: "91.108.12.33", riskScore: 31, status: "white", lastUpdated: "2026-04-08T17:45:00Z", metadata: { asn: "AS62041", country: "NL", isp: "Cloud Host BV", lastSeen: "2026-04-08T17:45:00Z" }, evidenceRefs: [], statusHistory: [{ from: "grey", to: "white", changedBy: "system", timestamp: "2026-04-08T17:45:00Z", reason: "Auto-cleared: legitimate cloud infrastructure" }] },
  { id: "ENT-008", type: "domain", identifier: "finops-gateway.net", riskScore: 83, status: "black", lastUpdated: "2026-04-14T06:00:00Z", metadata: { registrar: "GoDaddy", createdDate: "2026-01-15", dnsRecords: ["A: 45.33.12.88"], whoisPrivacy: true, malwareDetected: true }, evidenceRefs: ["EVD-800", "EVD-801", "EVD-802"], statusHistory: [{ from: "grey", to: "black", changedBy: "analyst.jones", timestamp: "2026-04-14T06:00:00Z", reason: "Active C2 infrastructure confirmed" }] },
  { id: "ENT-009", type: "person", identifier: "Li Wei", riskScore: 56, status: "grey", lastUpdated: "2026-04-07T11:30:00Z", metadata: { nationality: "CN", dob: "1990-09-14", role: "Intermediary", aliases: ["David Li"] }, evidenceRefs: ["EVD-900"], statusHistory: [] },
  { id: "ENT-010", type: "org", identifier: "Atlas Freight Corp", riskScore: 68, status: "grey", lastUpdated: "2026-04-06T14:15:00Z", metadata: { jurisdiction: "PA", registeredDate: "2021-03-08", type: "Logistics", vessels: 3 }, evidenceRefs: ["EVD-1000", "EVD-1001"], statusHistory: [] },
  { id: "ENT-011", type: "person", identifier: "Omar Al-Rashid", riskScore: 91, status: "black", lastUpdated: "2026-04-14T12:00:00Z", metadata: { nationality: "SY", dob: "1972-11-30", aliases: ["Abu Omar"], sanctions: ["EU", "OFAC"] }, evidenceRefs: ["EVD-1100", "EVD-1101", "EVD-1102"], statusHistory: [{ from: "grey", to: "black", changedBy: "analyst.smith", timestamp: "2026-04-12T10:00:00Z", reason: "Multi-list sanctions match" }] },
  { id: "ENT-012", type: "ip", identifier: "45.33.12.88", riskScore: 89, status: "black", lastUpdated: "2026-04-14T05:50:00Z", metadata: { asn: "AS63949", country: "US", isp: "Linode", linkedDomain: "finops-gateway.net" }, evidenceRefs: ["EVD-1200"], statusHistory: [{ from: "grey", to: "black", changedBy: "analyst.jones", timestamp: "2026-04-14T05:50:00Z", reason: "C2 server hosting malicious payloads" }] },
  { id: "ENT-013", type: "domain", identifier: "trustbank-login.com", riskScore: 95, status: "black", lastUpdated: "2026-04-13T20:00:00Z", metadata: { registrar: "NameSilo", createdDate: "2026-04-01", dnsRecords: ["A: 103.45.67.89"], phishing: true }, evidenceRefs: ["EVD-1300", "EVD-1301"], statusHistory: [{ from: "grey", to: "black", changedBy: "system", timestamp: "2026-04-13T20:00:00Z", reason: "Automated phishing detection" }] },
  { id: "ENT-014", type: "person", identifier: "Anna Kowalski", riskScore: 22, status: "white", lastUpdated: "2026-04-05T09:00:00Z", metadata: { nationality: "PL", dob: "1995-04-18", role: "Compliance Officer", employer: "Northern Star Trading AG" }, evidenceRefs: [], statusHistory: [{ from: "grey", to: "white", changedBy: "analyst.chen", timestamp: "2026-04-05T09:00:00Z", reason: "Verified legitimate employee" }] },
  { id: "ENT-015", type: "org", identifier: "Phantom Logistics Ltd", riskScore: 76, status: "grey", lastUpdated: "2026-04-04T16:30:00Z", metadata: { jurisdiction: "BZ", registeredDate: "2023-08-22", type: "Freight forwarding", suspicious: true }, evidenceRefs: ["EVD-1500"], statusHistory: [] },
  { id: "ENT-016", type: "ip", identifier: "103.45.67.89", riskScore: 88, status: "black", lastUpdated: "2026-04-13T20:05:00Z", metadata: { asn: "AS135377", country: "HK", isp: "Data Center HK", linkedDomains: ["trustbank-login.com"] }, evidenceRefs: ["EVD-1600"], statusHistory: [{ from: "grey", to: "black", changedBy: "system", timestamp: "2026-04-13T20:05:00Z", reason: "Hosting phishing infrastructure" }] },
  { id: "ENT-017", type: "person", identifier: "James Whitfield", riskScore: 41, status: "grey", lastUpdated: "2026-04-03T08:45:00Z", metadata: { nationality: "GB", dob: "1982-01-07", role: "Director at Atlas Freight Corp", aliases: [] }, evidenceRefs: ["EVD-1700"], statusHistory: [] },
  { id: "ENT-018", type: "domain", identifier: "darknet-market.onion", riskScore: 99, status: "black", lastUpdated: "2026-04-14T01:00:00Z", metadata: { type: "Tor hidden service", category: "Marketplace", active: true }, evidenceRefs: ["EVD-1800", "EVD-1801", "EVD-1802", "EVD-1803"], statusHistory: [{ from: "grey", to: "black", changedBy: "analyst.jones", timestamp: "2026-04-01T00:00:00Z", reason: "Known illicit marketplace" }] },
  { id: "ENT-019", type: "org", identifier: "SilkRoute Digital FZE", riskScore: 72, status: "grey", lastUpdated: "2026-04-02T12:00:00Z", metadata: { jurisdiction: "AE", registeredDate: "2022-05-10", type: "Crypto exchange", kycStatus: "Incomplete" }, evidenceRefs: ["EVD-1900"], statusHistory: [] },
  { id: "ENT-020", type: "person", identifier: "Maria Santos", riskScore: 15, status: "white", lastUpdated: "2026-04-01T10:30:00Z", metadata: { nationality: "PT", dob: "1992-12-25", role: "Legal Counsel", employer: "Northern Star Trading AG" }, evidenceRefs: [], statusHistory: [{ from: "grey", to: "white", changedBy: "analyst.chen", timestamp: "2026-04-01T10:30:00Z", reason: "Background check cleared" }] },
  { id: "ENT-021", type: "ip", identifier: "178.62.210.5", riskScore: 52, status: "grey", lastUpdated: "2026-03-30T19:00:00Z", metadata: { asn: "AS14061", country: "GB", isp: "DigitalOcean", usage: "VPN endpoint" }, evidenceRefs: ["EVD-2100"], statusHistory: [] },
  { id: "ENT-022", type: "domain", identifier: "crypto-swap.xyz", riskScore: 61, status: "grey", lastUpdated: "2026-03-29T14:20:00Z", metadata: { registrar: "Tucows", createdDate: "2025-06-18", category: "Crypto mixer" }, evidenceRefs: ["EVD-2200"], statusHistory: [] },
  { id: "ENT-023", type: "person", identifier: "Dmitri Volkov", riskScore: 82, status: "black", lastUpdated: "2026-04-14T09:30:00Z", metadata: { nationality: "RU", dob: "1975-05-03", aliases: ["D. Volkov", "Mitya"], sanctions: ["OFAC SDN"], linkedEntities: ["ENT-001"] }, evidenceRefs: ["EVD-2300", "EVD-2301"], statusHistory: [{ from: "grey", to: "black", changedBy: "analyst.smith", timestamp: "2026-04-14T09:30:00Z", reason: "Associated with sanctioned network" }] },
  { id: "ENT-024", type: "org", identifier: "Golden Bridge Investments", riskScore: 58, status: "grey", lastUpdated: "2026-03-28T11:00:00Z", metadata: { jurisdiction: "SG", registeredDate: "2020-09-14", type: "Investment fund", aum: "$45M" }, evidenceRefs: ["EVD-2400"], statusHistory: [] },
  { id: "ENT-025", type: "ip", identifier: "212.47.228.100", riskScore: 35, status: "white", lastUpdated: "2026-03-27T08:15:00Z", metadata: { asn: "AS12876", country: "FR", isp: "Scaleway", usage: "CDN node" }, evidenceRefs: [], statusHistory: [{ from: "grey", to: "white", changedBy: "system", timestamp: "2026-03-27T08:15:00Z", reason: "Legitimate CDN infrastructure" }] },
  { id: "ENT-026", type: "person", identifier: "Fatima Hassan", riskScore: 48, status: "grey", lastUpdated: "2026-03-26T16:45:00Z", metadata: { nationality: "EG", dob: "1988-08-19", role: "Account Manager", employer: "SilkRoute Digital FZE" }, evidenceRefs: ["EVD-2600"], statusHistory: [] },
  { id: "ENT-027", type: "domain", identifier: "gov-verify.org", riskScore: 71, status: "grey", lastUpdated: "2026-03-25T13:00:00Z", metadata: { registrar: "Epik", createdDate: "2026-02-28", category: "Impersonation", targetOrg: "US Government" }, evidenceRefs: ["EVD-2700", "EVD-2701"], statusHistory: [] },
  { id: "ENT-028", type: "org", identifier: "BlackSea Shipping Co.", riskScore: 84, status: "black", lastUpdated: "2026-04-13T08:00:00Z", metadata: { jurisdiction: "TR", registeredDate: "2017-11-05", type: "Maritime", vessels: 7, sanctionsEvasion: true }, evidenceRefs: ["EVD-2800", "EVD-2801", "EVD-2802"], statusHistory: [{ from: "grey", to: "black", changedBy: "analyst.smith", timestamp: "2026-04-13T08:00:00Z", reason: "Sanctions evasion via vessel flag-swapping" }] },
  { id: "ENT-029", type: "ip", identifier: "5.188.86.12", riskScore: 77, status: "grey", lastUpdated: "2026-03-24T20:30:00Z", metadata: { asn: "AS49505", country: "RU", isp: "Selectel", activity: "Brute-force SSH attempts" }, evidenceRefs: ["EVD-2900"], statusHistory: [] },
  { id: "ENT-030", type: "person", identifier: "Carlos Mendez", riskScore: 33, status: "white", lastUpdated: "2026-03-23T07:00:00Z", metadata: { nationality: "MX", dob: "1991-02-14", role: "Software Developer", employer: "Northern Star Trading AG" }, evidenceRefs: [], statusHistory: [{ from: "grey", to: "white", changedBy: "analyst.chen", timestamp: "2026-03-23T07:00:00Z", reason: "Routine check — no adverse findings" }] },
  { id: "ENT-031", type: "domain", identifier: "invoice-portal.biz", riskScore: 69, status: "grey", lastUpdated: "2026-03-22T15:10:00Z", metadata: { registrar: "GoDaddy", createdDate: "2026-03-01", category: "BEC infrastructure" }, evidenceRefs: ["EVD-3100"], statusHistory: [] },
  { id: "ENT-032", type: "org", identifier: "Zenith Capital Partners", riskScore: 39, status: "white", lastUpdated: "2026-03-21T10:00:00Z", metadata: { jurisdiction: "US", registeredDate: "2012-04-20", type: "Private equity", compliance: "SOC2 certified" }, evidenceRefs: [], statusHistory: [{ from: "grey", to: "white", changedBy: "analyst.chen", timestamp: "2026-03-21T10:00:00Z", reason: "Full compliance review passed" }] },
  { id: "ENT-033", type: "web", identifier: "https://shop.example.com", riskScore: 62, status: "grey", lastUpdated: "2026-04-14T11:00:00Z", metadata: { framework: "Next.js", env: "production", surface: "public" }, evidenceRefs: ["EVD-3300"], statusHistory: [] },
  { id: "ENT-034", type: "app", identifier: "com.example.mobile.banking", riskScore: 81, status: "black", lastUpdated: "2026-04-14T07:20:00Z", metadata: { platform: "Android", version: "4.12.0", store: "Play" }, evidenceRefs: ["EVD-3400", "EVD-3401"], statusHistory: [{ from: "grey", to: "black", changedBy: "analyst.jones", timestamp: "2026-04-14T07:20:00Z", reason: "Hardcoded API key + insecure deeplink" }] },
  { id: "ENT-035", type: "platform", identifier: "AWS account 9981-2210-3344", riskScore: 47, status: "grey", lastUpdated: "2026-04-13T18:00:00Z", metadata: { provider: "AWS", region: "us-east-1", scope: "production" }, evidenceRefs: [], statusHistory: [] },
  { id: "ENT-036", type: "web", identifier: "https://admin.partner-portal.io", riskScore: 73, status: "grey", lastUpdated: "2026-04-13T09:00:00Z", metadata: { framework: "Rails", env: "staging", surface: "vpn-only" }, evidenceRefs: ["EVD-3600"], statusHistory: [] },
  { id: "ENT-037", type: "platform", identifier: "Salesforce tenant ACME-PROD", riskScore: 38, status: "white", lastUpdated: "2026-04-12T10:00:00Z", metadata: { provider: "Salesforce", scope: "production", compliance: "SOC2" }, evidenceRefs: [], statusHistory: [{ from: "grey", to: "white", changedBy: "analyst.chen", timestamp: "2026-04-12T10:00:00Z", reason: "Cleared after MFA + SSO audit" }] }
];
const mockCases = [
  { id: "CASE-001", title: "Meridian Holdings Network Analysis", description: "Investigation into shell company network linked to sanctioned individuals", status: "in_progress", assignedAnalyst: "analyst.smith", linkedEntityIds: ["ENT-001", "ENT-002", "ENT-005"], progress: 65, createdAt: "2026-04-01T09:00:00Z", updatedAt: "2026-04-14T10:00:00Z", priority: "critical" },
  { id: "CASE-002", title: "C2 Infrastructure Takedown", description: "Mapping and disruption of command-and-control infrastructure", status: "in_progress", assignedAnalyst: "analyst.jones", linkedEntityIds: ["ENT-008", "ENT-012", "ENT-013", "ENT-016"], progress: 40, createdAt: "2026-04-10T14:00:00Z", updatedAt: "2026-04-14T06:00:00Z", priority: "high" },
  { id: "CASE-003", title: "Al-Rashid Sanctions Compliance", description: "Multi-jurisdictional sanctions compliance review", status: "open", assignedAnalyst: "analyst.smith", linkedEntityIds: ["ENT-011"], progress: 15, createdAt: "2026-04-12T08:00:00Z", updatedAt: "2026-04-12T08:00:00Z", priority: "critical" },
  { id: "CASE-004", title: "SilkRoute KYC Investigation", description: "Incomplete KYC review for crypto exchange entity", status: "open", assignedAnalyst: "analyst.chen", linkedEntityIds: ["ENT-019", "ENT-026"], progress: 10, createdAt: "2026-04-05T11:00:00Z", updatedAt: "2026-04-05T11:00:00Z", priority: "medium" },
  { id: "CASE-005", title: "BlackSea Maritime Evasion", description: "Sanctions evasion through vessel flag-swapping and route manipulation", status: "in_progress", assignedAnalyst: "analyst.smith", linkedEntityIds: ["ENT-028", "ENT-010"], progress: 55, createdAt: "2026-03-20T09:00:00Z", updatedAt: "2026-04-13T08:00:00Z", priority: "high" },
  { id: "CASE-006", title: "Northern Star Compliance Clearance", description: "Routine compliance verification — cleared", status: "closed", assignedAnalyst: "analyst.chen", linkedEntityIds: ["ENT-006", "ENT-014", "ENT-020", "ENT-030"], progress: 100, createdAt: "2026-03-01T10:00:00Z", updatedAt: "2026-04-09T13:20:00Z", priority: "low" },
  { id: "CASE-007", title: "Volkov-Petrov Network", description: "Cross-referencing sanctioned individuals with financial flows", status: "escalated", assignedAnalyst: "analyst.smith", linkedEntityIds: ["ENT-001", "ENT-023"], progress: 80, createdAt: "2026-03-15T08:00:00Z", updatedAt: "2026-04-14T09:30:00Z", priority: "critical" },
  { id: "CASE-008", title: "Phishing Campaign Attribution", description: "Attributing trustbank-login.com phishing campaign to threat actor", status: "in_progress", assignedAnalyst: "analyst.jones", linkedEntityIds: ["ENT-013", "ENT-016", "ENT-027"], progress: 30, createdAt: "2026-04-13T20:00:00Z", updatedAt: "2026-04-14T12:00:00Z", priority: "high" }
];
const mockAuditLog = [
  { id: "AUD-001", actor: "analyst.smith", action: "STATUS_CHANGE", entityId: "ENT-023", timestamp: "2026-04-14T09:30:00Z", ip: "10.0.1.42", details: "Status changed from grey to black" },
  { id: "AUD-002", actor: "analyst.chen", action: "ENTITY_CREATE", entityId: "ENT-032", timestamp: "2026-04-14T08:45:00Z", ip: "10.0.1.38", details: "New entity created: Zenith Capital Partners" },
  { id: "AUD-003", actor: "analyst.smith", action: "CASE_UPDATE", entityId: "CASE-007", timestamp: "2026-04-14T08:30:00Z", ip: "10.0.1.42", details: "Case escalated to priority: critical" },
  { id: "AUD-004", actor: "system", action: "AUTO_SCAN", entityId: "ENT-013", timestamp: "2026-04-13T20:00:00Z", ip: "10.0.0.1", details: "Automated phishing detection triggered" },
  { id: "AUD-005", actor: "analyst.jones", action: "STATUS_CHANGE", entityId: "ENT-008", timestamp: "2026-04-14T06:00:00Z", ip: "10.0.1.55", details: "Status changed from grey to black" },
  { id: "AUD-006", actor: "analyst.smith", action: "STATUS_CHANGE", entityId: "ENT-028", timestamp: "2026-04-13T08:00:00Z", ip: "10.0.1.42", details: "Status changed from grey to black" },
  { id: "AUD-007", actor: "system", action: "AUTO_SCAN", entityId: "ENT-016", timestamp: "2026-04-13T20:05:00Z", ip: "10.0.0.1", details: "Automated phishing infrastructure detection" },
  { id: "AUD-008", actor: "analyst.smith", action: "STATUS_CHANGE", entityId: "ENT-002", timestamp: "2026-04-13T15:45:00Z", ip: "10.0.1.42", details: "Shell company blacklisted" },
  { id: "AUD-009", actor: "analyst.smith", action: "STATUS_CHANGE", entityId: "ENT-011", timestamp: "2026-04-12T10:00:00Z", ip: "10.0.1.42", details: "Multi-list sanctions match confirmed" },
  { id: "AUD-010", actor: "analyst.chen", action: "CASE_CREATE", entityId: "CASE-004", timestamp: "2026-04-05T11:00:00Z", ip: "10.0.1.38", details: "New case opened: SilkRoute KYC Investigation" },
  { id: "AUD-011", actor: "analyst.chen", action: "STATUS_CHANGE", entityId: "ENT-006", timestamp: "2026-04-09T13:20:00Z", ip: "10.0.1.38", details: "Entity cleared after compliance review" },
  { id: "AUD-012", actor: "system", action: "HEALTH_CHECK", entityId: "SYSTEM", timestamp: "2026-04-14T12:00:00Z", ip: "10.0.0.1", details: "All services operational" },
  { id: "AUD-013", actor: "analyst.jones", action: "ENTITY_VIEW", entityId: "ENT-018", timestamp: "2026-04-14T01:15:00Z", ip: "10.0.1.55", details: "Accessed darknet marketplace entity" },
  { id: "AUD-014", actor: "admin.root", action: "ROLE_CHANGE", entityId: "USER-jones", timestamp: "2026-04-13T07:00:00Z", ip: "10.0.1.10", details: "analyst.jones granted Analyst role" },
  { id: "AUD-015", actor: "analyst.smith", action: "CASE_UPDATE", entityId: "CASE-001", timestamp: "2026-04-14T10:00:00Z", ip: "10.0.1.42", details: "Progress updated to 65%" }
];
const mockSystemStatus = [
  { service: "Database (PostgreSQL)", status: "operational", uptime: "99.98%", lastCheck: "2026-04-14T12:00:00Z", details: "Primary cluster healthy, 3 replicas in sync" },
  { service: "Auth Service (JWT)", status: "operational", uptime: "99.99%", lastCheck: "2026-04-14T12:00:00Z", details: "Token issuance nominal, 0 failures in last 24h" },
  { service: "Watchlist Engine", status: "operational", uptime: "99.95%", lastCheck: "2026-04-14T12:00:00Z", details: "Real-time matching pipeline active, 2.3ms avg latency" },
  { service: "Threat Intelligence Feed", status: "degraded", uptime: "97.20%", lastCheck: "2026-04-14T11:55:00Z", details: "OSINT feed delayed — upstream provider intermittent" },
  { service: "Audit Logger", status: "operational", uptime: "100%", lastCheck: "2026-04-14T12:00:00Z", details: "Append-only store, 15,432 entries this month" },
  { service: "API Gateway", status: "operational", uptime: "99.97%", lastCheck: "2026-04-14T12:00:00Z", details: "Rate limiting active, 142 req/min current" },
  { service: "Notification Service", status: "operational", uptime: "99.90%", lastCheck: "2026-04-14T12:00:00Z", details: "Email + webhook delivery operational" },
  { service: "Backup Service", status: "operational", uptime: "100%", lastCheck: "2026-04-14T06:00:00Z", details: "Last full backup: 2026-04-14T06:00:00Z, 4.2GB" }
];
const mockScans = [
  {
    id: "SCN-A91KZ",
    targetEntityId: "ENT-004",
    targetLabel: "secure-transfers.cc",
    profile: "active",
    status: "complete",
    startedAt: "2026-04-14T10:12:00Z",
    finishedAt: "2026-04-14T10:18:21Z",
    startedBy: "analyst.smith",
    findings: [
      { id: "F1", title: "Reflected XSS in /search", severity: "high", cwe: "CWE-79", evidence: "?q=<script>alert(1)<\/script> reflected unescaped", remediation: "Output-encode + CSP." },
      { id: "F2", title: "Missing HSTS header", severity: "low", cwe: "CWE-693", evidence: "No Strict-Transport-Security on https response", remediation: "Add HSTS with includeSubDomains." },
      { id: "F3", title: "Server banner leaks version", severity: "info", evidence: "Server: nginx/1.18.0", remediation: "Strip Server header." }
    ],
    summary: { critical: 0, high: 1, medium: 0, low: 1, info: 1 }
  },
  {
    id: "SCN-B22QM",
    targetEntityId: "ENT-013",
    targetLabel: "trustbank-login.com",
    profile: "deep",
    status: "complete",
    startedAt: "2026-04-13T20:30:00Z",
    finishedAt: "2026-04-13T20:48:09Z",
    startedBy: "analyst.jones",
    findings: [
      { id: "F1", title: "SQL injection on /api/login", severity: "critical", cwe: "CWE-89", evidence: "username=admin'-- bypasses auth", remediation: "Use prepared statements." },
      { id: "F2", title: "JWT signed with HS256 weak secret", severity: "critical", cwe: "CWE-327", evidence: "Secret cracked in 4s", remediation: "Rotate to 256-bit secret or RS256." },
      { id: "F3", title: "No rate limit on /login", severity: "high", cwe: "CWE-307", evidence: "500 attempts/min accepted", remediation: "Per-IP rate limit + backoff." },
      { id: "F4", title: "Open redirect via ?next=", severity: "medium", cwe: "CWE-601", evidence: "/login?next=//evil.com redirects offsite", remediation: "Allow-list redirect targets." }
    ],
    summary: { critical: 2, high: 1, medium: 1, low: 0, info: 0 }
  },
  {
    id: "SCN-C50LP",
    targetEntityId: "ENT-008",
    targetLabel: "finops-gateway.net",
    profile: "passive",
    status: "complete",
    startedAt: "2026-04-12T09:00:00Z",
    finishedAt: "2026-04-12T09:02:11Z",
    startedBy: "analyst.smith",
    findings: [
      { id: "F1", title: "Subdomain takeover candidate", severity: "high", cwe: "CWE-1395", evidence: "stage.finops-gateway.net CNAME → unclaimed S3 bucket", remediation: "Reclaim or remove DNS record." }
    ],
    summary: { critical: 0, high: 1, medium: 0, low: 0, info: 0 }
  }
];
const mockCustody = [
  { id: "CUS-001", actor: "analyst.smith", role: "analyst", entityId: "ENT-013", action: "VIEW", reason: "Triage incoming phishing report #2104", timestamp: "2026-04-14T11:42:00Z", ip: "10.0.1.42", hash: "9f3a2c81b4ee71d0" },
  { id: "CUS-002", actor: "analyst.jones", role: "analyst", entityId: "ENT-013", action: "SCAN", reason: "Confirm exploitability before takedown request", timestamp: "2026-04-13T20:30:00Z", ip: "10.0.1.55", hash: "44ab9012cc18ff03" },
  { id: "CUS-003", actor: "admin.root", role: "admin", entityId: "ENT-002", action: "STATUS_CHANGE", reason: "Court order received — block confirmed", timestamp: "2026-04-13T15:45:00Z", ip: "10.0.1.10", hash: "7712cd55aa90bb31" },
  { id: "CUS-004", actor: "analyst.chen", role: "analyst", entityId: "ENT-019", action: "EDIT", reason: "Updated KYC status after compliance review", timestamp: "2026-04-12T14:11:00Z", ip: "10.0.1.38", hash: "ee01ab87c4f33291" },
  { id: "CUS-005", actor: "admin.root", role: "admin", entityId: "SYSTEM", action: "LOCKDOWN", reason: "Drill: quarterly emergency lockdown rehearsal", timestamp: "2026-04-10T08:00:00Z", ip: "10.0.1.10", hash: "55bd3490ac72ee11" },
  { id: "CUS-006", actor: "analyst.smith", role: "analyst", entityId: "ENT-001", action: "EXPORT", reason: "Provide entity record to FIU under MLA request 88-2026", timestamp: "2026-04-09T13:00:00Z", ip: "10.0.1.42", hash: "12ab9988ccddee77" }
];
const mockThreats = [
  { id: "TI-001", type: "ip", value: "45.33.12.88", source: "AlienVault OTX", severity: "critical", firstSeen: "2026-04-14T03:00:00Z", description: "C2 server hosting Cobalt Strike beacons", mitre: "T1071.001", matchedEntityIds: ["ENT-012"] },
  { id: "TI-002", type: "domain", value: "trustbank-login.com", source: "PhishTank", severity: "high", firstSeen: "2026-04-13T19:00:00Z", description: "Credential phishing kit targeting EU banking customers", mitre: "T1566.002", matchedEntityIds: ["ENT-013"] },
  { id: "TI-003", type: "hash", value: "8f14e45fceea167a5a36dedd4bea2543", source: "VirusTotal", severity: "critical", firstSeen: "2026-04-12T08:14:00Z", description: "Loader binary — drops Lumma stealer", mitre: "T1204.002", matchedEntityIds: [] },
  { id: "TI-004", type: "cve", value: "CVE-2026-1042", source: "NVD", severity: "high", firstSeen: "2026-04-10T12:00:00Z", description: "Auth bypass in Next.js middleware (<14.2.31)", matchedEntityIds: ["ENT-033"] },
  { id: "TI-005", type: "domain", value: "secure-transfers.cc", source: "Internal Sentinel", severity: "medium", firstSeen: "2026-04-11T22:00:00Z", description: "Newly-registered domain, low-reputation registrar", matchedEntityIds: ["ENT-004"] },
  { id: "TI-006", type: "ip", value: "5.188.86.12", source: "AbuseIPDB", severity: "medium", firstSeen: "2026-04-09T06:00:00Z", description: "SSH brute-force source — 4,210 reports", mitre: "T1110.001", matchedEntityIds: ["ENT-029"] },
  { id: "TI-007", type: "url", value: "https://gov-verify.org/auth", source: "URLhaus", severity: "high", firstSeen: "2026-04-08T14:00:00Z", description: "Gov impersonation landing page", mitre: "T1566.002", matchedEntityIds: ["ENT-027"] },
  { id: "TI-008", type: "email", value: "billing@invoice-portal.biz", source: "Mandiant Advantage", severity: "medium", firstSeen: "2026-04-07T11:00:00Z", description: "BEC sender used in CFO impersonation campaign", mitre: "T1534", matchedEntityIds: ["ENT-031"] },
  { id: "TI-009", type: "hash", value: "d41d8cd98f00b204e9800998ecf8427e", source: "MalShare", severity: "low", firstSeen: "2026-04-06T00:00:00Z", description: "Empty file marker; benign but tracked", matchedEntityIds: [] },
  { id: "TI-010", type: "cve", value: "CVE-2026-2233", source: "GitHub Advisory", severity: "critical", firstSeen: "2026-04-04T09:30:00Z", description: "RCE in Rails ActionPack via crafted Accept header", matchedEntityIds: ["ENT-036"] }
];
const mockEvidence = [
  { id: "EVD-101", filename: "petrov-bank-records.pdf", sizeBytes: 1240113, sha256: "a3f1c92e8b7d04ff52a09c1e6e44ab019cd71b4f88a3e3e2e991b54d0c10f8a1", uploadedBy: "analyst.smith", uploadedAt: "2026-04-10T13:55:00Z", linkedEntityId: "ENT-001", category: "doc", sealed: true, integrity: "verified", notes: "SWIFT statements covering Q1; redact account 7 before share.", editHistory: [] },
  { id: "EVD-200", filename: "meridian-incorp.zip", sizeBytes: 4812902, sha256: "117bd91c0fea11abe5cc41982310aab1cc23d54fa9aa00b9e44cd4720112e981", uploadedBy: "analyst.smith", uploadedAt: "2026-04-13T15:30:00Z", linkedEntityId: "ENT-002", category: "doc", sealed: true, integrity: "verified", editHistory: [] },
  { id: "EVD-800", filename: "finops-c2-traffic.pcap", sizeBytes: 38120001, sha256: "f5a200f54cbb9ee882233ddf1199b13ee44ac02b91110aa11bb09a0e9f10ee32", uploadedBy: "analyst.jones", uploadedAt: "2026-04-14T05:50:00Z", linkedEntityId: "ENT-008", category: "pcap", sealed: true, integrity: "verified", editHistory: [] },
  { id: "EVD-1300", filename: "trustbank-phish-screenshot.png", sizeBytes: 412009, sha256: "20fa9a13bbb1f422dd02211aa7799b4f0e5e6e10c0c00bd1d2e3f4a55667788e", uploadedBy: "system", uploadedAt: "2026-04-13T20:00:00Z", linkedEntityId: "ENT-013", category: "screenshot", sealed: true, integrity: "verified", editHistory: [] },
  { id: "EVD-1800", filename: "darknet-listings.json", sizeBytes: 88201, sha256: "919e1c2a4488ee01dd33ff2200119988aa2244cc3344dd5566ee77ff8899aabb", uploadedBy: "analyst.jones", uploadedAt: "2026-04-01T00:15:00Z", linkedEntityId: "ENT-018", category: "log", sealed: true, integrity: "verified", editHistory: [] },
  { id: "EVD-3400", filename: "banking-apk-decompiled.zip", sizeBytes: 12810993, sha256: "cc77aa11dd99001144ffee5599aabbccdd11ee44ff77001122334455667788aa", uploadedBy: "analyst.jones", uploadedAt: "2026-04-14T07:18:00Z", linkedEntityId: "ENT-034", category: "binary", sealed: true, integrity: "broken", notes: "Hash mismatch on re-verify — investigate before relying on this artifact.", editHistory: [] },
  { id: "EVD-300", filename: "vpn-exit-logs.txt", sizeBytes: 220410, sha256: "412009ab77ddee0099112233445566778899aabbccddeeff0011223344556677", uploadedBy: "system", uploadedAt: "2026-04-12T10:30:00Z", linkedEntityId: "ENT-003", category: "log", sealed: false, integrity: "verified", editHistory: [] }
];
const mockHoneytokens = [
  { id: "HT-001", label: "Fake S3 admin key", kind: "api_key", bait: "AKIA-HONEY-2X9J-DEADBEEF", placedAt: "2026-03-01T00:00:00Z", triggered: true, triggers: [{ ip: "45.33.12.88", ua: "aws-cli/2.15", timestamp: "2026-04-14T04:21:00Z" }] },
  { id: "HT-002", label: "Decoy admin login", kind: "credential", bait: "svc_root / Pa55w0rd!Sentinel", placedAt: "2026-03-10T00:00:00Z", triggered: true, triggers: [{ ip: "5.188.86.12", ua: "python-requests/2.31", timestamp: "2026-04-13T03:11:00Z" }, { ip: "5.188.86.12", ua: "Hydra/9.5", timestamp: "2026-04-13T03:11:08Z" }] },
  { id: "HT-003", label: "Canary doc (Q3 strategy)", kind: "doc", bait: "/share/exec/Q3-roadmap-CONFIDENTIAL.docx", placedAt: "2026-02-15T00:00:00Z", triggered: false, triggers: [] },
  { id: "HT-004", label: "Trap URL in robots.txt", kind: "url", bait: "/internal/backup.sql", placedAt: "2026-01-20T00:00:00Z", triggered: true, triggers: [{ ip: "178.62.210.5", ua: "Mozilla/5.0 (compatible; Nikto)", timestamp: "2026-04-11T22:04:00Z" }] }
];
const mockSessions = [
  { id: "SES-001", user: "analyst.you", role: "analyst", ip: "10.0.1.42", country: "NL", device: "Chrome 124 / macOS 14", startedAt: "2026-04-14T07:00:00Z", lastActivity: "2026-04-14T12:01:00Z", active: true, anomalies: [], riskScore: 8 },
  { id: "SES-002", user: "analyst.smith", role: "analyst", ip: "10.0.1.43", country: "NL", device: "Firefox 126 / Linux", startedAt: "2026-04-14T08:14:00Z", lastActivity: "2026-04-14T11:58:00Z", active: true, anomalies: [], riskScore: 11 },
  { id: "SES-003", user: "analyst.jones", role: "analyst", ip: "188.42.11.9", country: "TH", device: "Chrome 124 / Android", startedAt: "2026-04-14T02:00:00Z", lastActivity: "2026-04-14T02:42:00Z", active: false, anomalies: ["impossible_travel", "off_hours", "new_device"], riskScore: 78 },
  { id: "SES-004", user: "analyst.chen", role: "analyst", ip: "10.0.1.38", country: "NL", device: "Safari 17 / macOS 14", startedAt: "2026-04-14T09:00:00Z", lastActivity: "2026-04-14T11:45:00Z", active: true, anomalies: [], riskScore: 6 },
  { id: "SES-005", user: "svc.exporter", role: "analyst", ip: "10.0.0.77", country: "NL", device: "curl/8.4", startedAt: "2026-04-14T11:30:00Z", lastActivity: "2026-04-14T11:59:00Z", active: true, anomalies: ["burst_export"], riskScore: 64 },
  { id: "SES-006", user: "unknown", role: "analyst", ip: "185.220.101.45", country: "DE", device: "Tor Browser 13", startedAt: "2026-04-14T01:11:00Z", lastActivity: "2026-04-14T01:11:09Z", active: false, anomalies: ["tor_exit", "off_hours"], riskScore: 92 }
];
const AppContext = reactExports.createContext(null);
function useAppState() {
  const ctx = reactExports.useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used within AppProvider");
  return ctx;
}
function genHash() {
  return Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
}
function simulateFindings(profile, target) {
  const pool = [
    { id: "F-XSS", title: "Reflected XSS in search parameter", severity: "high", cwe: "CWE-79", evidence: `GET /search?q=<script>alert(1)<\/script> reflected unescaped on ${target.identifier}`, remediation: "Output-encode user input; deploy CSP with strict default-src." },
    { id: "F-SQLI", title: "Boolean-based SQL injection", severity: "critical", cwe: "CWE-89", evidence: "id=1' AND 1=1-- returned 200; id=1' AND 1=2-- returned 500", remediation: "Use parameterized queries / prepared statements." },
    { id: "F-SSL", title: "TLS 1.0 still enabled", severity: "medium", cwe: "CWE-326", evidence: "Server negotiated TLS_RSA_WITH_AES_128_CBC_SHA on port 443", remediation: "Disable TLS < 1.2; prefer TLS 1.3." },
    { id: "F-HDR", title: "Missing security headers", severity: "low", cwe: "CWE-693", evidence: "No HSTS, X-Content-Type-Options, or Referrer-Policy headers present", remediation: "Add HSTS, X-Frame-Options, CSP, X-Content-Type-Options nosniff." },
    { id: "F-OPEN", title: "Open S3 bucket discovered", severity: "high", cwe: "CWE-284", evidence: "s3://assets-" + target.identifier.replace(/[^a-z0-9]/gi, "") + " ListBucket=AllowAll", remediation: "Apply bucket policy denying anonymous access." },
    { id: "F-CSRF", title: "Missing CSRF token on state-changing endpoint", severity: "medium", cwe: "CWE-352", evidence: "POST /api/profile accepts cross-origin form without token", remediation: "Implement CSRF tokens or SameSite=strict cookies." },
    { id: "F-AUTH", title: "JWT signed with HS256 + weak secret", severity: "critical", cwe: "CWE-327", evidence: "Secret cracked in 4s via dictionary attack", remediation: "Rotate secret to 256-bit random or switch to RS256." },
    { id: "F-INFO", title: "Server banner discloses framework version", severity: "info", evidence: "Server: nginx/1.18.0 (Ubuntu) — X-Powered-By: Express", remediation: "Strip Server/X-Powered-By headers." },
    { id: "F-RATE", title: "No rate limiting on login endpoint", severity: "high", cwe: "CWE-307", evidence: "500 password attempts/min accepted without lockout", remediation: "Add per-IP and per-account rate limits + exponential backoff." }
  ];
  const counts = { passive: 3, active: 5, deep: 7, fuzz: 9 };
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(counts[profile], pool.length));
}
function tally(findings) {
  const acc = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
  findings.forEach((f) => {
    acc[f.severity] += 1;
  });
  return acc;
}
function useAppStateProvider() {
  const [role, setRoleState] = reactExports.useState("analyst");
  const [operator, setOperator] = reactExports.useState("analyst.you");
  const [clearance, setClearance] = reactExports.useState("SECRET");
  const [entities, setEntities] = reactExports.useState(() => mockEntities);
  const [scans, setScans] = reactExports.useState(() => mockScans);
  const [cases, setCases] = reactExports.useState(() => mockCases);
  const [custody, setCustody] = reactExports.useState(() => mockCustody);
  const [evidence, setEvidence] = reactExports.useState(() => mockEvidence);
  const [lockdown, setLockdownState] = reactExports.useState(false);
  const [commandOpen, setCommandOpen] = reactExports.useState(false);
  const setRole = reactExports.useCallback((next) => {
    setRoleState((current) => {
      if (current === next) return current;
      if (current === "analyst" && next === "admin") {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("greylock:role-denied", { detail: { from: current, to: next } }));
        }
        return current;
      }
      return next;
    });
  }, []);
  const provisionRole = reactExports.useCallback((next) => setRoleState(next), []);
  const logout = reactExports.useCallback(() => {
    setRoleState("analyst");
    setOperator("analyst.you");
    setClearance("SECRET");
    setLockdownState(false);
    setCommandOpen(false);
  }, []);
  const logCustody = reactExports.useCallback((e) => {
    setCustody((prev) => [
      {
        id: `CUS-${Date.now().toString(36)}`,
        actor: "analyst.you",
        role: "analyst",
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        ip: "10.0.1.42",
        hash: genHash(),
        ...e
      },
      ...prev
    ]);
  }, []);
  const addEntity = reactExports.useCallback((input) => {
    const id = `ENT-${String(Date.now()).slice(-6)}`;
    const newEntity = {
      id,
      type: input.type,
      identifier: input.identifier,
      riskScore: input.riskScore,
      status: input.status,
      lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
      metadata: input.metadata ?? {},
      evidenceRefs: [],
      statusHistory: []
    };
    setEntities((prev) => [newEntity, ...prev]);
    return newEntity;
  }, []);
  const updateEntity = reactExports.useCallback((id, patch) => {
    setEntities(
      (prev) => prev.map(
        (e) => e.id === id ? { ...e, ...patch, lastUpdated: (/* @__PURE__ */ new Date()).toISOString() } : e
      )
    );
  }, []);
  const updateEntityStatus = reactExports.useCallback((id, status, reason = "Manual update") => {
    setEntities(
      (prev) => prev.map(
        (e) => e.id === id ? {
          ...e,
          status,
          lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
          statusHistory: [
            ...e.statusHistory,
            { from: e.status, to: status, changedBy: "operator", timestamp: (/* @__PURE__ */ new Date()).toISOString(), reason }
          ]
        } : e
      )
    );
  }, []);
  const deleteEntity = reactExports.useCallback((id) => {
    setEntities((prev) => prev.filter((e) => e.id !== id));
  }, []);
  const startScan = reactExports.useCallback((entityId, profile) => {
    const target = mockEntities.find((e) => e.id === entityId) ?? entities.find((e) => e.id === entityId);
    const label = target?.identifier ?? entityId;
    const id = `SCN-${Date.now().toString(36).toUpperCase()}`;
    const queued = {
      id,
      targetEntityId: entityId,
      targetLabel: label,
      profile,
      status: "running",
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      startedBy: "analyst.you",
      findings: [],
      summary: { critical: 0, high: 0, medium: 0, low: 0, info: 0 }
    };
    setScans((prev) => [queued, ...prev]);
    setTimeout(() => {
      const findings = target ? simulateFindings(profile, target) : [];
      setScans(
        (prev) => prev.map(
          (s) => s.id === id ? { ...s, status: "complete", finishedAt: (/* @__PURE__ */ new Date()).toISOString(), findings, summary: tally(findings) } : s
        )
      );
    }, 1800 + Math.random() * 1200);
    return queued;
  }, [entities]);
  const addCase = reactExports.useCallback((input) => {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const newCase = {
      id: `CASE-${String(Date.now()).slice(-3)}`,
      title: input.title,
      description: input.description,
      status: input.status ?? "open",
      assignedAnalyst: input.assignedAnalyst,
      linkedEntityIds: input.linkedEntityIds ?? [],
      progress: input.status === "closed" ? 100 : 0,
      createdAt: now,
      updatedAt: now,
      priority: input.priority
    };
    setCases((prev) => [newCase, ...prev]);
    setCustody((prev) => [
      {
        id: `CUS-${Date.now().toString(36)}`,
        actor: operator,
        role,
        entityId: newCase.id,
        action: "EDIT",
        reason: `Case opened: ${newCase.title}`,
        timestamp: now,
        ip: "10.0.1.42",
        hash: genHash()
      },
      ...prev
    ]);
    return newCase;
  }, [operator, role]);
  const updateCase = reactExports.useCallback((id, patch, reason = "Case details updated") => {
    setCases(
      (prev) => prev.map((c) => c.id === id ? { ...c, ...patch, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : c)
    );
    setCustody((prev) => [
      {
        id: `CUS-${Date.now().toString(36)}`,
        actor: operator,
        role,
        entityId: id,
        action: "EDIT",
        reason: `Case updated: ${reason}`,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        ip: "10.0.1.42",
        hash: genHash()
      },
      ...prev
    ]);
  }, [operator, role]);
  const updateCaseStatus = reactExports.useCallback((id, status, reason = "Manual status update") => {
    setCases(
      (prev) => prev.map(
        (c) => c.id === id ? {
          ...c,
          status,
          progress: status === "closed" ? 100 : c.progress,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        } : c
      )
    );
    setCustody((prev) => [
      {
        id: `CUS-${Date.now().toString(36)}`,
        actor: operator,
        role,
        entityId: id,
        action: "STATUS_CHANGE",
        reason: `Case → ${status.replace("_", " ").toUpperCase()}: ${reason}`,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        ip: "10.0.1.42",
        hash: genHash()
      },
      ...prev
    ]);
  }, [operator, role]);
  const updateCaseProgress = reactExports.useCallback((id, progress) => {
    const clamped = Math.max(0, Math.min(100, Math.round(progress)));
    setCases(
      (prev) => prev.map(
        (c) => c.id === id ? {
          ...c,
          progress: clamped,
          status: clamped === 100 ? "closed" : c.status,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        } : c
      )
    );
  }, []);
  const setLockdown = reactExports.useCallback((v, reason) => {
    setLockdownState(v);
    setCustody((prev) => [
      {
        id: `CUS-${Date.now().toString(36)}`,
        actor: "admin.you",
        role: "admin",
        entityId: "SYSTEM",
        action: "LOCKDOWN",
        reason: reason ?? (v ? "Emergency lockdown engaged" : "Lockdown lifted"),
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        ip: "10.0.1.10",
        hash: genHash()
      },
      ...prev
    ]);
  }, []);
  const addEvidence = reactExports.useCallback((input) => {
    const id = `EVD-${Date.now().toString(36).toUpperCase()}`;
    const sha = Array.from({ length: 8 }, () => Math.random().toString(16).slice(2, 10)).join("");
    const item = {
      id,
      filename: input.filename,
      sizeBytes: input.sizeBytes,
      sha256: sha.slice(0, 64),
      uploadedBy: operator,
      uploadedAt: (/* @__PURE__ */ new Date()).toISOString(),
      linkedEntityId: input.linkedEntityId,
      category: input.category,
      sealed: true,
      integrity: "verified",
      notes: input.notes,
      editHistory: []
    };
    setEvidence((prev) => [item, ...prev]);
    return item;
  }, [operator]);
  const updateEvidence = reactExports.useCallback((id, patch, reason) => {
    setEvidence((prev) => prev.map((e) => {
      if (e.id !== id) return e;
      const edits = Object.keys(patch).map((k) => ({
        by: operator,
        at: (/* @__PURE__ */ new Date()).toISOString(),
        field: String(k),
        from: String(e[k] ?? ""),
        to: String(patch[k] ?? ""),
        reason
      }));
      return { ...e, ...patch, lastEditedBy: operator, lastEditedAt: (/* @__PURE__ */ new Date()).toISOString(), editHistory: [...e.editHistory, ...edits] };
    }));
  }, [operator]);
  const deleteEvidence = reactExports.useCallback((id, _reason) => {
    setEvidence((prev) => prev.filter((e) => e.id !== id));
  }, []);
  const canEditEvidence = reactExports.useCallback((item) => {
    return role === "admin" || item.uploadedBy === operator;
  }, [role, operator]);
  return {
    role,
    setRole,
    provisionRole,
    logout,
    operator,
    setOperator,
    clearance,
    setClearance,
    entities,
    addEntity,
    updateEntity,
    updateEntityStatus,
    deleteEntity,
    scans,
    startScan,
    cases,
    addCase,
    updateCase,
    updateCaseStatus,
    updateCaseProgress,
    custody,
    logCustody,
    evidence,
    addEvidence,
    updateEvidence,
    deleteEvidence,
    canEditEvidence,
    lockdown,
    setLockdown,
    commandOpen,
    setCommandOpen
  };
}
const Select = Root2;
const SelectValue = Value;
const SelectTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = Trigger.displayName;
const SelectScrollUpButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;
const SelectScrollDownButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;
const SelectContent = reactExports.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Content2,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = Content2.displayName;
const SelectLabel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = Label.displayName;
const SelectItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemText, { children })
    ]
  }
));
SelectItem.displayName = Item.displayName;
const SelectSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = Separator.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const baseNav = [
  { to: "/entities", icon: Database, label: "Targets", roles: ["analyst", "admin"] },
  { to: "/scans", icon: Bug, label: "Scans", roles: ["analyst", "admin"] },
  { to: "/threats", icon: Radio, label: "Threat Intel", roles: ["analyst", "admin"] },
  { to: "/vault", icon: Archive, label: "Evidence Vault", roles: ["analyst", "admin"] },
  { to: "/cases", icon: FolderSearch, label: "Cases", roles: ["analyst", "admin"] },
  { to: "/sentinel", icon: MessageSquare, label: "Sentinel AI", roles: ["analyst", "admin"] },
  { to: "/custody", icon: FingerprintPattern, label: "Chain of Custody", roles: ["analyst", "admin"] },
  { to: "/sessions", icon: Users, label: "Sessions", roles: ["admin"] },
  { to: "/audit", icon: FileText, label: "Audit Log", roles: ["admin"] },
  { to: "/system", icon: Activity, label: "System Status", roles: ["admin"] }
];
function AppLayout({ children }) {
  const [collapsed, setCollapsed] = reactExports.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole, operator, clearance, lockdown, setLockdown, scans, logout } = useAppState();
  const navItems = baseNav.filter((n) => n.roles.includes(role));
  const running = scans.filter((s) => s.status === "running").length;
  const criticalFindings = reactExports.useMemo(
    () => scans.reduce((acc, s) => acc + (s.summary?.critical ?? 0) + (s.summary?.high ?? 0), 0),
    [scans]
  );
  const liveIocMatches = reactExports.useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    mockThreats.forEach((t) => t.matchedEntityIds.forEach((id) => set.add(id)));
    return set.size;
  }, []);
  const alertCount = criticalFindings + liveIocMatches;
  reactExports.useEffect(() => {
    const onDenied = () => {
      toast.error("Privilege escalation blocked", {
        description: "Only an admin can grant the admin role. Ask an existing admin to promote you."
      });
    };
    window.addEventListener("greylock:role-denied", onDenied);
    return () => window.removeEventListener("greylock:role-denied", onDenied);
  }, []);
  const toggleLockdown = () => {
    const reason = prompt(lockdown ? "Reason for lifting lockdown:" : "Reason for emergency lockdown:");
    if (reason === null) return;
    setLockdown(!lockdown, reason || void 0);
    toast.warning(lockdown ? "Lockdown lifted — operations resumed" : "EMERGENCY LOCKDOWN ENGAGED", {
      description: "Event written to chain-of-custody."
    });
  };
  const handleRoleChange = (v) => {
    if (role === "analyst" && v === "admin") {
      toast.error("Privilege escalation blocked", {
        description: "Only an admin can promote a user to admin. This attempt was logged."
      });
      return;
    }
    setRole(v);
    if (role === "admin" && v === "analyst") {
      toast.success("Demoted to analyst", { description: "Admin tools hidden until promoted again." });
    }
  };
  const handleLogout = () => {
    logout();
    toast.success("Signed out", { description: "Session cleared and role reset." });
    navigate({ to: "/login" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen overflow-hidden bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: cn("flex flex-col border-r border-border bg-sidebar transition-all duration-300", collapsed ? "w-16" : "w-60"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-14 items-center gap-2 border-b border-sidebar-border px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-6 w-6 shrink-0 text-tactical" }),
        !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold tracking-wider text-sidebar-foreground", children: "greyLock" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 space-y-1 p-2", children: navItems.map((item) => {
        const isActive = location.pathname.startsWith(item.to);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.to,
            className: cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-4 w-4 shrink-0" }),
              !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
            ]
          },
          item.to
        );
      }) }),
      !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 border-t border-sidebar-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: clearance })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-[10px] text-muted-foreground truncate", children: [
          operator,
          " · ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase text-tactical", children: role })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setCollapsed(!collapsed),
          className: "flex h-10 items-center justify-center border-t border-sidebar-border text-muted-foreground hover:text-sidebar-foreground",
          children: collapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col overflow-hidden", children: [
      lockdown && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-status-black bg-status-black/20 px-6 py-2 text-xs text-status-black", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(OctagonAlert, { className: "h-3.5 w-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono uppercase tracking-widest", children: "Emergency Lockdown Active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "— mutations and scans disabled until lifted by admin." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex h-14 items-center justify-between border-b border-border bg-card px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-mono text-sm font-semibold tracking-wide text-card-foreground", children: navItems.find((n) => location.pathname.startsWith(n.to))?.label ?? "Dashboard" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => navigate({ to: running > 0 ? "/scans" : "/threats" }),
              className: "hidden md:flex items-center gap-3 rounded-md border border-border bg-secondary px-2.5 py-1 text-[11px] font-mono text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
              title: "Live operational status — click to jump to the hottest queue",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  running > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin text-tactical" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3 text-muted-foreground" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: running > 0 ? "text-tactical" : "", children: [
                    running,
                    " scan",
                    running === 1 ? "" : "s"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-px bg-border" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("flex items-center gap-1", alertCount > 0 && "text-destructive"), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-3 w-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    alertCount,
                    " alert",
                    alertCount === 1 ? "" : "s"
                  ] })
                ] })
              ]
            }
          ),
          role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: toggleLockdown,
              variant: lockdown ? "outline" : "destructive",
              size: "sm",
              className: "h-7 gap-1.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(OctagonAlert, { className: "h-3.5 w-3.5" }),
                lockdown ? "Lift Lockdown" : "Lockdown"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Role:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: role, onValueChange: handleRoleChange, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-7 w-28 bg-secondary text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "analyst", children: "Analyst" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: "admin", disabled: role === "analyst", children: [
                  "Admin ",
                  role === "analyst" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-[10px] text-muted-foreground", children: "(admin-grant only)" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleLogout, variant: "outline", size: "sm", className: "h-7 gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3.5 w-3.5" }),
            "Logout"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-2 w-2 rounded-full animate-pulse-glow", lockdown ? "bg-status-black" : "bg-status-white") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase text-muted-foreground", children: lockdown ? "Locked" : "Secure" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-auto p-6", children })
    ] })
  ] });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const Dialog = Root;
const DialogTrigger = Trigger$1;
const DialogPortal = Portal$1;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const Command = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = _e.displayName;
const CommandDialog = ({ children, ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "overflow-hidden p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Command, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children }) }) });
};
const CommandInput = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    _e.Input,
    {
      ref,
      className: cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = _e.Input.displayName;
const CommandList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = _e.List.displayName;
const CommandEmpty = reactExports.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(_e.Empty, { ref, className: "py-6 text-center text-sm", ...props }));
CommandEmpty.displayName = _e.Empty.displayName;
const CommandGroup = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = _e.Group.displayName;
const CommandSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = _e.Separator.displayName;
const CommandItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    ),
    ...props
  }
));
CommandItem.displayName = _e.Item.displayName;
function CommandPalette() {
  const navigate = useNavigate();
  const {
    commandOpen,
    setCommandOpen,
    entities,
    cases,
    role,
    setRole,
    lockdown,
    setLockdown
  } = useAppState();
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen(!commandOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [commandOpen, setCommandOpen]);
  const run = (fn) => {
    setCommandOpen(false);
    setTimeout(fn, 50);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandDialog, { open: commandOpen, onOpenChange: setCommandOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommandInput, { placeholder: "Type a command, route, or entity ID…" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandList, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandEmpty, { children: "No matches." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandGroup, { heading: "Navigate", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => run(() => navigate({ to: "/" })), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(House, {}),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Landing" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => run(() => navigate({ to: "/entities" })), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Database, {}),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Targets" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => run(() => navigate({ to: "/scans" })), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bug, {}),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Scans" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => run(() => navigate({ to: "/threats" })), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, {}),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Threat Intel" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => run(() => navigate({ to: "/vault" })), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, {}),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Evidence Vault" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => run(() => navigate({ to: "/cases" })), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderSearch, {}),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Cases" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => run(() => navigate({ to: "/custody" })), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FingerprintPattern, {}),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Chain of Custody" })
        ] }),
        role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => run(() => navigate({ to: "/sessions" })), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, {}),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sessions" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => run(() => navigate({ to: "/audit" })), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, {}),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Audit Log" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => run(() => navigate({ to: "/system" })), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, {}),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "System Status" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => run(() => navigate({ to: "/sentinel" })), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, {}),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sentinel AI" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandGroup, { heading: "Actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => run(() => {
          window.dispatchEvent(new CustomEvent("greylock:open-add-entity"));
          navigate({ to: "/entities" });
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, {}),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add new target" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => run(() => {
          navigate({ to: "/cases" });
          setTimeout(() => window.dispatchEvent(new CustomEvent("greylock:new-case")), 80);
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderPlus, {}),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Open new case" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => run(() => {
          window.dispatchEvent(new CustomEvent("greylock:export-entities"));
          navigate({ to: "/entities" });
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, {}),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Export targets to CSV" })
        ] }),
        role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          CommandItem,
          {
            onSelect: () => run(() => {
              const reason = prompt(lockdown ? "Reason for lifting lockdown:" : "Reason for emergency lockdown:");
              if (reason === null) return;
              setLockdown(!lockdown, reason || void 0);
              toast.warning(lockdown ? "Lockdown lifted" : "EMERGENCY LOCKDOWN ENGAGED");
            }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(OctagonAlert, {}),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lockdown ? "Lift emergency lockdown" : "Engage emergency lockdown" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroup, { heading: "Role", children: ["analyst", "admin"].map((r) => {
        const blocked = role === "analyst" && r === "admin";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          CommandItem,
          {
            onSelect: () => run(() => {
              if (blocked) {
                toast.error("Privilege escalation blocked", { description: "Only an admin can grant the admin role." });
                return;
              }
              setRole(r);
              toast.success(`Role switched to ${r}`);
            }),
            disabled: role === r,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, {}),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "capitalize", children: [
                "Switch role · ",
                r,
                blocked ? " (admin only)" : ""
              ] })
            ]
          },
          r
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroup, { heading: "Jump to target", children: entities.slice(0, 20).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CommandItem,
        {
          value: `${e.id} ${e.identifier} ${e.type}`,
          onSelect: () => run(() => {
            navigate({ to: "/entities" });
            window.dispatchEvent(new CustomEvent("greylock:open-entity", { detail: { id: e.id } }));
          }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-tactical", children: e.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 truncate", children: e.identifier })
          ]
        },
        e.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroup, { heading: "Jump to case", children: cases.slice(0, 20).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        CommandItem,
        {
          value: `${c.id} ${c.title} ${c.status}`,
          onSelect: () => run(() => {
            navigate({ to: "/cases" });
            setTimeout(() => window.dispatchEvent(new CustomEvent("greylock:open-case", { detail: { id: c.id } })), 80);
          }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderSearch, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-tactical", children: c.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 truncate", children: c.title })
          ]
        },
        c.id
      )) })
    ] })
  ] });
}
const appCss = "/assets/styles-12WZksZ4.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-mono text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Sector Not Found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The requested resource does not exist or has been classified." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Return to Base"
      }
    ) })
  ] }) });
}
const Route$d = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "greyLock — Watchlist Intelligence System" },
      { name: "description", content: "Secure watchlist management and intelligence analysis platform" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const PUBLIC_ROUTES = ["/", "/login", "/signup"];
function RootComponent() {
  const appState = useAppStateProvider();
  const location = useLocation();
  const isPublic = PUBLIC_ROUTES.includes(location.pathname);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppContext.Provider, { value: appState, children: [
    isPublic ? /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    !isPublic && /* @__PURE__ */ jsxRuntimeExports.jsx(CommandPalette, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] });
}
const $$splitComponentImporter$c = () => import("./vault-BnlbWGI5.mjs");
const Route$c = createFileRoute("/vault")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component"),
  head: () => ({
    meta: [{
      title: "Evidence Vault — greyLock"
    }, {
      name: "description",
      content: "Sealed evidence with SHA-256 integrity and honeytoken alerts."
    }]
  })
});
const $$splitComponentImporter$b = () => import("./threats-C72-X969.mjs");
const Route$b = createFileRoute("/threats")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component"),
  head: () => ({
    meta: [{
      title: "Threat Intel — greyLock"
    }, {
      name: "description",
      content: "Live IOC feed auto-correlated against watchlist targets."
    }]
  })
});
const $$splitComponentImporter$a = () => import("./system-B201NqEI.mjs");
const Route$a = createFileRoute("/system")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component"),
  head: () => ({
    meta: [{
      title: "Command Dashboard — greyLock"
    }, {
      name: "description",
      content: "Live operations dashboard: metrics, risk distribution, case priority, and recent activity."
    }]
  })
});
const $$splitComponentImporter$9 = () => import("./signup-DovG4OZI.mjs");
const Route$9 = createFileRoute("/signup")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component"),
  head: () => ({
    meta: [{
      title: "Onboarding — greyLock"
    }, {
      name: "description",
      content: "Provision an operator account on the greyLock vulnerability testing platform."
    }]
  })
});
const $$splitComponentImporter$8 = () => import("./sessions-10uHuK0i.mjs");
const Route$8 = createFileRoute("/sessions")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component"),
  head: () => ({
    meta: [{
      title: "Sessions — greyLock"
    }, {
      name: "description",
      content: "Active session monitor with anomaly detection."
    }]
  })
});
const $$splitComponentImporter$7 = () => import("./sentinel-7wlAUtsu.mjs");
const Route$7 = createFileRoute("/sentinel")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component"),
  head: () => ({
    meta: [{
      title: "Sentinel AI — greyLock"
    }, {
      name: "description",
      content: "Live AI assistant for intelligence analysis and threat triage"
    }]
  })
});
const $$splitComponentImporter$6 = () => import("./scans-CJp2MDbo.mjs");
const Route$6 = createFileRoute("/scans")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component"),
  head: () => ({
    meta: [{
      title: "Scans — greyLock"
    }, {
      name: "description",
      content: "Run vulnerability scans against tracked targets."
    }]
  })
});
const $$splitComponentImporter$5 = () => import("./login-2d2u7Ttq.mjs");
const Route$5 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
  head: () => ({
    meta: [{
      title: "Sign In — greyLock"
    }, {
      name: "description",
      content: "Authenticate to the greyLock intelligence console."
    }]
  })
});
function AuthShell({
  title,
  subtitle,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.65_0.15_220/0.10),transparent_60%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,oklch(0.25_0.02_250/0.3)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.25_0.02_250/0.3)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mb-8 flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-6 w-6 text-tactical" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-base font-bold tracking-wider", children: "greyLock" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card/90 p-6 shadow-2xl backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-mono text-lg font-bold", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: subtitle })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 rounded border border-border px-2 py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3 text-status-white" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] uppercase tracking-widest text-muted-foreground", children: "Secure" })
          ] })
        ] }),
        children
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "All access attempts are logged" })
    ] })
  ] });
}
const $$splitComponentImporter$4 = () => import("./entities-DU-UpkON.mjs");
const Route$4 = createFileRoute("/entities")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  head: () => ({
    meta: [{
      title: "Entities — greyLock"
    }, {
      name: "description",
      content: "Watchlist entity management and intelligence system"
    }]
  })
});
const $$splitComponentImporter$3 = () => import("./custody-gnw0dMXE.mjs");
const Route$3 = createFileRoute("/custody")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  head: () => ({
    meta: [{
      title: "Chain of Custody — greyLock"
    }, {
      name: "description",
      content: "Append-only access ledger for investigative integrity."
    }]
  })
});
const $$splitComponentImporter$2 = () => import("./cases-BecN40qE.mjs");
const Route$2 = createFileRoute("/cases")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  head: () => ({
    meta: [{
      title: "Cases — greyLock"
    }, {
      name: "description",
      content: "Investigation case management"
    }]
  })
});
const $$splitComponentImporter$1 = () => import("./audit-CxGPzcyS.mjs");
const Route$1 = createFileRoute("/audit")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  head: () => ({
    meta: [{
      title: "Audit Log — greyLock"
    }, {
      name: "description",
      content: "Immutable audit trail of all system actions"
    }]
  })
});
const $$splitComponentImporter = () => import("./index-BIOAQyiM.mjs");
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  head: () => ({
    meta: [{
      title: "greyLock — Vulnerability Testing & Watchlist Intelligence"
    }, {
      name: "description",
      content: "greyLock is a tactical platform for testing websites, applications, and platforms for vulnerabilities — with chain-of-custody, emergency lockdown, and AI-assisted triage."
    }, {
      property: "og:title",
      content: "greyLock — Vulnerability Testing Platform"
    }, {
      property: "og:description",
      content: "Scan websites, apps, and platforms. Triage findings. Sign every action into chain-of-custody."
    }]
  })
});
const VaultRoute = Route$c.update({
  id: "/vault",
  path: "/vault",
  getParentRoute: () => Route$d
});
const ThreatsRoute = Route$b.update({
  id: "/threats",
  path: "/threats",
  getParentRoute: () => Route$d
});
const SystemRoute = Route$a.update({
  id: "/system",
  path: "/system",
  getParentRoute: () => Route$d
});
const SignupRoute = Route$9.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$d
});
const SessionsRoute = Route$8.update({
  id: "/sessions",
  path: "/sessions",
  getParentRoute: () => Route$d
});
const SentinelRoute = Route$7.update({
  id: "/sentinel",
  path: "/sentinel",
  getParentRoute: () => Route$d
});
const ScansRoute = Route$6.update({
  id: "/scans",
  path: "/scans",
  getParentRoute: () => Route$d
});
const LoginRoute = Route$5.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$d
});
const EntitiesRoute = Route$4.update({
  id: "/entities",
  path: "/entities",
  getParentRoute: () => Route$d
});
const CustodyRoute = Route$3.update({
  id: "/custody",
  path: "/custody",
  getParentRoute: () => Route$d
});
const CasesRoute = Route$2.update({
  id: "/cases",
  path: "/cases",
  getParentRoute: () => Route$d
});
const AuditRoute = Route$1.update({
  id: "/audit",
  path: "/audit",
  getParentRoute: () => Route$d
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$d
});
const rootRouteChildren = {
  IndexRoute,
  AuditRoute,
  CasesRoute,
  CustodyRoute,
  EntitiesRoute,
  LoginRoute,
  ScansRoute,
  SentinelRoute,
  SessionsRoute,
  SignupRoute,
  SystemRoute,
  ThreatsRoute,
  VaultRoute
};
const routeTree = Route$d._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  AuthShell as A,
  Button as B,
  Dialog as D,
  Select as S,
  DialogTrigger as a,
  DialogContent as b,
  cn as c,
  DialogHeader as d,
  DialogTitle as e,
  DialogDescription as f,
  SelectTrigger as g,
  SelectValue as h,
  SelectContent as i,
  SelectItem as j,
  DialogFooter as k,
  mockThreats as l,
  mockHoneytokens as m,
  mockSystemStatus as n,
  mockSessions as o,
  mockAuditLog as p,
  router as r,
  useAppState as u
};
