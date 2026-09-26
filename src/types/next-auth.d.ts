import NextAuth from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      user_id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      phone: string;
      whatsapp: string;
      profile_pic?: string;
      // "staff" = CRM users (users_kp_db), "customer" = storefront
      // shoppers (users_ecommerce). Used to tell the two account
      // systems apart wherever a session is read.
      accountType?: "staff" | "customer";
    };
    token?: string;
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: string;
    phone: string;
    whatsapp: string;
    profile_pic?: string;
    accountType?: "staff" | "customer";
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    phone: string;
    whatsapp: string;
    profile_pic?: string;
    accountType?: "staff" | "customer";
  }
}
