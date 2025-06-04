"use client";

import React, { useState } from 'react';

// --- Icon Components ---
const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 14L11.1 11.1" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRightIcon = ({ className, color = "currentColor", opacity = 1 }: { className?: string, color?: string, opacity?: number }) => (
  <svg className={className} width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.757324 5.48067L4.49999 1.738L8.24266 5.48067" stroke={color} strokeOpacity={opacity} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DropdownArrowIcon = ({ className, color = "currentColor", opacity = 1 }: { className?: string, color?: string, opacity?: number }) => (
  <svg className={className} width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.1582 1.18604L5.2582 5.28604L9.3582 1.18604" stroke={color} strokeOpacity={opacity} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const EyeOffIcon = ({ className, color = "currentColor", opacity = 1 }: { className?: string, color?: string, opacity?: number }) => (
 <svg className={className} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.25 3.75C6.25 4.21083 6.0675 4.65183 5.74167 4.97767C5.41583 5.3035 4.97483 5.486 4.514 5.486C4.05317 5.486 3.61217 5.3035 3.28633 4.97767C2.9605 4.65183 2.778 4.21083 2.778 3.75C2.778 3.28917 2.9605 2.84817 3.28633 2.52233C3.61217 2.1965 4.05317 2.014 4.514 2.014C4.97483 2.014 5.41583 2.1965 5.74167 2.52233C6.0675 2.84817 6.25 3.28917 6.25 3.75Z" stroke={color} strokeOpacity={opacity} strokeWidth="0.625" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.25 3.75C2.08333 5.41667 3.75 7.08333 5.41667 7.08333C7.08333 7.08333 8.75 5.41667 9.58333 3.75" stroke={color} strokeOpacity={opacity} strokeWidth="0.625" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.14551 8.33333L8.85384 1.66667" stroke={color} strokeOpacity={opacity} strokeWidth="0.625" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>
);


