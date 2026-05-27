import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  joined: string;
}

interface VisitorState {
  registeredUsers: RegisteredUser[];
  totalVisits: number;
  registerUser: (name: string, email: string) => void;
  incrementVisits: () => void;
}

const initialSampleUsers: RegisteredUser[] = [
  {
    id: "cust-92a11",
    name: "Aria Montgomery",
    email: "aria.m@luxury.com",
    joined: "May 20, 2026",
  },
  {
    id: "cust-48b32",
    name: "Vikram Malhotra",
    email: "vikram@malhotra.in",
    joined: "May 22, 2026",
  },
  {
    id: "cust-74c10",
    name: "Elena Rostova",
    email: "elena.r@rostov.co",
    joined: "May 24, 2026",
  },
];

export const useVisitorStore = create<VisitorState>()(
  persist(
    (set) => ({
      registeredUsers: initialSampleUsers,
      totalVisits: 14, // Start with a realistic baseline

      registerUser: (name, email) => {
        set((state) => {
          // Check if already registered
          const exists = state.registeredUsers.some(
            (u) => u.email.toLowerCase() === email.toLowerCase()
          );
          if (exists) return state;

          const newUser: RegisteredUser = {
            id: `cust-${Math.random().toString(36).substr(2, 5)}`,
            name: name || email.split("@")[0],
            email,
            joined: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          };

          return {
            registeredUsers: [...state.registeredUsers, newUser],
            totalVisits: state.totalVisits + 1, // Registering increments visits
          };
        });
      },

      incrementVisits: () => {
        set((state) => ({
          totalVisits: state.totalVisits + 1,
        }));
      },
    }),
    {
      name: "oren-visitors",
    }
  )
);
