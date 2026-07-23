import React, { createContext, useContext, useState } from 'react';
import { NotificationItem } from '../types/settings';

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'createdAt' | 'isRead'>) => void;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Upcoming Abhijit Muhurat',
    sanskritTitle: 'अभिजित् मुहूर्त आगमनम्',
    description: 'Auspicious timing window tomorrow from 11:44 AM to 12:30 PM.',
    category: 'muhurat',
    eventDate: '2026-07-24T11:44:00Z',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'notif_2',
    title: 'Guru Gochar (Jupiter Transit)',
    sanskritTitle: 'गुरु गोचर सञ्चारः',
    description: 'Jupiter enters auspicious transit alignment next week.',
    category: 'transit',
    eventDate: '2026-07-30T00:00:00Z',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const addNotification = (item: Omit<NotificationItem, 'id' | 'createdAt' | 'isRead'>) => {
    const newItem: NotificationItem = {
      ...item,
      id: `notif_${Date.now()}`,
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    setNotifications((prev) => [newItem, ...prev]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        clearAll,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