const FileUploadIcon = ({ className, color = "currentColor", opacity = 1 }: { className?: string, color?: string, opacity?: number }) => (
  <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.6667 7.66669L24.3333 13.3334V27.3334C24.3333 27.7928 24.1577 28.2341 23.8452 28.5466C23.5326 28.8592 23.0913 29.0348 22.6319 29.0348H9.36806C8.90869 29.0348 8.46736 28.8592 8.15482 28.5466C7.84228 28.2341 7.66667 27.7928 7.66667 27.3334V4.66669C7.66667 4.20731 7.84228 3.76599 8.15482 3.45345C8.46736 3.14091 8.90869 2.96533 9.36806 2.96533H18.6667M18.6667 7.66669V13.3334H24.3333M18.6667 7.66669L24.3333 13.3334" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 23.6667V16.3333M16 16.3333L18.3333 18.6667M16 16.3333L13.6667 18.6667" stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>

);

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5447 4.038C10.5691 3.57467 9.76144 2.80667 8.99611 2.12267C8.95377 2.088 8.90311 2.06067 8.85311 2.06067H6.78244C6.65644 2.06067 6.57644 2.186 6.57644 2.312V10.3333C6.57644 12.6933 4.69244 14.5773 2.33244 14.5773C2.18844 14.5773 2.06044 14.448 2.06044 14.304V12.1907C2.06044 12.0647 2.18644 11.9847 2.31244 11.9847C3.54244 11.9847 4.51511 11.012 4.51511 9.782V2.312C4.51511 2.186 4.64111 2.06067 4.76711 2.06067H6.81244C6.87044 2.06067 6.92844 2.088 6.97044 2.12267C7.80044 2.86067 8.54644 3.69067 9.41644 4.184C11.0531 5.11467 11.6664 6.94733 11.6664 9.29267C11.6664 12.6787 14.6504 14.192 14.6504 14.192C14.7684 14.238 14.8944 14.1487 14.8944 14.0227V11.9087C14.8944 11.7827 14.7684 11.7027 14.6504 11.7027C13.7631 11.7027 13.1824 11.3907 12.7624 10.768C12.1631 9.88067 11.9684 8.286 12.4938 6.496C12.8184 5.362 12.3244 4.37467 11.5447 4.038Z" fill="black"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8.00001C16 3.58161 12.4183 0 8 0C3.58172 0 0 3.58161 0 8.00001C0 11.9913 2.92036 15.2046 6.75 15.875V10.25H4.71875V8.00001H6.75V6.26876C6.75 4.26251 7.94375 3.12501 9.775 3.12501C10.6562 3.12501 11.3438 3.18751 11.5625 3.21876V5.15626H10.5531C9.55938 5.15626 9.25 5.71876 9.25 6.50626V8.00001H11.4688L11.1562 10.25H9.25V15.875C13.0796 15.2046 16 11.9913 16 8.00001Z" fill="#0E77F2"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="insta-grad1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(3.04762 13.2381) rotate(-45.7986) scale(17.6549)">
        <stop stopColor="#FFC107"/>
        <stop offset="0.507" stopColor="#F44336"/>
        <stop offset="1" stopColor="#9C27B0"/>
      </radialGradient>
       <radialGradient id="insta-grad2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12.381 2.57143) rotate(134.201) scale(18.3016)">
        <stop stopColor="#4CAF50"/>
        <stop offset="0.315" stopColor="#2196F3"/>
        <stop offset="0.622" stopColor="#3F51B5"/>
        <stop offset="1" stopColor="#9C27B0"/>
      </radialGradient>
    </defs>
    <path d="M4.57143 0H11.4286C13.9524 0 16 2.04762 16 4.57143V11.4286C16 13.9524 13.9524 16 11.4286 16H4.57143C2.04762 16 0 13.9524 0 11.4286V4.57143C0 2.04762 2.04762 0 4.57143 0Z" fill="url(#insta-grad1)"/>
    <path d="M4.57143 0.571428H11.4286C13.6381 0.571428 15.4286 2.3619 15.4286 4.57143V11.4286C15.4286 13.6381 13.6381 15.4286 11.4286 15.4286H4.57143C2.3619 15.4286 0.571428 13.6381 0.571428 11.4286V4.57143C0.571428 2.3619 2.3619 0.571428 4.57143 0.571428Z" fill="url(#insta-grad2)"/>
    <path d="M8 3.80952C5.68571 3.80952 3.80952 5.68571 3.80952 8C3.80952 10.3143 5.68571 12.1905 8 12.1905C10.3143 12.1905 12.1905 10.3143 12.1905 8C12.1905 5.68571 10.3143 3.80952 8 3.80952ZM8 10.6667C6.52381 10.6667 5.33333 9.47619 5.33333 8C5.33333 6.52381 6.52381 5.33333 8 5.33333C9.47619 5.33333 10.6667 6.52381 10.6667 8C10.6667 9.47619 9.47619 10.6667 8 10.6667ZM12.381 4.57143C12.381 4.97619 12.0571 5.33333 11.619 5.33333C11.2238 5.33333 10.8667 4.97619 10.8667 4.57143C10.8667 4.16667 11.2238 3.80952 11.619 3.80952C12.0571 3.80952 12.381 4.16667 12.381 4.57143Z" fill="white"/>
  </svg>
);

