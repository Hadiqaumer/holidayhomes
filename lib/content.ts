export const journey = [
  ["Booking & Reservations", "Handle booking inquiries, reservations, availability checks and confirmations."],
  ["Pre-Arrival Assistance", "Manage guest questions, booking changes, special requests and arrival information."],
  ["Check-In Coordination", "Support arrival coordination, check-in inquiries and communication with hotel teams."],
  ["During-Stay Guest Support", "Respond to guest requests, service inquiries, complaints and assistance needs."],
  ["Checkout Management", "Assist with checkout inquiries, departure coordination and final guest communication."],
  ["Post-Stay Engagement", "Handle feedback, follow-ups, review requests and opportunities for repeat bookings."],
] as const;

export const solutions = [
  ["📅", "Reservation Management", "Booking inquiries, availability checks, modifications and confirmations."],
  ["💬", "Guest Communication", "Phone, email and messaging support for hotel guests."],
  ["🔑", "Pre-Arrival & Check-In Support", "Arrival information, special requests and check-in coordination."],
  ["🛎", "In-Stay Assistance", "Guest requests, complaints, service inquiries and issue coordination."],
  ["🧳", "Checkout Assistance", "Departure communication and checkout-related support."],
  ["⭐", "Guest Feedback & Retention", "Post-stay follow-ups, feedback management and repeat-guest engagement."],
] as const;

export const why = [
  ["Always-on assistance", "Support guest inquiries across different time zones."],
  ["Dedicated hospitality teams", "Trained representatives focused on guest communication."],
  ["Seamless guest journey", "Consistent assistance throughout the reservation lifecycle."],
  ["Scalable operations", "Support that adapts as your requirements grow."],
  ["Operational efficiency", "Reduce the workload on in-house hotel teams."],
  ["Guest-centric approach", "Every interaction handled with care and professionalism."],
] as const;

export const how = [
  ["Discovery", "We learn your guests, systems and service standards."],
  ["Setup", "Workflows, scripts and channels configured with your team."],
  ["Operations", "Your dedicated team goes live and manages guest communication."],
  ["Optimization", "Regular reviews refine quality and response times."],
] as const;

export const faq = [
  ["Do you manage on-site hotel operations?", "No. We manage reservations, requests, coordination and checkout communication remotely, while your hotel staff carry out on-site activities."],
  ["Which channels do you support?", "Phone, email and messaging channels, based on what your hotel enables and approves."],
  ["Can we start with only some services?", "Yes. Support can be a complete guest journey solution or selected tasks added to your existing operations."],
  ["How quickly will you respond to our enquiry?", "Our team will get in touch within 24 hours of your consultation request."],
] as const;

export const serve = [
  {
    t: "Hotels & Resorts",
    img: "/images/industries/hotels-resorts.webp",
    d: "Reservation support, guest inquiries, pre-arrival communication, concierge coordination, OTA messaging, loyalty support and selected back-office processes.",
    items: ["Reservations and concierge", "OTA and loyalty support"],
  },
  {
    t: "Boutique Hotels",
    img: "/images/industries/boutique-hotels.webp",
    d: "Smaller teams get extra capacity without building a large internal team.",
    items: ["Extra team capacity", "Selected support functions"],
  },
  {
    t: "Hotel Groups and Multi-Property Operators",
    img: "/images/industries/hotel-groups.webp",
    d: "Centralized support across multiple properties, with property-specific training for different policies, amenities and brand requirements.",
    items: ["Multi-property support", "Unified reporting"],
  },
  {
    t: "Vacation Rentals",
    img: "/images/industries/vacation-rentals.webp",
    d: "Smooth communication between guests, owners, booking platforms and your internal team.",
    items: ["Guest inquiries and OTA messaging", "Booking and owner reporting"],
  },
  {
    t: "Travel Management",
    img: "/images/industries/travel-management.webp",
    d: "Extra capacity for reservations, traveler questions and itinerary-related communication.",
    items: ["Reservation handling", "Itinerary communication"],
  },
  {
    t: "Extended-Stay, B&Bs & Inns",
    img: "/images/industries/extended-stay.webp",
    d: "Selected guest support or administrative functions when your team needs additional capacity.",
    items: ["Guest support", "Administrative tasks"],
  },
] as const;


export const navLinks = [["Guest Journey", "#journey"], ["Solutions", "#solutions"], ["Industries", "#industries"], ["About", "#about"], ["How We Work", "#how"], ["FAQ", "#faq"]] as const;

