"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface PatientUser {
  _id: string;
  phone: string;
  name: string;
  age: number;
  gender: string;
  village: string;
  conditions: string[];
  bloodGroup?: string;
  role: string;
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<PatientUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (authToken: string) => {
    try {
      const res = await fetch("/api/auth/user", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.patient);
      } else {
        localStorage.removeItem("authToken");
        setToken(null);
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (phone: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password, isRegister: false }),
    });
    const data = await res.json();
    if (res.ok) {
      const authToken = data.token;
      localStorage.setItem("authToken", authToken);
      setToken(authToken);
      setUser(data.patient);
      return { success: true, patient: data.patient };
    }
    return { success: false, error: data.error };
  };

  const register = async (
    phone: string,
    password: string,
    name: string,
    age: string,
    gender: string,
    village: string,
    conditions: string,
    bloodGroup?: string
  ) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        password,
        name,
        age,
        gender,
        village,
        conditions,
        bloodGroup,
        isRegister: true,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      const authToken = data.token;
      localStorage.setItem("authToken", authToken);
      setToken(authToken);
      setUser(data.patient);
      return { success: true, patient: data.patient };
    }
    return { success: false, error: data.error };
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token && !!user,
  };
}