const DeleteIcon = ({ className, color = "#FF0000" }: { className?: string, color?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4L4.94167 13.125C4.97278 13.5491 5.16079 13.9451 5.46961 14.2324C5.77844 14.5197 6.18185 14.675 6.60001 14.6667H9.40001C9.81816 14.675 10.2216 14.5197 10.5304 14.2324C10.8392 13.9451 11.0272 13.5491 11.0583 13.125L12 4M6.66667 4L7.11667 2.45C7.23098 2.05332 7.53679 1.77337 7.91534 1.70518C8.29389 1.63698 8.68784 1.80042 8.92501 2.1L9.33334 4M2.66667 4H13.3333" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LoginIcon = ({ className, color = "#008000" }: { className?: string, color?: string }) => (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 12L14 8L10 4" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.3333 8H6M6 14.6654H3.33333C2.97971 14.6654 2.64057 14.5249 2.39052 14.2749C2.14048 14.0248 2 13.6857 2 13.332V2.66536C2 2.31174 2.14048 1.9726 2.39052 1.72256C2.64057 1.47251 2.97971 1.33203 3.33333 1.33203H6" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ViewDashboardIcon = ({ className, color = "#4BADBF" }: { className?: string, color?: string }) => (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 10.6667C9.47276 10.6667 10.6667 9.47276 10.6667 8C10.6667 6.52724 9.47276 5.33333 8 5.33333C6.52724 5.33333 5.33333 6.52724 5.33333 8C5.33333 9.47276 6.52724 10.6667 8 10.6667Z" fill={color}/>
        <path d="M2 8C3.50267 4.912 5.632 2.66667 8 2.66667C10.368 2.66667 12.4973 4.912 14 8C12.4973 11.088 10.368 13.3333 8 13.3333C5.632 13.3333 3.50267 11.088 2 8Z" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const EditProfileIcon = ({ className, color = "#CC37F1" }: { className?: string, color?: string }) => (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 14H14" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.6693 2.00001L5.33067 7.33868C5.13856 7.53079 5.02487 7.79697 5.00667 8.07468L4.848 10.5747C4.83082 10.8388 4.92461 11.0993 5.10693 11.2816C5.28925 11.4639 5.54973 11.5577 5.8138 11.5405L8.3138 11.3825C8.59151 11.3643 8.85769 11.2506 9.0498 11.0585L14.3885 5.71984C14.7819 5.32644 15.0002 4.79299 15.0002 4.23492C15.0002 3.67686 14.7819 3.14341 14.3885 2.74992C13.9951 2.35652 13.4616 2.13828 12.9036 2.13828C12.3455 2.13828 11.8121 2.35652 11.4186 2.74992L10.6693 3.49918" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const UploadFileIcon = ({ className, color = "#0B57B1" }: { className?: string, color?: string }) => (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.33333 12.6667H10.6667M8 10V2.66667M8 2.66667L10 4.66667M8 2.66667L6 4.66667M2.66667 8.66667V12C2.66667 12.3536 2.80714 12.6928 3.05719 12.9428C3.30724 13.1929 3.64638 13.3333 4 13.3333H12C12.3536 13.3333 12.6928 13.1929 12.9428 12.9428C13.1929 12.6928 13.3333 12.3536 13.3333 12V8.66667" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ReadMessagesIcon = ({ className, color = "#40A0D5" }: { className?: string, color?: string }) => (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.4607 5.12667L8.96066 9.08C8.42881 9.47633 7.74299 9.48622 7.19999 9.10667L2 5.99333M2.83333 3.33333H13.1667C13.844 3.33333 14.394 3.88667 14.394 4.56667V11.4333C14.394 12.1133 13.844 12.6667 13.1667 12.6667H2.83333C2.156 12.6667 1.606 12.1133 1.606 11.4333V4.56667C1.606 3.88667 2.156 3.33333 2.83333 3.33333Z" stroke={color} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const LogoutIcon = ({ className, color = "#FF0000" }: { className?: string, color?: string }) => (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 8H2" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.3333 11.332L10 7.9987L13.3333 4.66536" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 1.33203H4.66667C5.02029 1.33203 5.35943 1.47251 5.60948 1.72256C5.85952 1.9726 6 2.31174 6 2.66536V13.332C6 13.6857 5.85952 14.0248 5.60948 14.2749C5.35943 14.5249 5.02029 14.6654 4.66667 14.6654H2" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


// --- Main Components ---

const SettingsSidebar = () => {
  const [activeSetting, setActiveSetting] = useState('Profile Settings');

  const settingsLinks = [
    { name: 'Profile Settings', opacity: 0.92, fontWeight: 'font-semibold' as const },
    { name: 'Language Settings', opacity: 0.88, fontWeight: 'font-medium' as const },
    { name: 'Notifications Settings', opacity: 0.88, fontWeight: 'font-medium' as const },
    { name: 'Access Security', opacity: 0.88, fontWeight: 'font-medium' as const },
    { name: 'Subscriptions & Billing', opacity: 0.88, fontWeight: 'font-medium' as const },
    { name: 'Data & Storage', opacity: 0.88, fontWeight: 'font-medium' as const },
    { name: 'Help & Support', opacity: 0.88, fontWeight: 'font-medium' as const },
    { name: 'Appearance & Themes', opacity: 0.88, fontWeight: 'font-medium' as const },
    { name: 'Privacy Settings', opacity: 0.88, fontWeight: 'font-medium' as const },
    { name: 'Connected Accounts', opacity: 0.88, fontWeight: 'font-medium' as const },
  ];

  return (
    <aside className="w-full lg:w-[400px] bg-white border border-[#D1D1D1] shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)] p-3 lg:p-6 flex-shrink-0"> {/* p-6 is itemSpacing from parent (24), p-3 is x from parent(12) */}
      <div className="mb-8"> {/* Search bar container, itemSpacing 32px from Figma for next section */}
        <div className="h-10 rounded-[30px] border border-black/40 flex items-center px-5">
          <SearchIcon className="w-4 h-4 text-black/80 mr-2" />
          <input
            type="text"
            placeholder="Search Setting"
            className="text-sm font-lato font-semibold text-black placeholder-black/80 bg-transparent outline-none flex-grow"
          />
        </div>
      </div>

      <nav className="flex flex-col gap-5"> {/* itemSpacing 20px */}
        {settingsLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => setActiveSetting(link.name)}
            className={`flex justify-between items-center w-full text-left opacity-[${link.opacity}] hover:opacity-100 transition-opacity`}
          >
            <span className={`text-lg font-lato ${link.fontWeight} text-black pl-1.5`}> {/* x: 6px */}
              {link.name}
            </span>
            <ArrowRightIcon className={`w-4 h-4 text-black/90 transform rotate-[-90deg] ${activeSetting === link.name ? 'opacity-90' : `opacity-[${link.opacity}]`}`} />
          </button>
        ))}
      </nav>
    </aside>
  );
};

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  hasDropdownArrow?: boolean;
  hasPasswordToggle?: boolean;
  inputClassName?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type = 'text',
  placeholder,
  defaultValue,
  hasDropdownArrow,
  hasPasswordToggle,
  inputClassName
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2"> {/* itemSpacing: 8px */}
      <label className="text-base font-lato font-normal text-black opacity-[0.88]">{label}</label>
      <div className={`h-10 rounded-[10px] border border-black/40 flex items-center ${inputClassName ? inputClassName : 'px-2.5'}`}> {/* stroke: 0.48, opacity 0.48 */}
        <input
          type={hasPasswordToggle && showPassword ? 'text' : type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="text-base font-lato font-normal text-black/80 bg-transparent outline-none flex-grow"
        />
        {hasDropdownArrow && <DropdownArrowIcon className="w-[10.22px] h-[5.19px] text-black opacity-[0.88] ml-2" />}
        {hasPasswordToggle && (
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2">
            <EyeOffIcon className="w-2.5 h-2.5 text-black opacity-80" />
          </button>
        )}
      </div>
    </div>
  );
};

