"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const AlertWrapper: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [alerts, setAlerts] = useState<
    { id: number; type: string; message: string; name: string }[]
  >([]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const newAlerts: {
      id: number;
      type: string;
      message: string;
      name: string;
    }[] = [];
    let alertId = 0;

    params.forEach((value, key) => {
      if (key.includes("_alert")) {
        let alertType = "info"; // Default type
        if (key.includes("error")) alertType = "error";
        else if (key.includes("warning")) alertType = "warning";
        else if (key.includes("success")) alertType = "success";

        newAlerts.push({
          id: alertId++,
          type: alertType,
          message: value,
          name: key,
        });
        setAlerts(newAlerts);
      }
    });

    const timers = alerts.map((alert) =>
      setTimeout(() => {
        removeAlert(alert.id, alert.name);
      }, 5000)
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const removeAlert = (id: number, name: string) => {
    setAlerts((currentAlerts) =>
      currentAlerts.filter((alert) => alert.id !== id)
    );

    const params = new URLSearchParams(searchParams.toString());
    params.delete(name);

    router.push(`${pathname}?${params.toString()}`);
  };

  if (alerts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`relative p-4 border-l-4 shadow-lg text-white min-w-[200px] animate-fade-slide ${
            alert.type === "error"
              ? "bg-red-500"
              : alert.type === "warning"
              ? "bg-yellow-500"
              : alert.type === "success"
              ? "bg-green-500"
              : "bg-blue-500"
          }`}
        >
          <button
            onClick={() => removeAlert(alert.id, alert.name)}
            className="absolute top-0 right-2 text-white text-3xl font-extralight cursor-pointer hover:text-black"
          >
            &times;
          </button>
          {alert.message}
        </div>
      ))}
    </div>
  );
};

export default AlertWrapper;
