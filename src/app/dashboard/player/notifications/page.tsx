"use client";

import React, { useState } from 'react';
// NOTE: The PlaceholderImage component is not directly used in this specific file's JSX,
// but the NotificationItem uses <img>. If PlaceholderImage was intended for NotificationItem,
// that component would need to be refactored. For now, I'll assume direct <img> usage is intended.

// --- Helper: Icon Components ---
const TickIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.26666 8L7.19999 10.6667L11.7333 5.33333" stroke="currentColor" strokeWidth="1.06667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const OptionsIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="5" height="18" viewBox="0 0 5 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="2.02118" cy="2.02118" r="2.02118" fill="currentColor"/>
    <circle cx="2.02118" cy="9.00006" r="2.02118" fill="currentColor"/>
    <circle cx="2.02118" cy="15.9787" r="2.02118" fill="currentColor"/>
  </svg>
);

// --- Sidebar Components ---
interface CheckboxItemProps {
  label: string;
  id: string;
  checked: boolean;
  onChange: (id: string) => void;
  fontStyle: 'Medium' | 'Regular' | 'Bold';
  textOpacityClass: string;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ label, id, checked, onChange, fontStyle, textOpacityClass }) => {
  let fontWeightClass = 'font-normal';
  if (fontStyle === 'Medium') fontWeightClass = 'font-medium';
  if (fontStyle === 'Bold') fontWeightClass = 'font-bold';

  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => onChange(id)}
        className="sr-only"
      />
      <div
        className={`w-5 h-5 rounded border flex items-center justify-center
                    ${checked ? 'bg-[#041931] border-[#041931]' : 'bg-white border-[#D1D1D1]'}`}
      >
        {checked && <TickIcon className="w-[10px] h-[7px] text-white" />}
      </div>
      <span className={`text-lg font-lato ${fontWeightClass} text-black ${textOpacityClass}`}>
        {label}
      </span>
    </label>
  );
};

interface SidebarSectionContentProps {
  items: Array<{ id: string; label: string; defaultChecked?: boolean; fontStyle: 'Medium' | 'Regular' | 'Bold'; opacity?: number }>;
  itemSpacing?: string;
  padding?: string;
  hasTopSeparator?: boolean;
}

const SidebarSectionContent: React.FC<SidebarSectionContentProps> = ({ items, itemSpacing = 'gap-5', padding = 'p-5', hasTopSeparator = false }) => {
  const initialChecks = items.reduce((acc, item) => {
    acc[item.id] = !!item.defaultChecked;
    return acc;
  }, {} as Record<string, boolean>);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(initialChecks);

  const handleCheckboxChange = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={`bg-white shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)] relative`}>
      {hasTopSeparator && <hr className="border-t-[0.32px] border-black/60" />}
      <div className={`flex flex-col ${itemSpacing} ${padding}`}>
        {items.map(item => (
          <CheckboxItem
            key={item.id}
            id={item.id}
            label={item.label}
            checked={checkedItems[item.id]}
            onChange={handleCheckboxChange}
            fontStyle={item.fontStyle}
            textOpacityClass={item.opacity === 1 ? '' : (item.opacity ? `opacity-[${Math.round(item.opacity * 100)}]` : 'opacity-70')}
          />
        ))}
      </div>
    </div>
  );
}

