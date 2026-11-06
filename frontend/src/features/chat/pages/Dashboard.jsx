import { useAuth } from "../../auth/hooks/useAuth";
import { useChat } from "../hooks/useChat";
import { useEffect, useRef, useState } from "react";
import {useNavigate} from "react-router"

const initialChats = [
  {
    id: "productivity",
    title: "Build a better morning routine",
    time: "2m ago",
    messages: [
      {
        role: "user",
        content: "How can I build a morning routine that actually sticks?",
      },
      {
        role: "assistant",
        content:
          "Start smaller than you think you need to. Pick one action that takes less than five minutes, tie it to something you already do, and keep it consistent for a week before adding anything else.\n\nFor example: after you make coffee, spend two minutes writing down your top priority for the day. A routine becomes sustainable when it feels easy to repeat, not impressive to describe.",
      },
    ],
  },
  {
    id: "weekend",
    title: "Weekend trip ideas near the coast",
    time: "Yesterday",
    messages: [
      {
        role: "user",
        content: "Suggest a relaxed weekend trip near the coast.",
      },
      {
        role: "assistant",
        content:
          "A quiet coastal town with a walkable center makes a great low-key weekend. Look for a place with a scenic trail, a local market, and a few independent cafes so you can keep the itinerary flexible.",
      },
    ],
  },
  {
    id: "learning",
    title: "Learn the basics of photography",
    time: "Mon",
    messages: [
      {
        role: "user",
        content: "What should I learn first in photography?",
      },
      {
        role: "assistant",
        content:
          "Start with light and composition, then get comfortable with the exposure triangle: aperture, shutter speed, and ISO. Practicing with one setting at a time will help you understand how each choice changes a photo.",
      },
    ],
  },
  {
    id: "books",
    title: "Books for a long flight",
    time: "Sun",
    messages: [
      {
        role: "user",
        content: "I need a few engaging books for a long flight.",
      },
      {
        role: "assistant",
        content:
          "For a flight, a fast-paced mystery, a thoughtful collection of essays, and an immersive novel make a nicely varied stack. If you tell me what you usually enjoy, I can suggest specific titles.",
      },
    ],
  },
];

const starterPrompts = [
  {
    icon: "lightbulb",
    title: "Help me brainstorm",
    prompt: "Help me brainstorm a few creative ideas for my next project.",
  },
  {
    icon: "code",
    title: "Write some code",
    prompt: "Help me write a simple function that ",
  },
  {
    icon: "book",
    title: "Explain a concept",
    prompt: "Explain a tricky concept in a simple way.",
  },
];

const Icon = ({ name, size = 18, className = "" }) => {
  const icons = {
    sparkle: (
      <>
        <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
        <path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" />
      </>
    ),
    plus: <path d="M12 5v14m-7-7h14" />,
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4 4" />
      </>
    ),
    message: (
      <>
        <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-3 2v-6a7.5 7.5 0 1 1 17-3.5Z" />
        <path d="M8 11h8m-8-3h5" />
      </>
    ),
    settings: (
      <>
        <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
        <path d="m19.4 15 .1.1a1.8 1.8 0 1 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3 .9v.2a1.8 1.8 0 1 1-3.6 0v-.2a1.8 1.8 0 0 0-3-.9l-.1.1a1.8 1.8 0 1 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-.9-3H3.7a1.8 1.8 0 1 1 0-3.6h.2a1.8 1.8 0 0 0 .9-3l-.1-.1a1.8 1.8 0 1 1 2.5-2.5l.1.1a1.8 1.8 0 0 0 3-.9v-.2a1.8 1.8 0 1 1 3.6 0v.2a1.8 1.8 0 0 0 3 .9l.1-.1a1.8 1.8 0 1 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 .9 3h.2a1.8 1.8 0 1 1 0 3.6h-.2a1.8 1.8 0 0 0-.9 3Z" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    down: <path d="m7 10 5 5 5-5" />,
    send: (
      <>
        <path d="m21 3-7.2 18-3.7-7.1L3 10.2 21 3Z" />
        <path d="M10.1 13.9 15 9" />
      </>
    ),
    mic: (
      <>
        <rect x="9" y="3" width="6" height="12" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0m-7 7v3m-4 0h8" />
      </>
    ),
    paperclip: (
      <path d="m8 12.5 7.2-7.2a3.2 3.2 0 0 1 4.5 4.5l-9.2 9.1a5 5 0 0 1-7.1-7l9.1-9.2" />
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18m0-18a14 14 0 0 0 0 18" />
      </>
    ),
    lightbulb: (
      <>
        <path d="M9 18h6m-5 3h4m-5-6.2A6 6 0 1 1 15 15c-.8.6-1 1.3-1 2h-4c0-.7-.2-1.4-1-2.2Z" />
        <path d="M12 2V1m8 4-1 1M4 5l1 1m14 7h2M3 13H1" />
      </>
    ),
    code: (
      <>
        <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-10-2 12" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
        <path d="M4 17a2.5 2.5 0 0 1 2.5-2.5H20M8 7h7" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name] || icons.sparkle}
    </svg>
  );
};

