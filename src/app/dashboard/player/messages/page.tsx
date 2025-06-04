"use client";

import Image from 'next/image';
import {
  Search,
  Edit3,
  Phone,
  Video,
  MoreHorizontal,
  Paperclip,
  Mic,
  Send,
  Pin,
  MessageSquare,
  FileText,
  Link2,
  Image as ImageIcon,
  Folder,
  ChevronLeft,
  Menu,
  X,
} from 'lucide-react';
import clsx from 'clsx';
import React, { useState, useRef, useEffect } from 'react';

// --- Image URLs (kept as is) ---
const AVATAR_NORALY_FATIMA = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2386_640_1660.png';
const AVATAR_JOHN_DOE = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2386_645_1688.png';
const AVATAR_JANE_SMITH = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2386_645_1701.png';
const AVATAR_ALEX_JOHNSON = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2386_645_1836.png';
const AVATAR_MYSELF_PLACEHOLDER = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2386_645_1771.png';

const MEDIA_HIGHLIGHT_1 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002371_648_1964.png';
const MEDIA_HIGHLIGHT_2 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002371_648_1953.png';
const MEDIA_HIGHLIGHT_3 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002371_648_1961.png';
const MEDIA_HIGHLIGHT_4 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002372_648_1962.png';
const MEDIA_HIGHLIGHT_5 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002372_648_1954.png';