const ActivityItem: React.FC<{ icon: React.ReactNode; text: string; timestamp: string }> = ({ icon, text, timestamp }) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-1.5"> {/* itemSpacing: 6px */}
      {icon}
      <span className="text-sm font-lato font-normal text-black opacity-[0.88]">{text}</span>
    </div>
    <span className="text-sm font-lato font-normal text-black opacity-[0.88]">{timestamp}</span>
  </div>
);


const SettingsContentArea = () => {
  return (
    <main className="flex-grow bg-white"> {/* Main content section */}
      <div className="flex flex-col lg:flex-row gap-5"> {/* itemSpacing: 20px */}
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-5"> {/* itemSpacing: 20px */}
          <div className="bg-white border border-[#D1D1D1] shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)] p-5"> {/* itemSpacing from parent for padding, inner itemSpacing 20px */}
            <h3 className="text-sm font-lato font-semibold text-black mb-4">Personal Information</h3> {/* itemSpacing: 20px to next frame */}
            <div className="flex flex-col gap-4"> {/* itemSpacing: 16px */}
              <FormInput label="First Name" />
              <FormInput label="Last Name" />
              <FormInput label="Email Address" type="email" />
              <FormInput label="Phone Number" type="tel" />
              <FormInput label="Address" />
              <FormInput label="Location" hasDropdownArrow />
              <FormInput label="Currency" defaultValue="Nigerian Naira (₦)" inputClassName="px-3"/> {/* x: 11px padding */}
              <FormInput label="Affliation" />
              <FormInput label="Club Company" />
            </div>
          </div>

          <div className="bg-white border border-[#D1D1D1] shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)] p-5">
            <h3 className="text-sm font-lato font-semibold text-black mb-1.5">Upload file</h3>
            <p className="text-xs font-lato font-normal text-black/80 mb-5">Track your activities in real time</p> {/* itemSpacing 10px, 20px */}
            <div className="border-2 border-dashed border-[#D1D1D1] rounded bg-white h-[117px] flex flex-col items-center justify-center p-4 text-center">
                <FileUploadIcon className="w-8 h-8 text-black opacity-70 mb-2" />
                <p className="text-xs font-lato">
                    <span className="font-semibold text-black opacity-95">Drag & drop your files here</span>
                    <span className="text-black/60"> or </span>
                    <span className="text-[#041931] font-semibold opacity-95">choose file</span>
                </p>
                <p className="text-[8px] font-lato font-normal text-black opacity-[0.88] mt-1.5">100 MB maximum file size</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-5"> {/* itemSpacing: 20px */}
          <div className="bg-white border border-[#D1D1D1] shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)] p-5"> {/* itemSpacing from parent for padding, inner itemSpacing 20px */}
            <h3 className="text-sm font-lato font-semibold text-black mb-5">Password Management</h3> {/* itemSpacing: 20px to next frame */}
            <div className="flex flex-col gap-6"> {/* itemSpacing: 24px */}
                <div className="flex flex-col gap-4"> {/* itemSpacing: 16px */}
                    <FormInput label="Current Password" type="password" defaultValue="*************" hasPasswordToggle />
                    <FormInput label="New Password" type="password" defaultValue="*************" hasPasswordToggle />
                    <FormInput label="Confirm Password" type="password" defaultValue="*************" hasPasswordToggle />
                </div>
                <button className="h-10 w-full rounded-[10px] border border-[#041931] text-base font-lato font-normal text-black flex items-center justify-center hover:bg-gray-50 transition">
                    Save Changes
                </button>
            </div>
          </div>

          <div className="bg-white border border-[#D1D1D1] shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)] p-5"> {/* itemSpacing from parent for padding, inner itemSpacing 16px */}
            <div className="mb-4"> {/* itemSpacing 16px */}
                <h3 className="text-sm font-lato font-semibold text-black mb-2.5">Social Links</h3>
                <p className="text-base font-lato font-normal text-black/80">Manage your social media links</p>
            </div>
            <div className="flex flex-col gap-4"> {/* itemSpacing 16px */}
                <div className="bg-[#B6E9EB]/80 h-7 flex items-center justify-between px-1">
                    <span className="text-sm font-lato font-normal text-black opacity-[0.88]">Add Social Links</span>
                    <DropdownArrowIcon className="w-[8.5px] h-[5.2px] text-black opacity-[0.88]" />
                </div>
                <div className="flex flex-col gap-6 opacity-[0.88]"> {/* itemSpacing 24px */}
                    <div className="flex flex-col gap-4"> {/* itemSpacing 16px */}
                        <ActivityItem icon={<TiktokIcon className="w-[17px] h-[17px]" />} text="TikTok" timestamp={<DeleteIcon className="w-4 h-4" />} />
                        <ActivityItem icon={<FacebookIcon className="w-4 h-4" />} text="Facebook" timestamp={<DeleteIcon className="w-4 h-4" />} />
                        <ActivityItem icon={<InstagramIcon className="w-4 h-4" />} text="Instagram" timestamp={<DeleteIcon className="w-4 h-4" />} />
                    </div>
                    <div className="flex flex-col gap-3"> {/* itemSpacing 12px */}
                        <button className="h-7 w-full rounded bg-white border border-[#041931] text-xs font-lato font-bold text-[#041931] flex items-center justify-center hover:bg-gray-50 transition">
                            Save Changes
                        </button>
                        <button className="h-7 w-full rounded border border-black/60 text-xs font-lato font-semibold text-[#FF0000] opacity-70 flex items-center justify-center hover:bg-gray-50 transition">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
          </div>

          <div className="bg-white border border-[#D1D1D1] shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)] p-5"> {/* itemSpacing from parent for padding, inner itemSpacing 16px */}
             <div className="mb-4"> {/* itemSpacing 16px */}
                <h3 className="text-sm font-lato font-semibold text-black mb-2.5">Activity Log</h3>
                <p className="text-base font-lato font-normal text-black/80">Track your activities in real time</p>
            </div>
            <div className="flex items-center justify-between mb-4 px-[18.5px]"> {/* itemSpacing 16px, px from Figma for alignment */}
                <div className="flex gap-[84px]">
                    <span className="text-xs font-lato font-normal text-black opacity-70">Activity</span>
                    <span className="text-xs font-lato font-normal text-black opacity-70">Timestamp</span>
                </div>
                <button className="text-[8px] font-lato font-semibold text-black opacity-[0.88] hover:underline">See All</button>
            </div>
            <div className="flex flex-col gap-4"> {/* itemSpacing 16px */}
                <ActivityItem icon={<LoginIcon className="w-4 h-4" />} text="Logged in" timestamp="2024-02-23 10:00 AM" />
                <ActivityItem icon={<ViewDashboardIcon className="w-4 h-4" />} text="View dashboard" timestamp="2024-02-23 10:00 AM" />
                <ActivityItem icon={<EditProfileIcon className="w-4 h-4" />} text="Edited profile" timestamp="2024-02-23 10:50 AM" />
                <ActivityItem icon={<UploadFileIcon className="w-4 h-4" />} text="Uploaded file" timestamp="2024-02-23 03:45 PM" />
                <ActivityItem icon={<ReadMessagesIcon className="w-4 h-4" />} text="Read messages" timestamp="2024-02-23 09:50 PM" />
                <ActivityItem icon={<LogoutIcon className="w-4 h-4" />} text="Logged out" timestamp="2024-02-23 11:30 PM" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center"> {/* itemSpacing 32px from main content to button */}
        <button className="h-10 bg-[#041931] rounded-[10px] text-white text-base font-lato font-bold px-8 py-2 w-full lg:w-auto lg:min-w-[400px] hover:bg-[#031222] transition"> {/* Width matches figma frame, centered for mobile */}
            Save All Changes
        </button>
      </div>
    </main>
  );
};