const Dashboard = () => {
  const { initializeSocketConnection } = useChat();
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState(initialChats[0].id);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [pendingReply, setPendingReply] = useState(null);
  const [openPopover, setOpenPopover] = useState(null);
  const [settings, setSettings] = useState({
    webSearch: true,
    soundEffects: false,
  });
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const endOfMessagesRef = useRef(null);

  const {handleLogout} = useAuth()
  const navigate=useNavigate()

  useEffect(() => {
    initializeSocketConnection();
  }, [initializeSocketConnection]);

  const activeChat = chats.find((chat) => chat.id === activeChatId);
  const activeMessages = activeChat?.messages || [];
  const isGenerating = pendingReply?.chatId === activeChatId;
  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase()),
  );

  const logoutHandler = async ()=>{
    await handleLogout()
    navigate("/login")
  }

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatId, activeMessages, pendingReply]);

  useEffect(() => {
    if (!pendingReply) return undefined;

    const timer = window.setTimeout(() => {
      setChats((currentChats) =>
        currentChats.map((chat) =>
          chat.id === pendingReply.chatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    role: "assistant",
                    content: `Here are a few thoughts to get you started. For “${pendingReply.prompt}”, try breaking it into a clear goal, a small first step, and one way to measure progress. If you share a little more context, I can tailor the suggestions to what you need.`,
                  },
                ],
              }
            : chat,
        ),
      );
      setPendingReply(null);
    }, 1400);

    return () => window.clearTimeout(timer);
  }, [pendingReply]);

  const startNewChat = () => {
    const newChat = {
      id: `chat-${Date.now()}`,
      title: "New conversation",
      time: "Now",
      messages: [],
    };
    setChats((currentChats) => [newChat, ...currentChats]);
    setActiveChatId(newChat.id);
    setMessage("");
    setOpenPopover(null);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const content = message.trim();
    if (!content || pendingReply || !activeChat) return;

    const chatId = activeChat.id;
    setChats((currentChats) =>
      currentChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              title: chat.messages.length === 0 ? content : chat.title,
              time: "Now",
              messages: [...chat.messages, { role: "user", content }],
            }
          : chat,
      ),
    );
    setMessage("");
    setPendingReply({ chatId, prompt: content });
  };

  const toggleSetting = (settingName) => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [settingName]: !currentSettings[settingName],
    }));
  };

  return (
    <div className="flex h-screen min-h-[560px] overflow-hidden bg-[#0b0d11] text-slate-100 selection:bg-teal-300/30">
      <style>{`
        @property --composer-rotate {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes composer-border-rotate {
          from { --composer-rotate: 0deg; }
          to { --composer-rotate: 360deg; }
        }
        .composer-frame {
          border: 1.5px solid rgba(255, 255, 255, 0.09);
          animation: composer-border-rotate 2.5s linear infinite paused;
          transition: border-color 0.3s ease;
        }
        .composer-frame:focus-within:not(.composer-frame-generating) {
          border-color: rgba(94, 234, 212, 0.65);
          
        }
        .composer-frame-generating {
          border-color: rgba(94, 234, 212, 0.25);
          background:
            linear-gradient(#13161b, #13161b) padding-box,
            conic-gradient(
              from var(--composer-rotate),
              #13161b,
              #13161b,
              #123f3c,
              #36d8bf,
              #4565c8,
              #b27bde,
              #123f3c
            ) border-box;
          animation-play-state: running;
        }
      `}</style>

      <aside className="relative z-10 flex w-[280px] shrink-0 flex-col border-r border-white/[0.07] bg-[#101216] max-md:w-[76px]">
        <div className="flex h-[72px] items-center justify-between px-5 max-md:justify-center max-md:px-0">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-teal-300 text-[#08110f]">
              <Icon name="sparkle" size={21} />
            </span>
            <span className="text-[17px] font-semibold tracking-tight max-md:hidden">
              Perplexity
            </span>
          </div>
        </div>

        <div className="px-3 max-md:px-2">
          <button
            type="button"
            onClick={startNewChat}
            className="flex h-10 w-full items-center cursor-pointer gap-2.5 rounded-xl border border-white/[0.09] bg-white/[0.035] px-3 text-base font-medium text-slate-200 transition hover:border-white/[0.16] hover:bg-white/[0.07] max-md:justify-center max-md:px-0"
          >
            <Icon name="plus" size={17} />
            <span className="max-md:hidden">New chat</span>
          </button>
          <label className="mt-3 flex h-10 items-center gap-2.5 rounded-xl px-3 text-base text-slate-400 transition focus-within:bg-white/[0.05] max-md:hidden">
            <Icon name="search" size={17} />
            <input
              aria-label="Search conversations"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search"
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-600"
            />
            <span className="rounded border border-white/[0.08] px-1.5 py-0.5 text-xs text-slate-600">
              /
            </span>
          </label>
        </div>

        <div className="mt-7 flex-1 overflow-y-auto px-3 max-md:px-2">
          <div className="mb-2 px-2 text-[13px] font-medium uppercase tracking-[0.14em] text-slate-600 max-md:hidden">
            Your chats
          </div>
          <div className="space-y-1">
            {filteredChats.map((chat) => (
              <button
                type="button"
                key={chat.id}
                onClick={() => {
                  setActiveChatId(chat.id);
                  setOpenPopover(null);
                }}
                title={chat.title}
                className={`group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left text-[15px] cursor-pointer transition max-md:justify-center max-md:px-0 ${
                  chat.id === activeChatId
                    ? "bg-white/[0.075] text-slate-100"
                    : "text-slate-400 hover:bg-white/[0.045] hover:text-slate-200"
                }`}
              >
                <Icon
                  name="message"
                  size={16}
                  className="shrink-0 text-slate-500"
                />
                <span className="min-w-0 flex-1 truncate max-md:hidden">
                  {chat.title}
                </span>
                <span className="hidden shrink-0 text-xs text-slate-600 group-hover:inline max-md:hidden">
                  {chat.time}
                </span>
              </button>
            ))}
            {filteredChats.length === 0 && (
              <p className="px-2 py-3 text-sm text-slate-600 max-md:hidden">
                No conversations found
              </p>
            )}
          </div>
        </div>

        <div className="relative border-t border-white/[0.07] p-3 max-md:px-2">
          {openPopover === "settings" && (
            <div className="absolute bottom-[calc(100%+8px)] left-3 right-3 rounded-2xl border border-white/[0.1] bg-[#171a20] p-4 shadow-2xl max-md:left-[84px] max-md:right-2">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-semibold">Settings</h2>
                <button
                  type="button"
                  aria-label="Close settings"
                  onClick={() => setOpenPopover(null)}
                  className="rounded-md p-1 text-slate-500 hover:bg-white/[0.07] hover:text-white"
                >
                  <Icon name="close" size={15} />
                </button>
              </div>
              <div className="space-y-1">
                {[
                  {
                    key: "webSearch",
                    label: "Web search",
                    description: "Use the web for current answers",
                  },
                  {
                    key: "soundEffects",
                    label: "Sound effects",
                    description: "Play sounds for responses",
                  },
                ].map((setting) => (
                  <button
                    type="button"
                    key={setting.key}
                    onClick={() => toggleSetting(setting.key)}
                    className="flex w-full items-center justify-between gap-3 rounded-lg py-2 text-left"
                  >
                    <span>
                      <span className="block text-sm font-medium text-slate-200">
                        {setting.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        {setting.description}
                      </span>
                    </span>
                    <span
                      className={`relative h-5 w-9 shrink-0 rounded-full transition-all duration-300 ${
                        settings[setting.key] ? "bg-teal-300" : "bg-slate-700"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 size-4 rounded-full bg-white transition-all duration-300 ${
                          settings[setting.key] ? "left-[18px]" : "left-0.5"
                        }`}
                      />
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-3 border-t border-white/[0.07] pt-3">
                <span className="text-xs uppercase tracking-wider text-slate-600">
                  Appearance
                </span>
                <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
                  <span>Theme</span>
                  <span className="rounded-md bg-white/[0.07] px-2 py-1 text-slate-400">
                    Dark
                  </span>
                </div>
              </div>
            </div>
          )}

          {accountMenuOpen && (
            <div className="absolute bottom-[calc(100%+8px)] left-3 right-3 rounded-2xl border border-white/[0.1] bg-[#171a20] p-4 shadow-2xl max-md:left-[84px] max-md:right-2">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-200 to-cyan-500 text-base font-semibold text-[#08201d]">
                  JD
                </span>
                <div className="min-w-0">
                  <p className="truncate text-base font-medium text-slate-100">
                    Jordan Davis
                  </p>
                  <p className="truncate text-sm text-slate-500">
                    jordan.davis@example.com
                  </p>
                </div>
              </div>
              <div className="mt-4 border-t border-white/[0.07] pt-3 text-sm text-slate-500">
                Personal account
                <span className="mt-1 block text-slate-400">
                  Free plan · Dummy profile
                </span>
              </div>
              <button
                onClick={logoutHandler}
                type="button"
                className="mt-4 flex h-10 w-full items-center gap-2 rounded-xl hover:bg-[#282d35] cursor-pointer px-3 text-left text-sm font-medium text-slate-300 transition-all "
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="size-4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <path d="m16 17 5-5-5-5" />
                  <path d="M21 12H9" />
                </svg>
                Log out
              </button>
            </div>
          )}

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-expanded={openPopover === "settings"}
              onClick={() => {
                setOpenPopover(openPopover === "settings" ? null : "settings");
                setAccountMenuOpen(false);
              }}
              className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-slate-400 transition cursor-pointer hover:bg-white/[0.05] hover:text-slate-200 max-md:justify-center max-md:px-0"
            >
              <Icon name="settings" size={17} />
              <span className="text-sm max-md:hidden">Settings</span>
            </button>
            <button
              type="button"
              aria-label="View account details"
              aria-expanded={accountMenuOpen}
              onClick={() => {
                setAccountMenuOpen(!accountMenuOpen);
                setOpenPopover(null);
              }}
              className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.05] text-slate-300 transition hover:border-teal-200/30 hover:text-teal-100"
            >
              <Icon name="user" size={17} />
            </button>
          </div>
          <div className="mt-1 flex items-center justify-between px-2.5 text-xs text-slate-600 max-md:hidden">
            <span>Jordan Davis</span>
            <span>Free plan</span>
          </div>
        </div>
      </aside>

      <main className="relative flex min-w-0 flex-1 flex-col">
        <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/[0.06] px-7 max-sm:px-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.035] text-teal-200">
              <Icon name="sparkle" size={16} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-base font-medium text-slate-200">
                {activeChat?.title || "New conversation"}
              </p>
              <p className="text-[13px] text-slate-600">AI chat</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSettings((current) => ({ ...current, webSearch: !current.webSearch }))}
            className={`flex h-9 items-center cursor-pointer gap-2 rounded-full border px-3 text-sm transition ${
              settings.webSearch
                ? "border-teal-200/15 bg-teal-200/[0.07] text-teal-100"
                : "border-white/[0.08] text-slate-400 hover:bg-white/[0.04]"
            }`}
          >
            <Icon name="globe" size={15} />
            <span className="max-sm:hidden">
              {settings.webSearch ? "Web search on" : "Web search off"}
            </span>
            <Icon name="down" size={13} className="text-slate-500" />
          </button>
        </header>

        <section
          aria-label="Conversation"
          className="flex min-h-0 flex-1 flex-col overflow-y-auto"
        >
          <div className="mx-auto flex w-full max-w-[780px] flex-1 flex-col px-8 pb-8 pt-10 max-sm:px-4 max-sm:pt-7">
            {activeMessages.length === 0 ? (
              <div className="flex flex-1 flex-col justify-center pb-8">
                <div className="mb-6 flex size-12 items-center justify-center rounded-2xl border border-teal-200/[0.14] bg-teal-200/[0.07] text-teal-200">
                  <Icon name="sparkle" size={24} />
                </div>
                <p className="mb-2 text-base font-medium text-teal-200">
                  Your AI workspace
                </p>
                <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-tight text-slate-100 max-sm:text-4xl">
                  What would you like to explore?
                </h1>
                <p className="mt-3 max-w-lg text-base leading-7 text-slate-500">
                  Ask a question, work through an idea, or start with one of
                  these.
                </p>
                <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3 max-sm:grid-cols-1">
                  {starterPrompts.map((starter) => (
                    <button
                      type="button"
                      key={starter.title}
                      onClick={() => setMessage(starter.prompt)}
                      className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 text-left transition hover:border-teal-200/20 hover:bg-white/[0.045]"
                    >
                      <Icon
                        name={starter.icon}
                        size={18}
                        className="mb-5 text-slate-500 transition group-hover:text-teal-200"
                      />
                      <span className="block text-sm font-medium text-slate-300">
                        {starter.title}
                      </span>
                      <span className="mt-1 block text-[13px] text-slate-600">
                        Click to get started
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 space-y-8 pb-8">
                {activeMessages.map((chatMessage, index) => (
                  <article
                    key={`${activeChatId}-${index}`}
                    className={
                      chatMessage.role === "user"
                        ? "flex justify-end"
                        : "flex items-start gap-3"
                    }
                  >
                    {chatMessage.role === "assistant" && (
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl border border-teal-200/[0.12] bg-teal-200/[0.06] text-teal-200">
                        <Icon name="sparkle" size={16} />
                      </span>
                    )}
                    {chatMessage.role === "user" ? (
                      <div className="max-w-[82%] rounded-3xl rounded-br-lg border border-white/[0.08] bg-[#1a1d23] px-5 py-3.5 text-base leading-7 text-slate-100 max-sm:max-w-[92%]">
                        {chatMessage.content}
                      </div>
                    ) : (
                      <div className="max-w-[680px] pt-1 text-base leading-7 text-slate-300">
                        <p className="mb-2 text-sm font-medium text-slate-500">
                          Perplexity
                        </p>
                        {chatMessage.content
                          .split("\n\n")
                          .map((paragraph, paragraphIndex) => (
                            <p
                              key={paragraphIndex}
                              className={paragraphIndex ? "mt-3" : ""}
                            >
                              {paragraph}
                            </p>
                          ))}
                      </div>
                    )}
                  </article>
                ))}
                {isGenerating && (
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl border border-teal-200/[0.12] bg-teal-200/[0.06] text-teal-200">
                      <Icon name="sparkle" size={16} />
                    </span>
                    <div className="flex items-center gap-2 pt-2 text-sm text-slate-500">
                      <span className="flex gap-1">
                        <span className="size-1 animate-pulse rounded-full bg-teal-200" />
                        <span className="size-1 animate-pulse rounded-full bg-teal-200 [animation-delay:150ms]" />
                        <span className="size-1 animate-pulse rounded-full bg-teal-200 [animation-delay:300ms]" />
                      </span>
                      Thinking
                    </div>
                  </div>
                )}
                <div ref={endOfMessagesRef} />
              </div>
            )}
            {activeMessages.length === 0 && <div ref={endOfMessagesRef} />}
          </div>
        </section>

        <div className="shrink-0 px-8 pb-5 pt-2 max-sm:px-4">
          <div className="mx-auto max-w-[780px]">
            <form
              onSubmit={sendMessage}
              className={`composer-frame relative rounded-[26px] ${
                isGenerating ? "composer-frame-generating" : ""
              }`}
            >
              <div className="relative rounded-[25px] bg-[#13161b] shadow-[0_12px_60px_-28px_rgba(0,0,0,0.9)]">
                <textarea
                  aria-label="Message the AI"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  placeholder="Ask anything..."
                  rows={2}
                  className="block max-h-4 min-h-[68px] w-full resize-none bg-transparent px-5 pb-2 pt-4 text-base leading-7 text-slate-100 outline-none placeholder:text-slate-600"
                />
                <div className="flex items-center justify-between px-3 pb-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="Attach a file"
                      title="File attachments are not available in this demo"
                      disabled
                      className="flex size-8 cursor-not-allowed items-center justify-center rounded-lg text-slate-700"
                    >
                      <Icon name="paperclip" size={17} />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSettings((current) => ({
                          ...current,
                          webSearch: !current.webSearch,
                        }))
                      }
                      className={`flex h-8 items-center cursor-pointer gap-1.5 rounded-lg px-2 text-[13px] transition ${
                        settings.webSearch
                          ? "bg-teal-200/[0.07] text-teal-100"
                          : "text-slate-500 hover:bg-white/[0.05] hover:text-slate-300"
                      }`}
                    >
                      <Icon name="globe" size={14} />
                      Search
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-600 max-sm:hidden">
                      AI can make mistakes
                    </span>
                    <button
                      type="button"
                      aria-label="Voice input"
                      title="Voice input is not available in this demo"
                      disabled
                      className="flex size-8 cursor-not-allowed items-center justify-center rounded-lg text-slate-700"
                    >
                      <Icon name="mic" size={17} />
                    </button>
                    <button
                      type="submit"
                      disabled={!message.trim() || Boolean(pendingReply)}
                      aria-label="Send message"
                      className="flex size-9 items-center cursor-pointer justify-center rounded-xl bg-teal-200 text-[#071411] transition hover:bg-teal-100 disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-slate-600"
                    >
                      <Icon name="send" size={17} />
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <p className="mt-3 text-center text-xs text-slate-600">
              Perplexity may display inaccurate info, so please double-check
              important details.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
