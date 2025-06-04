// /dashboard/player/sidebar/Sidebar.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

// --- Icon Components ---
const IconPlaceholder = ({ name, className = "w-6 h-6 text-white" }) => {
  const icons = {
    'overview-icon': ( <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /> </svg> ),
    'analytics-icon': ( <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /> </svg> ),
    'players-icon': ( <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /> </svg> ),
    'tactics-icon': ( <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> </svg> ),
    'matches-icon': ( <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" /> </svg> ),
    'pitches-icon': ( <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /> </svg> ),
    'academies-icon': ( <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /> </svg> ),
    'clubs-icon': ( <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /> </svg> ),
    'messages-icon': ( <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /> </svg> ),
    'notifications-icon': ( <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /> </svg> ),
    'settings-icon': ( <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> </svg> ),
    'signout-icon': ( <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /> </svg> ),
    'close-icon': ( <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> </svg> )
  };
  if (!icons[name]) {
    return (
      <div className={`${className} flex items-center justify-center bg-white/10 rounded`} title={name}>
        <span className="text-xs font-bold">{name.charAt(0).toUpperCase()}</span>
      </div>
    );
  }
  return icons[name];
};

// --- CORRECTED SidebarLogo ---
const SidebarLogo = React.memo(({ collapsed = false }) => {
  if (collapsed) {
    return (
      <div className="w-10 h-10 flex items-center justify-center rounded bg-[#083162] mx-auto" aria-label="ScoutFlair logo collapsed">
        <div className="w-5 h-5 flex items-center justify-center relative">
          <div className="absolute w-2 h-2 bg-secondary top-0 left-0"></div>
          <div className="absolute w-2 h-2 bg-secondary bottom-0 right-0"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center space-x-3" aria-label="ScoutFlair logo expanded">
      <div className="w-12 h-12 flex items-center justify-center rounded relative bg-[#083162]">
        <div className="absolute w-[23.36px] h-[23.31px] bg-secondary" style={{ left: '0.001px', top: '24.68px' }}></div>
        <div className="absolute w-[23.36px] h-[23.32px] bg-secondary" style={{ left: '24.64px', top: '0.09px' }}></div>
      </div>
      <span className="text-white text-2xl lg:text-3xl font-bold">ScoutFlair</span>
    </div>
  );
});
SidebarLogo.displayName = 'SidebarLogo';

// --- CORRECTED SidebarSectionLabel ---
const SidebarSectionLabel = React.memo(({ text, collapsed = false }) => {
  if (collapsed) {
    return <div className="h-px border-t border-white/20 mx-4 my-3" aria-hidden="true"></div>;
  }
  return (
    <h3 className="text-white/70 text-xs font-semibold tracking-wider mb-2 mt-4 first:mt-0 px-1 uppercase">
      {text}
    </h3>
  );
});
SidebarSectionLabel.displayName = 'SidebarSectionLabel';

// --- CORRECTED SidebarNavItem ---
const SidebarNavItem = ({ iconName, text, href = "#", isActive = false, collapsed = false, onClick }) => {
  const content = (
    <>
      <IconPlaceholder name={iconName} className={clsx("w-6 h-6 transition-colors", isActive ? 'text-secondary' : 'text-white')} />
      {!collapsed && (
        <span className={clsx("text-base font-medium transition-colors", isActive ? 'text-secondary' : 'text-white group-hover:text-secondary')}>
          {text}
        </span>
      )}
    </>
  );

  const itemClasses = clsx(
    'flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group relative w-full',
    {
      'bg-white/10 shadow-md': isActive,
      'hover:bg-white/5': !isActive,
      'justify-center': collapsed,
      'hover:translate-x-0.5': !isActive && !collapsed,
    }
  );

  const commonProps = {
    className: itemClasses,
    'aria-label': collapsed ? text : undefined,
  };

  if (onClick) {
    return (
      <button onClick={onClick} {...commonProps} type="button">
        {content}
        {collapsed && (
          <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
            {text}
          </span>
        )}
      </button>
    );
  }

  return (
    <Link href={href} {...commonProps} aria-current={isActive ? "page" : undefined}>
      {content}
      {collapsed && (
        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
          {text}
        </span>
      )}
    </Link>
  );
};


// --- Main Sidebar Component ---
const Sidebar = ({ onMobileClose }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(false); 
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (href) => {
    if (!href || href === "#") return false;
    if (href === '/dashboard/overview') {
      return pathname === href || pathname.startsWith(href + '/');
    }
    return pathname.startsWith(href);
  };

  const navigationData = {
    insights: [
      { id: 'overview', iconName: 'overview-icon', text: 'Overview', href: '/dashboard/player/overview' },
      { id: 'analytics', iconName: 'analytics-icon', text: 'Analytics', href: '/dashboard/player/analytics' },
    ],
    main: [
      { id: 'players', iconName: 'players-icon', text: 'Players', href: '/dashboard/player/player' },
      { id: 'tactics', iconName: 'tactics-icon', text: 'Tactics', href: '/dashboard/player/tactics' },
      { id: 'matches', iconName: 'matches-icon', text: 'Matches', href: '/dashboard/player/matches' },
      { id: 'pitches', iconName: 'pitches-icon', text: 'Local Pitches', href: '/dashboard/player/pitches' },
      { id: 'academies', iconName: 'academies-icon', text: 'Academies', href: '/dashboard/player/academies' },
      { id: 'clubs', iconName: 'clubs-icon', text: 'Football Clubs', href: '/dashboard/player/clubs' },
    ],
    resources: [
      { id: 'messages', iconName: 'messages-icon', text: 'Messages', href: '/dashboard/player/messages' },
      { id: 'notifications', iconName: 'notifications-icon', text: 'Notifications', href: '/dashboard/player/notifications' },
      { id: 'settings', iconName: 'settings-icon', text: 'Settings', href: '/dashboard/player/settings' },
    ]
  };

  return (
    <aside
      className={clsx(
        "h-full bg-primary-2 text-white shadow-xl flex flex-col",
        "transition-[width] duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-80 lg:w-72"
      )}
      aria-label="Main sidebar"
    >
      <div className={clsx(
        "border-b border-white/10 flex items-center",
        isCollapsed ? 'py-4 px-2.5 justify-center' : 'p-6 justify-between'
      )}>
        <SidebarLogo collapsed={isCollapsed} />
        {onMobileClose && !isCollapsed && ( // Only show close button if not collapsed (which it shouldn't be on mobile)
          <button
            onClick={onMobileClose}
            className="lg:hidden p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-md"
            aria-label="Close sidebar"
          >
            <IconPlaceholder name="close-icon" className="w-6 h-6" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 space-y-5">
        {Object.entries(navigationData).map(([sectionKey, items]) => (
          <div key={sectionKey} className={isCollapsed ? 'px-2' : 'px-6'}>
            <SidebarSectionLabel text={sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)} collapsed={isCollapsed} />
            <div className="space-y-1.5">
              {items.map(item => (
                <SidebarNavItem
                  key={item.id}
                  iconName={item.iconName}
                  text={item.text}
                  href={item.href}
                  isActive={isActive(item.href)}
                  collapsed={isCollapsed}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className={clsx("border-t border-white/10 mt-auto", isCollapsed ? 'p-2' : 'p-6')}>
         <div className="hidden lg:block mb-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full flex items-center justify-center p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!isCollapsed}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={isCollapsed ? "M8.25 4.5l7.5 7.5-7.5 7.5" : "M15.75 19.5L8.25 12l7.5-7.5"} />
              </svg>
            </button>
          </div>
        <SidebarNavItem
          iconName="signout-icon"
          text="Sign Out"
          href="/auth/login" 
          collapsed={isCollapsed}
        />
      </div>
    </aside>
  );
};

export default Sidebar;