const Sidebar = () => {
  const filterItems = [
    { id: 'all', label: 'All', defaultChecked: true, fontStyle: 'Medium' as const, opacity: 1 },
    { id: 'updates', label: 'Updates', defaultChecked: false, fontStyle: 'Medium' as const, opacity: 0.72 },
    { id: 'comments', label: 'Comments', defaultChecked: false, fontStyle: 'Medium' as const, opacity: 0.72 },
    { id: 'mentions', label: 'Mentions', defaultChecked: false, fontStyle: 'Medium' as const, opacity: 0.72 },
  ];

  const preferencesItems = [
    { id: 'sms', label: 'SMS', defaultChecked: true, fontStyle: 'Regular' as const, opacity: 1 },
    { id: 'email', label: 'Email', defaultChecked: false, fontStyle: 'Medium' as const, opacity: 0.72 },
    { id: 'push', label: 'Push', defaultChecked: false, fontStyle: 'Medium' as const, opacity: 0.72 },
    { id: 'in-app', label: 'In- App', defaultChecked: false, fontStyle: 'Medium' as const, opacity: 0.72 },
  ];

  const historyItems = [
    { id: 'archived', label: 'Archived', defaultChecked: true, fontStyle: 'Regular' as const, opacity: 0.72 },
    { id: 'activity-logs', label: 'Activity Logs', defaultChecked: false, fontStyle: 'Medium' as const, opacity: 0.72 },
    { id: 'system-alerts', label: 'System Alerts', defaultChecked: false, fontStyle: 'Medium' as const, opacity: 0.72 },
    { id: 'recent-activity', label: 'Recent Activity', defaultChecked: false, fontStyle: 'Medium' as const, opacity: 0.72 },
  ];

   const templatesItems = [
    { id: 'general', label: 'General', defaultChecked: true, fontStyle: 'Regular' as const, opacity: 0.72 },
    { id: 'reminder', label: 'Reminder', defaultChecked: false, fontStyle: 'Medium' as const, opacity: 0.72 },
    { id: 'feedback', label: 'Feedback', defaultChecked: false, fontStyle: 'Medium' as const, opacity: 0.72 },
    { id: 'promotional', label: 'Promotional', defaultChecked: false, fontStyle: 'Medium' as const, opacity: 0.72 },
  ];

  return (
    <aside className="w-full lg:w-[252px] flex-shrink-0">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <div className="h-[52px] flex items-center px-5 bg-[#041931] shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)]">
            <h2 className="text-xl font-lato font-bold text-white">FILTER</h2>
          </div>
          <SidebarSectionContent items={filterItems} padding="p-5" itemSpacing="gap-5" />
        </div>

        <div className="flex flex-col">
          <div className="h-[52px] flex items-center px-5 bg-white shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)]">
            <h2 className="text-xl font-lato font-normal text-black">PREFERENCES</h2>
          </div>
          <SidebarSectionContent items={preferencesItems} hasTopSeparator={true} padding="p-5" itemSpacing="gap-5" />
        </div>

        <div className="flex flex-col">
          <div className="h-[52px] flex items-center px-5 bg-white shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)]">
            <h2 className="text-xl font-lato font-normal text-black">HISTORY</h2>
          </div>
          <SidebarSectionContent items={historyItems} hasTopSeparator={true} padding="p-5" itemSpacing="gap-5" />
        </div>

        <div className="flex flex-col">
          <div className="h-[52px] flex items-center px-5 bg-white shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)]">
            <h2 className="text-xl font-lato font-normal text-black">TEMPLATES</h2>
          </div>
          <SidebarSectionContent items={templatesItems} hasTopSeparator={true} padding="p-5" itemSpacing="gap-5" />
        </div>
      </div>
    </aside>
  );
};

