# Kahunas Product Requirements Document

## 1. Elevator Pitch
For independent coaches and small coaching businesses, "Kahunas" is an all-in-one online platform that streamlines client management, scheduling, and communication. Unlike generic business tools that require complex integrations, Momentum provides a dedicated, seamless environment for coaches to manage their practice, deliver exceptional client experiences, and focus on what they do best: coaching. It's the digital home for your coaching business.

## 2. Who is this App for?
This platform is designed for two primary user roles: Coaches and their Clients.

Persona 1: The Coach (e.g., "Alex the Life Coach")
Bio: Alex is an experienced life and career coach with a growing list of 15-20 active clients. They are passionate about helping people but feel bogged down by administrative tasks.

Pain Points:

Juggling multiple tools: a calendar for scheduling, a video conferencing app, a separate payment processor, and email/chat for communication.

Difficulty keeping track of client notes, session history, and progress over time.

Onboarding new clients is a manual, time-consuming process involving multiple emails and links.

No central place to share resources like worksheets, articles, or action plans with clients.

Goals:

To spend more time coaching and less time on admin.

To present a professional and organized image to clients.

To have a single, reliable system for their entire coaching workflow.

To easily track client progress and engagement.

Persona 2: The Client (e.g., "Ben the Coachee")
Bio: Ben is a mid-career professional who has hired Alex to help with career development. He is tech-savvy but values simplicity and convenience.

Pain Points:

Searching through old emails to find the link for his next session.

Forgetting what action items he was supposed to complete between sessions.

Difficulty finding a time to reschedule a session that works for both him and his coach.

Goals:

A simple, one-stop portal to manage everything related to his coaching engagement.

Clear visibility into his upcoming appointments and session history.

Easy access to notes, resources, and action items from his coach.

A straightforward way to communicate with his coach and manage payments.

## 3. Functional Requirements
3.1. User & Client Management
FR1.1: Secure User Authentication: Coaches and Clients must be able to sign up and log in securely using email/password or OAuth (Google, LinkedIn).

FR1.2: Coach Profile: Coaches can create and edit a public-facing profile with their photo, bio, specializations, and contact information.

FR1.3: Client Dashboard: Coaches have a central dashboard to view all their active and inactive clients.

FR1.4: Client Record: Each client has a detailed record containing:

Contact information.

Session history (dates, notes).

Shared files and resources.

A private notes section for the coach.

A shared notes section visible to both coach and client.

FR1.5: Client Onboarding: Coaches can invite new clients via email. The invitation link guides the client through setting up their account and accessing the client portal.

3.2. Scheduling & Appointments
FR2.1: Calendar Integration: Coaches can connect their Google Calendar or Outlook Calendar to sync their availability in real-time.

FR2.2: Booking Page: Each coach has a personal, shareable booking page where clients (or potential clients) can see available slots and book a session.

FR2.3: Service/Session Types: Coaches can define different types of sessions (e.g., "30-min Intro Call," "60-min Standard Session," "3-Session Package") with set durations and prices.

FR2.4: Automated Confirmations & Reminders: The system automatically sends email/SMS confirmations upon booking and reminders before a session (e.g., 24 hours and 1 hour before).

FR2.5: Rescheduling/Cancellation: Both coaches and clients can request to reschedule or cancel appointments, subject to the coach's predefined policy (e.g., "cancellations must be made 24 hours in advance").

3.3. Communication & Sessions
FR3.1: Integrated Video Conferencing: The platform generates a unique, secure video call link for each session. No need for external Zoom or Google Meet links.

FR3.2: Secure Messaging: A built-in, asynchronous messaging feature for coaches and clients to communicate securely between sessions.

FR3.3: File Sharing: Coaches and clients can upload and share documents (PDFs, Word docs), images, and other resources within the client portal.

3.4. Payments & Invoicing
FR4.1: Payment Gateway Integration: Integration with Stripe or a similar payment processor to handle credit/debit card payments.

FR4.2: Pay-per-Session: Clients can be required to pay for a session at the time of booking.

FR4.3: Invoicing: Coaches can generate and send invoices to clients for one-off services or packages.

FR4.4: Subscription/Packages: Ability to create and manage multi-session packages or recurring monthly coaching subscriptions.

## 4. User Stories
As a Coach, I want to...
US1: ...invite a new client to the platform so they can easily create their account and get started.

US2: ...sync my Google Calendar so my availability is always up-to-date without manual entry.

US3: ...create different session types with specific durations and prices so clients can book the right service.

US4: ...view all my upcoming appointments for the week on a single dashboard so I can prepare accordingly.

US5: ...write private notes during a session that my client cannot see, so I can track my own thoughts and observations.

US6: ...create a shared action plan with my client after a session so we both know what the next steps are.

US7: ...require payment upon booking for new clients to avoid no-shows and unpaid sessions.

As a Client, I want to...
US8: ...see my coach's real-time availability and book a new session in under two minutes.

US9: ...receive an automatic email reminder 24 hours before my session so I don't forget.

US10: ...log in to a single portal to see my entire session history and notes.

US11: ...easily find and download the worksheet my coach shared with me last week.

US12: ...send a quick, secure message to my coach to ask a clarifying question between sessions.

US13: ...reschedule an upcoming appointment with a few clicks.

## 5. User Interface (High-Level Overview)
5.1. Coach View
Dashboard: The landing page after login. Features a summary of upcoming appointments, recent client activity, and unread messages.

Clients Page: A list/grid view of all clients. Searchable and filterable (e.g., by "active" or "inactive"). Clicking a client opens their detailed record.

Calendar Page: A full-screen calendar view showing all booked appointments. Allows the coach to manually create or block off time.

Services/Packages Page: Where the coach defines their session types, durations, and pricing.

Settings Page: For managing profile information, calendar integration, payment settings, and notification preferences.

5.2. Client View
Dashboard: A simplified landing page showing the next scheduled appointment, a button to book a new one, and recent messages/files from their coach.

Booking Page: A clean, simple interface to select a session type and pick an available time from the coach's calendar.

My Account / History Page: A chronological log of past and upcoming appointments, with access to shared notes and files for each session.

Messaging Interface: A simple, chat-like interface for communicating with the coach.