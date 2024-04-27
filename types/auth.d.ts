// auth.d.ts
declare module "#auth-utils" {
  interface User {
    id: number;
  }

  interface UserSession {
    user: User;
  }
}

export {};