export const heroSlides = [
  { image: "/images/slides/Booking-Coordination.webp", tag: "Reservations", title: "Booking & Reservations", text: "Inquiries, availability checks and confirmations handled for you.", points: ["Booking inquiries", "Availability checks", "Confirmations & changes"] },
  { image: "/images/slides/guest-support.webp", tag: "24/7 Support", title: "Always-On Guest Support", text: "Calls, email and messaging answered around the clock.", points: ["Calls & email", "WhatsApp & messaging", "Around-the-clock cover"] },
  { image: "/images/slides/check-in-coordination.webp", tag: "Arrival", title: "Check-In Coordination", text: "Smooth arrivals with clear information before guests land.", points: ["Arrival information", "Special requests", "Hotel team coordination"] },
  { image: "/images/slides/in-stay-assisstance.webp", tag: "In-Stay", title: "In-Stay Assistance", text: "Guest requests logged, coordinated and followed up.", points: ["Guest requests", "Complaint handling", "Issue follow-up"] },
  { image: "/images/slides/airbnb-host-welcoming-guests.webp", tag: "Retention", title: "Feedback & Repeat Guests", text: "Reviews, follow-ups and engagement that bring guests back.", points: ["Post-stay follow-ups", "Review requests", "Repeat-booking engagement"] },
] as const;

export const about = {
  intro: "Tech Twist Global is a leading ISP, BPO and outsourcing company, committed to delivering innovative and reliable digital solutions. With a strong presence in Pakistan and a global vision, we help businesses and individuals connect, communicate and grow.",
  hospitality: "Our Hospitality BPO division brings that expertise to hotels and resorts, managing guest communication from the first inquiry to the final checkout.",
  vision: "To be a globally trusted technology partner, bridging people and possibilities through smart and dependable solutions.",
  mission: "To provide exceptional internet, BPO and digital services that empower our clients, enhance customer experiences and drive business success.",
  pills: ["Internet Services", "BPO & Customer Support", "Guest Management"],
  values: [
    ["Integrity", "Honest, transparent and accountable in everything we do."],
    ["Innovation", "Smart, modern solutions built around real business needs."],
    ["Customer Focus", "Every interaction handled with care and professionalism."],
    ["Growth", "Helping our clients, our people and our partners move forward."],
  ],
} as const;

export const servicesIntro = "Support can be delivered as a dedicated function or as selected tasks integrated into the client’s existing operations.";

export const services = [
  {
    letter: "A", group: "Core services", title: "Guest management", tagline: "Every guest touchpoint, handled.",
    items: [
      "Guest enquiries by approved communication channels",
      "Pre-arrival messages and guest information collection",
      "Reservation and booking coordination support",
      "Check-in and check-out communication",
      "In-stay assistance, request logging and follow-up",
      "Complaint intake, service recovery coordination and escalation",
      "Post-stay feedback and review-response support",
    ],
  },
  {
    letter: "B", group: "Core services", title: "Customer support", tagline: "Calls, chat and email, answered.",
    items: [
      "Inbound and outbound call handling",
      "Email, live chat and WhatsApp support where enabled by the client",
      "Customer enquiry handling and information sharing",
      "Complaint recording, resolution follow-up and escalation",
      "Appointment scheduling and customer reminders",
      "Customer feedback collection and retention follow-ups",
    ],
  },
  {
    letter: "C", group: "Holiday homes & operational support", title: "Holiday homes & property support", tagline: "Smooth stays, before to after.",
    items: [
      "Guest communication before, during and after a stay",
      "Booking enquiry follow-up and reservation coordination",
      "Sharing approved arrival instructions and property information",
      "Coordination of maintenance and housekeeping requests with on-ground teams",
      "Guest issue tracking and status updates",
      "Checkout follow-up and post-stay communication",
    ],
  },
  {
    letter: "D", group: "Holiday homes & operational support", title: "Back-office & administration", tagline: "Organised records, clear reports.",
    items: [
      "Data entry and digital record maintenance",
      "Guest, booking and customer database updates",
      "CRM and spreadsheet management",
      "Daily activity logs and operational summaries",
      "Document and information organization",
      "Administrative follow-up and coordination",
    ],
  },
  {
    letter: "E", group: "Holiday homes & operational support", title: "Technology-enabled support", tagline: "Your tools, our support.",
    items: [
      "CRM and customer record workflow support",
      "Use of client-approved communication and ticketing platforms",
      "Reporting and performance-monitoring assistance",
      "Workflow documentation and process improvement support",
      "Software onboarding and user coordination, where agreed",
    ],
  },
] as const;