const PlaceholderImage = ({
  src,
  alt,
  className,
  isTeamLogo = false,
  teamInitial = 'P',
  isPlayerPortrait = false,
  isBanner = false,
  uniqueKey,
}) => {
  let imageToRender = src;
  let unoptimizedImage = false;

  const generateSeed = () => {
    if (uniqueKey) return String(uniqueKey).replace(/[^a-zA-Z0-9-_]/g, '');
    if (alt) return alt.replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase();
    return 'default-placeholder-seed';
  };

  if (!src) {
    const seed = generateSeed();
    if (isTeamLogo) {
      const bgColor = "#e2e8f0";
      const textColor = "#475569";
      imageToRender = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20viewBox%3D%220%200%2064%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2232%22%20fill%3D%22${encodeURIComponent(bgColor)}%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22central%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2230%22%20font-weight%3D%22bold%22%20fill%3D%22${encodeURIComponent(textColor)}%22%3E${teamInitial.toUpperCase()}%3C%2Ftext%3E%3C%2Fsvg%3E`;
      unoptimizedImage = true;
    } else if (isPlayerPortrait) {
      imageToRender = `https://via.placeholder.com/100/CCCCCC/808080?Text=Portrait&seed=${seed}`;
    } else if (isBanner) {
      imageToRender = `https://via.placeholder.com/800x300/CCCCCC/808080?Text=Banner&seed=${seed}`;
    } else { 
      imageToRender = `https://via.placeholder.com/150/CCCCCC/808080?Text=Media&seed=${seed}`;
    }
  } else if (typeof src === 'string' && src.startsWith('data:image/svg+xml')) {
    unoptimizedImage = true;
  }

  if (!imageToRender) {
    imageToRender = `https://via.placeholder.com/200/CCCCCC/808080?Text=Error&seed=errorFallback`;
    unoptimizedImage = true;
  }

  return (
    <div className={clsx("relative bg-gray-300 overflow-hidden", className)}>
      <Image
        src={imageToRender} 
        alt={alt || 'Placeholder image'} 
        fill
        className="object-cover"
        unoptimized={unoptimizedImage} 
        priority={isBanner}
        onError={(e) => {
          const errorSvg = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22%23f3f4f6%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2210px%22%20fill%3D%22%239ca3af%22%3ENo%20Img%3C%2Ftext%3E%3C%2Fsvg%3E`;
          e.currentTarget.srcset = errorSvg;
          e.currentTarget.src = errorSvg;
        }}
      />
    </div>
  );
};

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const chats = [
    { id: 1, name: "Noraly Fatima", avatarSrc: AVATAR_NORALY_FATIMA, status: "Samuel is typing..", time: "40m", unread: 17, pinned: true, typingColor: "text-green-500" },
    { id: 2, name: "John Doe", avatarSrc: AVATAR_JOHN_DOE, status: "Online", time: "2h", unread: 10, pinned: false, typingColor: "text-green-500" },
    { id: 3, name: "Jane Smith", avatarSrc: AVATAR_JANE_SMITH, status: "3 days ago", time: "3d", unread: 0, pinned: false, typingColor: "text-gray-500" },
    { id: 4, name: "Alex Johnson", avatarSrc: AVATAR_ALEX_JOHNSON, status: "Okay, see you then!", time: "1w", unread: 0, pinned: false, typingColor: "text-gray-500" },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768 && chats.length > 0 && selectedChat === null) {
        setSelectedChat(chats[0].id);
    }
  }, [selectedChat, chats]);

  const activeChatUser = selectedChat ? chats.find(c => c.id === selectedChat) : null;

  const [messagesData, setMessagesData] = useState<Array<{id: string, sender: string, text: string, time: string, avatarSrc: string, type: "sent" | "received"}>>([]);
  
  useEffect(() => {
    if (activeChatUser) {
      setMessagesData([
        { id: 'm1', sender: activeChatUser.name, text: "How are you doing? I'm writing to remind you to send me the scout report from last. Do we have any reports from the field scouts/ if yes please include it in your report, if not reach out to them, to send us updates as agreed on", time: "11:42 AM", avatarSrc: activeChatUser.avatarSrc, type: "received" },
        { id: 'm2', sender: "You", text: "I'm doing great sir, and you? About the scout report i'm still working on the compilation because of the holidays and the mail came in late. I'm yet to hear from the field scouts, however i will reach out to them and get back to you sir.", time: "11:45 AM", avatarSrc: AVATAR_MYSELF_PLACEHOLDER, type: "sent" },
        { id: 'm3', sender: activeChatUser.name, text: "Great, let me know once you have it.", time: "11:48 AM", avatarSrc: activeChatUser.avatarSrc, type: "received" },
        { id: 'm4', sender: "You", text: "Will do!", time: "11:49 AM", avatarSrc: AVATAR_MYSELF_PLACEHOLDER, type: "sent" },
      ]);
    } else {
      setMessagesData([]);
    }
  }, [activeChatUser]);

  const mediaHighlights = [
    { id: 'h1', imageSrc: MEDIA_HIGHLIGHT_1 }, { id: 'h2', imageSrc: MEDIA_HIGHLIGHT_2 },
    { id: 'h3', imageSrc: MEDIA_HIGHLIGHT_3 }, { id: 'h4', imageSrc: MEDIA_HIGHLIGHT_4 },
    { id: 'h5', imageSrc: MEDIA_HIGHLIGHT_5 }, { id: 'h6', imageSrc: MEDIA_HIGHLIGHT_1 },
  ];

  const fileTypes = [
    { name: "All Files", count: 347, icon: Folder, color: "text-blue-500" },
    { name: "Pictures", count: 147, icon: ImageIcon, color: "text-yellow-500" },
    { name: "Videos", count: 32, icon: Video, color: "text-red-500" },
    { name: "Links", count: 21, icon: Link2, color: "text-green-500" },
    { name: "Others", count: 11, icon: FileText, color: "text-purple-500" },
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messagesData]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageInput.trim() === "" || !activeChatUser) return;
    
    const newMessage = { 
      id: `m${Date.now()}`, 
      sender: "You", 
      text: messageInput, 
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), 
      avatarSrc: AVATAR_MYSELF_PLACEHOLDER, 
      type: "sent" as "sent"
    };
    setMessagesData(prevMessages => [...prevMessages, newMessage]);
    setMessageInput("");
  };

  const handleSelectChat = (chatId: number) => {
    setSelectedChat(chatId);
    setShowSidebar(false); // Close sidebar on mobile when chat is selected
  };

  // Close panels when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showSidebar && !target.closest('.sidebar') && !target.closest('.sidebar-toggle')) {
        setShowSidebar(false);
      }
      if (showRightPanel && !target.closest('.right-panel') && !target.closest('.right-panel-toggle')) {
        setShowRightPanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSidebar, showRightPanel]);

  return (
    <div className="flex h-screen bg-gray-100 relative overflow-hidden">
      {/* Overlay for mobile */}
      {(showSidebar || showRightPanel) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => {
            setShowSidebar(false);
            setShowRightPanel(false);
          }}
        />
      )}

      {/* Left Sidebar: Chat List */}
      <div
        className={clsx(
          "bg-white border-r border-gray-200/80 shadow-lg flex flex-col transition-transform duration-300 ease-in-out z-50 sidebar",
          // Mobile: slide in from left
          "fixed inset-y-0 left-0 w-full max-w-sm",
          showSidebar ? "translate-x-0" : "-translate-x-full",
          // Tablet and up: always visible
          "md:relative md:translate-x-0 md:w-72 lg:w-80 xl:w-[320px]",
          // Hide on mobile when chat is selected, unless sidebar is shown
          selectedChat !== null && !showSidebar ? "md:flex" : "flex"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200/80 flex justify-between items-center bg-white">
          <h2 className="text-lg font-bold text-gray-800">Messages</h2>
          <div className="flex items-center space-x-2">
            <button className="text-gray-500 hover:text-blue-600 p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Edit3 size={18} />
            </button>
            <button className="text-gray-500 hover:text-blue-600 p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search size={18} />
            </button>
            <button 
              className="md:hidden text-gray-500 hover:text-blue-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setShowSidebar(false)}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-grow overflow-y-auto p-3 space-y-4" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {/* Pinned Chats */}
          {chats.some(chat => chat.pinned) && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase px-2 mb-3 flex items-center">
                <Pin size={12} className="mr-1.5 text-gray-400" /> Pinned
              </h3>
              {chats.filter(chat => chat.pinned).map(chat => (
                <button
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className={clsx(
                    "w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-gray-50 transition-all duration-200 mb-2",
                    "active:bg-gray-100 touch-manipulation", // Better touch feedback
                    selectedChat === chat.id && "bg-blue-50 border-l-4 border-blue-500"
                  )}
                >
                  <PlaceholderImage 
                    src={chat.avatarSrc} 
                    alt={chat.name} 
                    className="w-12 h-12 rounded-full flex-shrink-0" 
                    isPlayerPortrait 
                    uniqueKey={`chatlist-${chat.id}`} 
                  />
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold text-gray-800 truncate pr-2">{chat.name}</span>
                      <span className="text-xs text-gray-500 flex-shrink-0">{chat.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className={clsx("text-xs truncate pr-2", chat.typingColor || 'text-gray-500')}>
                        {chat.status}
                      </p>
                      {chat.unread > 0 && (
                        <span className="bg-red-500 text-white text-xs font-semibold min-w-[20px] h-5 rounded-full flex items-center justify-center px-1.5">
                          {chat.unread > 99 ? '99+' : chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* All Messages */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase px-2 mb-3 flex items-center">
              <MessageSquare size={12} className="mr-1.5 text-gray-400" /> All Messages
            </h3>
            {chats.filter(chat => !chat.pinned).map(chat => (
              <button
                key={chat.id}
                onClick={() => handleSelectChat(chat.id)}
                className={clsx(
                  "w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-gray-50 transition-all duration-200 mb-2",
                  "active:bg-gray-100 touch-manipulation",
                  selectedChat === chat.id && "bg-blue-50 border-l-4 border-blue-500"
                )}
              >
                <PlaceholderImage 
                  src={chat.avatarSrc} 
                  alt={chat.name} 
                  className="w-12 h-12 rounded-full flex-shrink-0" 
                  isPlayerPortrait 
                  uniqueKey={`chatlist-${chat.id}`} 
                />
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-gray-800 truncate pr-2">{chat.name}</span>
                    <span className="text-xs text-gray-500 flex-shrink-0">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className={clsx("text-xs truncate pr-2", chat.typingColor || 'text-gray-500')}>
                      {chat.status}
                    </p>
                    {chat.unread > 0 && (
                      <span className="bg-red-500 text-white text-xs font-semibold min-w-[20px] h-5 rounded-full flex items-center justify-center px-1.5">
                        {chat.unread > 99 ? '99+' : chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={clsx(
        "flex-grow bg-gray-100 flex flex-col h-full",
        "w-full md:w-auto" // Full width on mobile
      )}>
        {activeChatUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white p-4 border-b border-gray-200/80 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowSidebar(true)}
                  className="p-2 md:hidden text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors sidebar-toggle"
                >
                  <Menu size={20} />
                </button>
                <PlaceholderImage 
                  src={activeChatUser.avatarSrc} 
                  alt={activeChatUser.name} 
                  className="w-10 h-10 rounded-full flex-shrink-0" 
                  isPlayerPortrait 
                  uniqueKey={`chatheader-${activeChatUser.id}`} 
                />
                <div className="min-w-0 flex-grow">
                  <h3 className="text-base font-semibold text-gray-800 truncate">{activeChatUser.name}</h3>
                  <p className={clsx(
                    "text-xs truncate",
                    activeChatUser.status === "Online" || activeChatUser.status.includes("typing") 
                      ? "text-green-500" 
                      : "text-gray-500"
                  )}>
                    {activeChatUser.status}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Phone size={18} />
                </button>
                <button className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Video size={18} />
                </button>
                <button 
                  className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors right-panel-toggle"
                  onClick={() => setShowRightPanel(!showRightPanel)}
                >
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div 
              ref={chatContainerRef} 
              className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50"
              style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              <div className="text-center my-4">
                <span className="bg-white text-gray-500 text-xs px-3 py-1.5 rounded-full shadow-sm">
                  Today, June 19
                </span>
              </div>

              {messagesData.map((msg) => (
                <div key={msg.id} className={clsx(
                  "flex items-end gap-2.5 max-w-[85%] sm:max-w-[75%]", 
                  msg.type === 'sent' ? "ml-auto flex-row-reverse" : "mr-auto"
                )}>
                  {msg.type === 'received' && activeChatUser && (
                    <PlaceholderImage 
                      src={activeChatUser.avatarSrc} 
                      alt={msg.sender} 
                      className="w-8 h-8 rounded-full flex-shrink-0 self-end" 
                      isPlayerPortrait 
                      uniqueKey={`msgavatar-${msg.id}-${activeChatUser.id}`} 
                    />
                  )}
                  <div
                    className={clsx(
                      "p-3 rounded-2xl shadow-sm max-w-full",
                      msg.type === 'sent' 
                        ? "bg-blue-500 text-white rounded-br-md" 
                        : "bg-white text-gray-800 rounded-bl-md"
                    )}
                  >
                    {msg.type === 'received' && (
                      <p className="text-xs font-semibold mb-1 text-blue-600">{msg.sender}</p>
                    )}
                    <p className="text-sm leading-relaxed break-words">{msg.text}</p>
                    <p className={clsx(
                      "text-xs mt-1.5", 
                      msg.type === 'sent' ? 'text-blue-100 text-right' : 'text-gray-400 text-left'
                    )}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {activeChatUser && activeChatUser.status.includes("typing") && (
                <div className="flex items-end gap-2.5 max-w-[85%] sm:max-w-[75%] mr-auto">
                  <PlaceholderImage 
                    src={activeChatUser.avatarSrc} 
                    alt={activeChatUser.name} 
                    className="w-8 h-8 rounded-full flex-shrink-0 self-end" 
                    isPlayerPortrait 
                    uniqueKey={`typingavatar-${activeChatUser.id}`} 
                  />
                  <div className="p-3 rounded-2xl shadow-sm bg-white text-gray-800 rounded-bl-md">
                    <div className="flex space-x-1 items-center h-5">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0s'}}></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.15s'}}></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="bg-white p-4 border-t border-gray-200/80 flex items-center space-x-3">
              <button 
                type="button" 
                className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
              >
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Write your message..."
                className="flex-grow p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-gray-50 focus:bg-white transition-colors"
              />
              <button 
                type="button" 
                className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
              >
                <Mic size={20} />
              </button>
              <button 
                type="submit" 
                className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors shadow-md touch-manipulation active:scale-95"
                disabled={!messageInput.trim()}
              >
                <Send size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-gray-500 p-8 text-center">
            <MessageSquare size={64} className="mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold mb-2">Welcome to Messages</h3>
            <p className="text-sm">Select a chat to start messaging</p>
            <button
              onClick={() => setShowSidebar(true)}
              className="mt-4 md:hidden bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              View Chats
            </button>
          </div>
        )}
      </div>

      {/* Right Panel: Highlights (Mobile Slide-out) */}
      {activeChatUser && (
        <div className={clsx(
          "bg-white border-l border-gray-200/80 shadow-lg flex flex-col transition-transform duration-300 ease-in-out z-50 right-panel",
          // Mobile: slide in from right
          "fixed inset-y-0 right-0 w-full max-w-sm",
          showRightPanel ? "translate-x-0" : "translate-x-full",
          // Desktop: always visible on large screens
          "lg:relative lg:translate-x-0 lg:w-80 xl:w-[320px]",
          // Show/hide based on screen size and state
          showRightPanel ? "flex" : "hidden lg:flex"
        )}>
          {/* Panel Header */}
          <div className="p-4 border-b border-gray-200/80 flex justify-between items-center bg-white">
            <h3 className="text-lg font-semibold text-gray-800">Highlights</h3>
            <button 
              className="lg:hidden text-gray-500 hover:text-blue-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setShowRightPanel(false)}
            >
              <X size={18} />
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-grow overflow-y-auto p-4 space-y-6" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {/* Media Grid */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Media</h4>
              <div className="grid grid-cols-2 gap-3">
                {mediaHighlights.map(item => (
                  <PlaceholderImage
                    key={item.id}
                    src={item.imageSrc} 
                    alt={`Highlight ${item.id}`}
                    className="aspect-square rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
                    uniqueKey={`highlight-${item.id}`}
                  />
                ))}
              </div>
            </div>

            {/* File Types */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Files</h4>
              <div className="space-y-2">
                {fileTypes.map(type => (
                  <button 
                    key={type.name} 
                    className="w-full flex items-center justify-between p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors active:bg-gray-100 touch-manipulation"
                  >
                    <div className="flex items-center">
                      <type.icon className={clsx("w-5 h-5 mr-3", type.color)} />
                      <span className="font-medium">{type.name}</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {type.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Actions */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors active:bg-gray-100 touch-manipulation">
                  <Search className="w-5 h-5 mr-3 text-blue-500" />
                  <span>Search in conversation</span>
                </button>
                <button className="w-full flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors active:bg-gray-100 touch-manipulation">
                  <Pin className="w-5 h-5 mr-3 text-green-500" />
                  <span>Pin conversation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;