// --- Content Area Components ---
interface NotificationItemProps {
  avatarSrc: string;
  team1LogoSrc: string;
  team1Name: string;
  team2LogoSrc: string;
  team2Name: string;
  message: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  avatarSrc,
  team1LogoSrc,
  team1Name,
  team2LogoSrc,
  team2Name,
  message,
}) => {
  return (
    <div className="h-[52px] bg-white shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)] flex items-center px-[18px] gap-7">
      <img src={avatarSrc} alt="avatar" className="w-10 h-10 rounded-full border-2 border-[#D1D1D1] shadow-[0px_4px_8px_2px_rgba(209,209,209,0.12)]" />
      <div className="flex items-center justify-between flex-grow opacity-[0.88]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className="w-px h-7 bg-[#D1D1D1] mr-2" />
              <div className="flex items-center gap-2">
                <img src={team1LogoSrc} alt={team1Name} className="w-7 h-7 object-contain" />
                <span className="text-sm font-lato font-normal text-black">{team1Name}</span>
              </div>
            </div>
            <span className="text-sm font-lato font-normal text-black">VS</span>
            <div className="flex items-center gap-2">
              <img src={team2LogoSrc} alt={team2Name} className="w-[26.82px] h-7 object-contain" />
              <span className="text-sm font-lato font-normal text-black">{team2Name}</span>
            </div>
          </div>
          <span className="text-sm font-lato font-normal text-black/80 ml-2">{message}</span>
        </div>
        <OptionsIcon className="w-[4.04px] h-[18px] text-black" />
      </div>
    </div>
  );
};

// --- URLs from your list for Notifications ---
const AVATAR_NOTIF_1 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2386_645_1701.png';
const AVATAR_NOTIF_2 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2386_640_1660.png';
const AVATAR_NOTIF_3 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2386_645_1688.png';
const AVATAR_NOTIF_4 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2386_645_1836.png';
const AVATAR_NOTIF_5 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2386_645_1771.png';
const AVATAR_NOTIF_6 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2386_645_1732.png';
const AVATAR_NOTIF_7 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2386_645_1758.png';
const AVATAR_NOTIF_8 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2386_645_1784.png';
const AVATAR_NOTIF_9 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2386_645_1823.png';

// Team Logos (reusing from previous pages, as specific ones for this page weren't provided)
const TEAM_LOGO_DELTAS = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Dinamo_Zagreb_1_507_1762.png';
const TEAM_LOGO_JOSHFC = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Club_Am_rica_1_531_2482.png';
// ----------------------------------------

const ContentArea = () => {
  const notificationsData: NotificationItemProps[] = [
    {
      avatarSrc: AVATAR_NOTIF_1,
      team1LogoSrc: TEAM_LOGO_DELTAS,
      team1Name: 'Deltas FC',
      team2LogoSrc: TEAM_LOGO_JOSHFC,
      team2Name: 'Josh FC',
      message: 'is reschedule to 13-07-2024',
    },
    {
      avatarSrc: AVATAR_NOTIF_2,
      team1LogoSrc: TEAM_LOGO_DELTAS,
      team1Name: 'Deltas FC',
      team2LogoSrc: TEAM_LOGO_JOSHFC,
      team2Name: 'Josh FC',
      message: 'has been cancelled.',
    },
    {
      avatarSrc: AVATAR_NOTIF_3,
      team1LogoSrc: TEAM_LOGO_JOSHFC, // Swapped for variety
      team1Name: 'Alpha FC',
      team2LogoSrc: TEAM_LOGO_DELTAS,
      team2Name: 'Beta Utd',
      message: 'starts in 1 hour.',
    },
    {
      avatarSrc: AVATAR_NOTIF_4,
      team1LogoSrc: TEAM_LOGO_DELTAS,
      team1Name: 'Deltas FC',
      team2LogoSrc: TEAM_LOGO_JOSHFC,
      team2Name: 'Josh FC',
      message: 'is now live!',
    },
     {
      avatarSrc: AVATAR_NOTIF_5,
      team1LogoSrc: TEAM_LOGO_JOSHFC,
      team1Name: 'Gamma City',
      team2LogoSrc: TEAM_LOGO_DELTAS,
      team2Name: 'Deltas FC',
      message: 'postponed due to weather.',
    },
     {
      avatarSrc: AVATAR_NOTIF_6,
      team1LogoSrc: TEAM_LOGO_DELTAS,
      team1Name: 'Deltas FC',
      team2LogoSrc: TEAM_LOGO_JOSHFC,
      team2Name: 'Josh FC',
      message: 'result: 2-1 Win.',
    },
     {
      avatarSrc: AVATAR_NOTIF_7,
      team1LogoSrc: TEAM_LOGO_JOSHFC,
      team1Name: 'Warriors FC',
      team2LogoSrc: TEAM_LOGO_DELTAS,
      team2Name: 'Lions Utd',
      message: 'kick-off delayed by 30 mins.',
    },
     {
      avatarSrc: AVATAR_NOTIF_8,
      team1LogoSrc: TEAM_LOGO_DELTAS,
      team1Name: 'Deltas FC',
      team2LogoSrc: TEAM_LOGO_JOSHFC,
      team2Name: 'Josh FC',
      message: 'lineups announced.',
    },
    {
      avatarSrc: AVATAR_NOTIF_9,
      team1LogoSrc: TEAM_LOGO_JOSHFC,
      team1Name: 'Eagles City',
      team2LogoSrc: TEAM_LOGO_DELTAS,
      team2Name: 'Panthers FC',
      message: 'match ended in a draw.',
    },
  ];

  return (
    <main className="flex-grow">
      <div className="flex flex-col gap-3.5">
        {notificationsData.map((notif, index) => (
          <NotificationItem
            key={`${notif.message}-${index}`} // Using a more unique key
            avatarSrc={notif.avatarSrc}
            team1LogoSrc={notif.team1LogoSrc}
            team1Name={notif.team1Name}
            team2LogoSrc={notif.team2LogoSrc}
            team2Name={notif.team2Name}
            message={notif.message}
          />
        ))}
      </div>
    </main>
  );
};

const NotificationSettingsPage = () => {
  return (
    <div className="bg-[#F8F9FA] p-4 md:p-6 lg:p-8 min-h-screen font-lato">
        <div className="w-full max-w-[1097px] mx-auto flex flex-col lg:flex-row gap-6">
            <Sidebar />
            <ContentArea />
        </div>
    </div>
  );
};

export default NotificationSettingsPage;