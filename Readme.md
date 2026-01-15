# WireDrop

**WireDrop** is a secure, browser-based peer-to-peer file sharing application that enables **direct file transfers between users without server-side storage**. Built using **WebRTC DataChannels** and **WebSockets for signaling**, WireDrop delivers fast, private, and reliable file sharing entirely within the browser.

---

## Key Features

- **True Peer-to-Peer Transfer**  
  Files are transferred directly between browsers using WebRTC DataChannels.

- **Zero Server Storage**  
  The server is used only for signaling and peer discovery—no files are uploaded, stored, or processed.

- **Secure & Private**  
  End-to-end peer connections ensure data remains private between participants.

- **Large File Support**  
  Chunked file streaming with backpressure handling prevents memory overload and ensures stability.

- **Real-Time Progress Tracking**  
  Live upload and download progress indicators for both sender and receiver.

- **Connection Control**  
  Users can send, accept, reject, or cancel connection requests.

- **Modern UI & UX**  
  Clean, responsive interface built with React, Tailwind CSS, and Framer Motion.

---


---

## Technology Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- WebRTC (DataChannels)
- WebSocket (signaling)

### Backend
- Node.js
- WebSocket (`ws`)
- TypeScript

---

## How It Works

### Connection Flow

1. Users connect to the signaling server via WebSocket
2. Online users are discovered in real time
3. A connection request is sent and accepted
4. WebRTC offer/answer and ICE candidates are exchanged
5. A secure DataChannel is established
6. File transfer occurs directly between peers

### File Transfer Process

**Sender**
- Sends file metadata (name, size, type)
- Streams file in 64KB chunks
- Monitors buffer thresholds to apply backpressure
- Reports real-time progress
- Sends completion signal upon finish

**Receiver**
- Receives metadata and initializes buffers
- Collects binary chunks
- Tracks download progress
- Reassembles the file locally
- Triggers download without server interaction

---
### Security & Privacy Model

Files are never uploaded to a server

No persistent storage of user data

All file data flows exclusively through encrypted WebRTC channels

WebSockets are used strictly for signaling purposes

