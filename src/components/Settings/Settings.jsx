"use client";

import React, { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("General");
  const [platformName, setPlatformName] = useState("");
  const [platformDescription, setPlatformDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [paymentSettings, setPaymentSettings] = useState({
    gateway: "",
    apiKey: "",
    secretKey: "",
    merchantId: "",
    currency: "USD"
  });
  const [userSettings, setUserSettings] = useState({
    registrationMode: "auto",
    requirePhoneVerification: false,
    requireIdForExperts: false
  });

  const [sessionSettings, setSessionSettings] = useState({
    defaultDuration: 30,
    cancellationPolicy: "24 HOURS NOTICE REQUIRED*",
    reschedulingPolicy: "UP TO 1 RESCHEDULE ALLOWED",
    rescheduleCutoff: "12 HOURS BEFORE SESSION"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    sessionReminders: true,
    passwordExpirationDays: 90,
    paymentConfirmations: true,
    newExpertNotifications: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    minLength: 8,
    requireUppercase: true,
    requireSpecialChar: true,
    passwordExpiration: 90
  });

  const [backupSettings, setBackupSettings] = useState({
    enableBackups: true,
    backupSchedule: "daily",
    backupLocation: "CLOUD AWS",
    retentionPeriod: 30
  });

  

  const tabs = [
    "General", "Payment", "User", "Session", "Notification", "Security", "Backup"
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  const handlePaymentChange = (e) => {
    setPaymentSettings({
      ...paymentSettings,
      [e.target.name]: e.target.value
    });
  };

  const handleUserSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const updateDuration = (change) => {
    const durations = [15, 30, 45, 60, 90];
    let currentIndex = durations.indexOf(sessionSettings.defaultDuration);
  
    if (change === 1 && currentIndex > 0) {
      // Move down the list (descending)
      setSessionSettings({ ...sessionSettings, defaultDuration: durations[currentIndex - 1] });
    } else if (change === -1 && currentIndex < durations.length - 1) {
      // Move up the list (ascending)
      setSessionSettings({ ...sessionSettings, defaultDuration: durations[currentIndex + 1] });
    }
  };

  const handleNotificationChange = (name) => {
    setNotificationSettings((prevState) => ({
      ...prevState,
      [name]: !prevState[name], // Toggle the state
    }));
  };


  const updatePasswordExpiration = (change) => {
    const durations = [1, 15, 30, 45, 90, 120];
    let currentIndex = durations.indexOf(notificationSettings.passwordExpirationDays);
  
    if (change === 1 && currentIndex > 0) {
      setNotificationSettings({ ...notificationSettings, passwordExpirationDays: durations[currentIndex - 1] });
    } else if (change === -1 && currentIndex < durations.length - 1) {
      setNotificationSettings({ ...notificationSettings, passwordExpirationDays: durations[currentIndex + 1] });
    }
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMinLengthChange = (step) => {
    setSecuritySettings((prev) => {
      let newValue = prev.minLength + step;
      if (newValue < 8) newValue = 8; // Minimum length is 8
      if (newValue > 20) newValue = 20; // Maximum length is 20
      return { ...prev, minLength: newValue };
    });
  };


  const handlePasswordExpirationChange = (step) => {
  const expirationOptions = [1, 15, 30, 45, 90];
  setSecuritySettings((prev) => {
    let currentIndex = expirationOptions.indexOf(prev.passwordExpiration);
    let newIndex = currentIndex + step;

    if (newIndex < 0) newIndex = 0; // Minimum value
    if (newIndex >= expirationOptions.length) newIndex = expirationOptions.length - 1; // Maximum value

    return { ...prev, passwordExpiration: expirationOptions[newIndex] };
  });
};

const handleBackupChange = (e) => {
  const { name, value } = e.target;
  setBackupSettings(prev => ({
    ...prev,
    [name]: value
  }));
};

  return (
    <div className="min-h-screen bg-white -mx-6">
      <div className="mx-auto max-w-8xl bg-white p-8">
        {/* Tabs Container */}
        <div className="bg-[#D9D9D9] rounded-t-2xl px-4 max-w-full">
          <div className="flex flex-wrap gap-x-11 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 text-sm font-medium ${
                  activeTab === tab
                    ? "text-black"
                    : "text-black hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-8 mx-10">
          {activeTab === "General" ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">1. GENERAL SETTINGS</h2>
              
              {/* Platform Name */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Platform Name
                </label>
                <input
                  type="text"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 placeholder-gray-400"
                  
                />
              </div>

              {/* Platform Description */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Platform Description
                </label>
                <textarea
                  value={platformDescription}
                  onChange={(e) => setPlatformDescription(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 h-32 placeholder-gray-400"
                  placeholder="Enter Platform Description"
                />
              </div>

              {/* Logo Upload */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Logo
                </label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer bg-gray-200 text-black px-14 py-2.5 rounded-lg hover:bg-gray-300 border border-[#E6E6E6]">
                    Choose File
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                  <span className="text-sm text-black">
                    {selectedFile || "No File chosen"}
                  </span>
                </div>
              </div>
            </>
          ) : activeTab === "Payment" ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">2. PAYMENT SETTINGS</h2>

              {/* Payment Gateway */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Payment Gateway
                </label>
                <select
                  name="gateway"
                  value={paymentSettings.gateway}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                >
                  <option value="">SELECT PAYMENTS</option>
                  <option value="stripe">Stripe</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              {/* API Key */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  API Key
                </label>
                <input
                  type="text"
                  name="apiKey"
                  value={paymentSettings.apiKey}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 placeholder-gray-400"
                  placeholder="Enter API Key"
                />
              </div>

              {/* Secret Key */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Secret Key
                </label>
                <input
                  type="text"
                  name="secretKey"
                  value={paymentSettings.secretKey}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 placeholder-gray-400"
                  placeholder="Enter Secret Key"
                />
              </div>

              {/* Merchant ID */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Merchant ID
                </label>
                <input
                  type="text"
                  name="merchantId"
                  value={paymentSettings.merchantId}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 placeholder-gray-400"
                  placeholder="Enter Merchant ID"
                />
              </div>

              {/* Currency */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Currency
                </label>
                <select
                  name="currency"
                  value={paymentSettings.currency}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </>
          ) : activeTab === "User" ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">3. USER SETTINGS</h2>

              {/* User Registration Mode */}
              <div className="mb-8">
  <label className="block text-sm font-semibold text-gray-700 mb-4">
    User Registration Mode
  </label>
  <div className="space-y-3">
    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="registrationMode"
        value="auto"
        checked={userSettings.registrationMode === 'auto'}
        onChange={handleUserSettingsChange}
        className="h-4 w-4 accent-black border-gray-300"
      />
      <span className="text-gray-700">AUTO</span>
    </label>
    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="registrationMode"
        value="manual"
        checked={userSettings.registrationMode === 'manual'}
        onChange={handleUserSettingsChange}
        className="h-4 w-4 accent-black border-gray-300"
      />
      <span className="text-gray-700">MANUAL APPROVAL</span>
    </label>
  </div>
</div>


              {/* Profile Requirements */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Profile Requirements
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="requirePhoneVerification"
                      checked={userSettings.requirePhoneVerification}
                      onChange={handleUserSettingsChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">Require phone verification</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="requireIdForExperts"
                      checked={userSettings.requireIdForExperts}
                      onChange={handleUserSettingsChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="text-gray-700">Require ID for Experts</span>
                  </label>
                </div>
              </div>
            </>
           ) : activeTab === "Session" ? (
            <>
<h2 className="text-2xl font-bold text-gray-900 mb-8">4. SESSION SETTINGS</h2>

{/* Default Session Duration */}
<div className="mb-8">
  <div className="flex justify-between items-center mb-4">
    <span className="text-sm font-semibold text-gray-700">
      DEFAULT SESSION DURATION
    </span>
  </div>
  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
    <span className="text-black">{sessionSettings.defaultDuration} MINUTES</span>
    <div className="flex flex-col">
      <button 
        className="text-gray-700 hover:text-black" 
        onClick={() => updateDuration(1)} 
      >
        ▲
      </button>
      <button 
        className="text-gray-700 hover:text-black" 
        onClick={() => updateDuration(-1)} 
      >
        ▼
      </button>
    </div>
  </div>
</div>

{/* Cancellation Policy */}
<div className="mb-8">
  <div className="flex justify-between items-center mb-4">
    <span className="text-sm font-semibold text-gray-700">
      CANCELLATION POLICY
    </span>
  </div>
  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
    <span className="text-red-500">{sessionSettings.cancellationPolicy}</span>
    <div className="flex items-center">
      <span className="h-10 w-0.5 bg-black mx-20"></span>
      <button className="border border-black text-white bg-black px-7 py-1 mx-7 text-xl">
        Change
      </button>
    </div>
  </div>
</div>

{/* Rescheduling Policy */}
<div className="mb-8">
  <div className="flex justify-between items-center mb-4">
    <span className="text-sm font-semibold text-gray-700">
      RESCHEDULING POLICY
    </span>
  </div>
  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
    <span className="text-red-500">{sessionSettings.reschedulingPolicy}</span>
    <div className="flex items-center">
      <span className="h-10 w-0.5 bg-black mx-20"></span>
      <button className="border border-black text-white bg-black px-7 py-1 mx-7 text-xl">
        Change
      </button>
    </div>
  </div>
</div>

{/* Reschedule Cutoff */}
<div className="mb-8">
  <div className="flex justify-between items-center mb-4">
    <span className="text-sm font-semibold text-gray-700">
      RESCHEDULE CUTOFF
    </span>
  </div>
  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
    <span className="text-red-500">{sessionSettings.rescheduleCutoff}</span>
    <div className="flex items-center">
      <span className="h-10 w-0.5 bg-black mx-20"></span>
      <button className="border border-black text-white bg-black px-7 py-1 mx-7 text-xl">
        Change
      </button>
    </div>
  </div>
</div>

</>
 ) : activeTab === "Notification" ? (
  <>
<h2 className="text-2xl font-bold text-gray-900 mb-8">5. NOTIFICATION SETTINGS</h2>

<div className="grid grid-cols-2 gap-8 mb-8">
  {/* Left Column (Notification Toggles) */}
  <div>
    <h3 className="text-sm font-semibold text-gray-700 mb-6">Notification Toggles</h3>

    {/* Session Reminders */}
    <div className="flex items-center gap-4 mb-6">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={notificationSettings.sessionReminders}
          onChange={() => handleNotificationChange("sessionReminders")}
          className="appearance-none border border-gray-400 rounded-full w-5 h-5 checked:bg-black"
        />
        <span className="ml-3 text-gray-700">SEND SESSION REMINDER EMAILS</span>
      </label>
    </div>

    {/* Payment Confirmations */}
    <div className="flex items-center gap-4 mb-6">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={notificationSettings.paymentConfirmations}
          onChange={() => handleNotificationChange("paymentConfirmations")}
          className="appearance-none border border-gray-400 rounded-full w-5 h-5 checked:bg-black"
        />
        <span className="ml-3 text-gray-700">SEND PAYMENT CONFIRMATIONS</span>
      </label>
    </div>

    {/* New Expert Notifications */}
    <div className="flex items-center gap-4 mb-6">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={notificationSettings.newExpertNotifications}
          onChange={() => handleNotificationChange("newExpertNotifications")}
          className="appearance-none border border-gray-400 rounded-full w-5 h-5 checked:bg-black"
        />
        <span className="ml-3 text-gray-700">NOTIFY ADMIN OF NEW EXPERT REGISTRATIONS</span>
      </label>
    </div>
  </div>



  {/* Right Column (Password Expiration Days) */}
  <div className="flex flex-col items-center mt-10">
  <div className="flex items-center gap-10">
    <span className="text-gray-700">PASSWORD EXPIRATION DAYS</span>

    {/* Styled Input Box with Arrows */}
    <div className="relative flex items-center bg-[#D9D9D9] rounded-lg px-2 py-1">
      <input
        type="text"
        value={notificationSettings.passwordExpirationDays}
        readOnly
        className="w-16 text-black text-1xl text-center bg-[#D9D9D9] border-none outline-none"
      />

      {/* Arrows Inside the Input Box */}
      <div className="flex flex-col ml-2">
        <button 
          onClick={() => updatePasswordExpiration(1)} 
          className="text-black text-sm leading-none"
        >
          ▲
        </button>
        <button 
          onClick={() => updatePasswordExpiration(-1)} 
          className="text-black text-sm leading-none"
        >
          ▼
        </button>
      </div>
    </div>
  </div>
</div>

</div>
</>
) : activeTab === "Security" ? (
  <>
    <h2 className="text-2xl font-bold text-gray-900 mb-8">6. SECURITY SETTINGS</h2>

    {/* Password Policy */}
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-gray-700 mb-6">PASSWORD POLICY</h3>

      {/* Minimum Length & Require Uppercase (Side by Side, Closer Together) */}
      <div className="flex items-center justify-start gap-8 mb-6">
        {/* Minimum Length */}
        <div className="flex items-center gap-4">
          <span className="text-gray-700">MINIMUM LENGTH</span>
          <div className="relative flex items-center border border-gray-300 rounded-lg px-4 py-2">
            <input
              type="text"
              name="minLength"
              value={securitySettings.minLength}
              readOnly
              className="w-16 text-black text-1xl text-left bg-white border-none outline-none"
            />
            <div className="flex flex-col ml-2">
              <button 
                onClick={() => handleMinLengthChange(1)} 
                className="text-black text-xs leading-none"
              >
                ▲
              </button>
              <button 
                onClick={() => handleMinLengthChange(-1)} 
                className="text-black text-xs leading-none"
              >
                ▼
              </button>
            </div>
          </div>
        </div>

        {/* Require Uppercase (Now Closer to Minimum Length) */}
        <div className="flex items-center gap-3">
          <span className="text-gray-700">REQUIRE UPPERCASE</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="requireUppercase"
              checked={securitySettings.requireUppercase}
              onChange={handleSecurityChange}
              className="sr-only"
            />
            <div className={`w-11 h-6 bg-gray-200 rounded-full transition ${securitySettings.requireUppercase ? 'bg-blue-600' : ''}`}>
              <div className={`absolute top-0.5 left-[2px] bg-white border-gray-300 rounded-full h-5 w-5 transition-transform ${securitySettings.requireUppercase ? 'translate-x-5' : ''}`}></div>
            </div>
          </label>
        </div>
      </div>
      

      {/* Require Special Character */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-gray-700">REQUIRE SPECIAL CHARACTER</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="requireSpecialChar"
            checked={securitySettings.requireSpecialChar}
            onChange={handleSecurityChange}
            className="sr-only"
          />
          <div className={`w-11 h-6 bg-gray-200 rounded-full transition ${securitySettings.requireSpecialChar ? 'bg-blue-600' : ''}`}>
            <div className={`absolute top-0.5 left-[2px] bg-white border-gray-300 rounded-full h-5 w-5 transition-transform ${securitySettings.requireSpecialChar ? 'translate-x-5' : ''}`}></div>
          </div>
        </label>
      </div>

      {/* Password Expiration */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-gray-700">PASSWORD EXPIRATION DAYS</span>
        <div className="relative flex items-center border border-gray-300 rounded-lg px-4 py-2">
          <input
            type="text"
            name="passwordExpiration"
            value={securitySettings.passwordExpiration}
            readOnly
            className="w-16 text-black text-1xl text-left bg-white border-none outline-none"
          />
          <div className="flex flex-col ml-2">
            <button 
              onClick={() => handlePasswordExpirationChange(1)} 
              className="text-black text-xs leading-none"
            >
              ▲
            </button>
            <button 
              onClick={() => handlePasswordExpirationChange(-1)} 
              className="text-black text-xs leading-none"
            >
              ▼
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
          ) : activeTab === "Backup" ? (
            <>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">7. BACKUP SETTINGS</h2>

{/* Enable Backups */}
<div className="flex items-center justify-start mb-6 gap-20">

  <span className="text-gray-700">ENABLE AUTOMATIC BACKUPS</span>
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      name="enableBackups"
      checked={backupSettings.enableBackups}
      onChange={(e) => setBackupSettings(prev => ({
        ...prev,
        enableBackups: e.target.checked
      }))}
      className="sr-only"
    />
<div className={`w-11 h-6 rounded-full transition ${backupSettings.enableBackups ? 'bg-black' : 'bg-gray-200'}`}>
  <div className={`absolute top-0.5 left-[2px] bg-white border-gray-300 rounded-full h-5 w-5 transition-transform ${backupSettings.enableBackups ? 'translate-x-5' : ''}`}></div>
</div>

  </label>
</div>

{/* Backup Schedule */}
<div className="mb-8">
<div className="flex items-center justify-start mb-6 gap-32">
    <span className="text-gray-700">BACKUP SCHEDULE</span>
    <select
      name="backupSchedule"
      value={backupSettings.backupSchedule}
      onChange={handleBackupChange}
      className="w-48 p-2 border border-gray-300 rounded-md"
    >
      <option value="daily">Daily</option>
      <option value="monthly">Monthly</option>
      <option value="yearly">Yearly</option>
    </select>
  </div>
</div>

{/* Backup Location */}
<div className="mb-8">
<div className="flex items-center justify-start mb-6 gap-32">
    <span className="text-gray-700">BACKUP LOCATION</span>
    <select
      name="backupLocation"
      value={backupSettings.backupLocation}
      onChange={handleBackupChange}
      className="w-48 p-2 border border-gray-300 rounded-md"
    >
      <option value="CLOUD AWS">CLOUD AWS</option>
      <option value="GOOGLE CLOUD STORAGE">GOOGLE CLOUD STORAGE</option>
    </select>
  </div>
</div>

{/* Retention Period */}
<div className="mb-8">
<div className="flex items-center justify-start mb-6 gap-20">
    <span className="text-gray-700">RETENTION PERIOD (DAYS)</span>
    <select
      name="retentionPeriod"
      value={backupSettings.retentionPeriod}
      onChange={handleBackupChange}
      className="w-48 p-2 border border-gray-300 rounded-md"
    >
      <option value={7}>7 Days</option>
      <option value={15}>15 Days</option>
      <option value={30}>30 Days</option>
    </select>
  </div>
</div>
</>
) : null}



          {/* Save Button */}
          <div className="flex justify-center mt-12">
            <button className="bg-red-600 text-white px-14 py-3 rounded-lg hover:bg-red-700 transition-colors">
              SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;