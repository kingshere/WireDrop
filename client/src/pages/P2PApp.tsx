import { useState } from "react";
import { useWS, WSProvider } from "../context/WebSocketContext";
import FileTransfer from "../components/FileTransfer";
import {
  Menu,
  X,
  User,
  Users,
  Share2,
  Shield,
  Zap,
  MousePointerClick,
  ArrowRight,
  Copy,
  Check,
  Edit2,
} from "lucide-react";

function P2PAppContent() {
  const {
    users,
    incomingRequest,
    incomingRequestName,
    connectedRoom,
    isCaller,
    sendConnectionRequest,
    acceptRequest,
    rejectRequest,
    cancelConnectionRequest,
    disconnectPeer,
    myId,
    myName,
    setMyName,
  } = useWS();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameInput, setEditNameInput] = useState(myName);

  return (
    <div className="h-screen flex flex-col md:flex-row bg-slate-950 text-slate-50 overflow-hidden font-sans">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between z-20 sticky top-0">
        <div className="flex items-center gap-2">
          <Share2 className="text-emerald-500" size={20} />
          <h1 className="text-xl font-bold font-mono">WireDrop</h1>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
        >
          {isSidebarOpen ? (
            <X size={20} className="text-slate-300" />
          ) : (
            <Menu size={20} className="text-slate-300" />
          )}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-950/80 z-30 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-80 bg-slate-900/90 backdrop-blur-xl border-r border-slate-800 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        <div className="p-6 border-b border-slate-800 hidden md:block">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Share2 className="text-emerald-500" size={24} />
            </div>
            <h1 className="text-xl font-bold font-mono">WireDrop</h1>
          </div>
          <p className="text-sm text-slate-500 ml-1">
            Secure WebRTC File Transfer
          </p>
        </div>

        <div className="p-4 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-800">
          {/* Identity Card */}
          <div className="mb-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 p-5 shadow-xl backdrop-blur-md relative overflow-hidden group">
            {/* Ambient background glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500" />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
                    {myName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs text-cyan-400 font-medium tracking-wider uppercase mb-0.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Online
                    </div>
                    {!isEditingName ? (
                      <h3 className="text-white font-bold text-lg flex items-center gap-2">
                        {myName}
                        <button
                          onClick={() => {
                            setEditNameInput(myName);
                            setIsEditingName(true);
                          }}
                          className="text-slate-500 hover:text-emerald-400 transition-colors p-1 hover:bg-white/5 rounded-md"
                        >
                          <Edit2 size={14} />
                        </button>
                      </h3>
                    ) : (
                      <div className="flex items-center gap-2 mt-0.5">
                        <input
                          type="text"
                          value={editNameInput}
                          onChange={(e) => setEditNameInput(e.target.value)}
                          className="w-32 px-2 py-1 bg-slate-950/40 border border-slate-600 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && editNameInput.trim()) {
                              setMyName(editNameInput.trim());
                              setIsEditingName(false);
                            } else if (e.key === "Escape") {
                              setIsEditingName(false);
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            if (editNameInput.trim()) {
                              setMyName(editNameInput.trim());
                              setIsEditingName(false);
                            }
                          }}
                          className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                        >
                          <Check size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Your Device ID</span>
                </div>
                <div className="relative group/id">
                  <div className="w-full bg-slate-950/40 border border-slate-800 rounded-lg py-2.5 px-3 text-xs font-mono text-slate-400 flex items-center justify-between group-hover/id:border-slate-700 transition-colors">
                    <span className="truncate mr-2 opacity-70 group-hover/id:opacity-100 transition-opacity">
                      {myId}
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(myId)}
                      className="text-slate-600 hover:text-white transition-colors"
                      title="Copy ID"
                    >
                      <Copy size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-1">
            <Users size={14} />
            Online Users ({users.length})
          </h2>

          <div className="space-y-3">
            {users.length === 0 && (
              <div className="text-center py-8 text-slate-500 bg-slate-800/20 rounded-lg border border-dashed border-slate-800">
                <Users size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No users online</p>
                <p className="text-xs mt-1">Wait for peers to join...</p>
              </div>
            )}

            {users.map((u) => (
              <button
                key={u.id}
                onClick={() => {
                  sendConnectionRequest(u.id);
                  setIsSidebarOpen(false);
                }}
                className="group w-full text-left p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-sm font-medium text-slate-200">
                      {u.name || "Peer User"}
                    </span>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-slate-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                  />
                </div>
                <div className="text-xs text-slate-500 font-mono pl-4 truncate opacity-60 group-hover:opacity-100 transition-opacity">
                  {u.id}
                </div>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 w-full bg-slate-950 relative flex flex-col">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-900/10 via-slate-950 to-slate-950 pointer-events-none" />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center relative z-10 w-full">
          {!connectedRoom && (
            <div className="w-full max-w-2xl flex flex-col items-center justify-center text-center">
              {!incomingRequest && !isCaller && (
                <div className="space-y-6">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 rounded-full" />
                    <div className="relative bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl">
                      <Zap size={48} className="text-emerald-500" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                      Connect & Share
                    </h2>
                    <p className="text-slate-400 max-w-md mx-auto text-lg leading-relaxed">
                      Select a user from the sidebar to establish a secure,
                      peer-to-peer encrypted connection.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 w-full max-w-lg mx-auto">
                    {[
                      { icon: Shield, label: "End-to-End Encrypted" },
                      { icon: Zap, label: "Lightning Fast" },
                      { icon: MousePointerClick, label: "One-Click Connect" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center p-3 rounded-lg bg-slate-900/50 border border-slate-800"
                      >
                        <item.icon
                          size={20}
                          className="text-slate-500 mb-2"
                        />
                        <span className="text-xs text-slate-400">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="md:hidden pt-8">
                    <button
                      onClick={() => setIsSidebarOpen(true)}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-medium transition shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      Browse Online Users
                    </button>
                  </div>
                </div>
              )}

              {isCaller && !incomingRequest && (
                <div className="flex flex-col items-center space-y-6">
                  <div className="flex flex-col items-center animate-pulse space-y-4">
                    <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <Users size={32} className="text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      Waiting for connection...
                    </h2>
                    <p className="text-slate-500">
                      Request has been sent to the peer.
                    </p>
                  </div>
                  <button
                    onClick={cancelConnectionRequest}
                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium transition-colors border border-slate-700"
                  >
                    Cancel Request
                  </button>
                </div>
              )}
            </div>
          )}

          {connectedRoom && (
            <div className="w-full max-w-4xl flex flex-col items-center">
              <div className="mb-8 flex items-center gap-3 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-emerald-400 font-medium text-sm">
                  Connection Active
                </span>
                <div className="w-px h-4 bg-emerald-500/20 mx-1" />
                <span className="text-xs text-slate-400">
                  {isCaller ? "Sending Mode" : "Receiving Mode"}
                </span>
              </div>

              <FileTransfer />

              <button
                onClick={disconnectPeer}
                className="mt-6 px-6 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg font-medium transition-colors border border-red-500/30 flex items-center gap-2"
              >
                <X size={16} />
                Close
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Incoming Request Modal */}
      {incomingRequest && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                <Users size={32} className="text-emerald-500" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  Incoming Request
                </h3>
                <p className="text-slate-400 text-sm mt-2 break-all px-4">
                  <span className="text-white font-medium">
                    {incomingRequestName || "Someone"}
                  </span>{" "}
                  wants to send you a file.
                </p>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  {incomingRequest}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => rejectRequest(incomingRequest)}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={() => acceptRequest(incomingRequest)}
                  className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/20 transition-all"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function P2PApp() {
  const [name, setName] = useState<string | null>(() => {
    return localStorage.getItem("WireDrop-username");
  });
  const [nameInput, setNameInput] = useState("");

  // If no name stored, show name dialog
  if (!name) {
    return (
      <div className="h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
          <div className="p-6 space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={32} className="text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Welcome to WireDrop
              </h3>
              <p className="text-slate-400 text-sm mt-2">
                Enter your name to get started
              </p>
            </div>

            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && nameInput.trim()) {
                  localStorage.setItem("WireDrop-username", nameInput.trim());
                  setName(nameInput.trim());
                }
              }}
            />

            <button
              onClick={() => {
                if (nameInput.trim()) {
                  localStorage.setItem("WireDrop-username", nameInput.trim());
                  setName(nameInput.trim());
                }
              }}
              disabled={!nameInput.trim()}
              className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl font-medium shadow-lg shadow-emerald-500/20 transition-all"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <WSProvider name={name}>
      <P2PAppContent />
    </WSProvider>
  );
}