const GeneralSettingsPage = () => {
  return (
    <div className="bg-[#F8F9FA] p-4 md:p-6 lg:py-8 font-lato min-h-screen"> {/* y:100 is handled by page layout, here using padding */}
      <div className="w-full max-w-[1098px] mx-auto flex flex-col lg:flex-row gap-5"> {/* Gap 20px (780 - (360+400)) */}
        <SettingsSidebar />
        <SettingsContentArea />
      </div>
    </div>
  );
};

export default GeneralSettingsPage;

/*
Tailwind Config Notes:
theme: {
  extend: {
    fontFamily: {
      lato: ['Lato', 'sans-serif'],
    },
    opacity: {
      '40': '0.40', // For borders primarily
      '60': '0.60',
      '70': '0.70',
      '72': '0.72',
      '80': '0.80',
      '88': '0.88',
      '90': '0.90',
      '92': '0.92',
      '95': '0.95',
    },
    spacing: {
      '1.5': '6px', // For pl-1.5
      '2.5': '10px', // For px-2.5
    },
    borderColor: theme => ({
        ...theme('colors'),
        'black/40': 'rgba(0, 0, 0, 0.47999998927116394)', // Figma specified 0.48 opacity for black
        'black/60': 'rgba(0, 0, 0, 0.6399999856948853)',
    }),
    backgroundColor: theme => ({
        ...theme('colors'),
        'tealish/80': 'rgba(182, 233, 235, 0.800000011920929)', // #B6E9EB with 80% opacity
    }),
  },
},

Important:
- Placeholder image URLs (https://via.placeholder.com/) are used. Replace them with your actual image assets.
- The SVG icons are now embedded directly. You might want to make them separate components if used elsewhere.
- The color for file upload icon and some other specific icon colors like the green login icon, purple edit icon, etc., are directly in the SVG or passed as props.
- Check Tailwind JIT mode for arbitrary values like `opacity-[0.88]`. If not working, define them in `tailwind.config.js`.
- Font weights 'SemiBold' and 'Medium' are used as per Figma spec. Ensure your Lato font supports these.
- The complex "Drag & drop" text with mixed styles is simplified; you might need a more robust solution (e.g., dangerouslySetInnerHTML or splitting into multiple spans) if exact Figma rendering is critical.
- The overall page structure tries to match the Figma layout, with sidebar and content areas.
*/