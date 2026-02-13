"use client";

import { useState } from "react";
import type { DonateImpact } from "@/lib/types";

interface DonateClientProps {
  headline: string;
  subtitle: string;
  amounts: number[];
  impacts: DonateImpact[];
  colorPrimary: string;
  colorSecondary: string;
  colorAccent: string;
}

export function DonateClient({
  headline,
  subtitle,
  amounts,
  impacts,
  colorPrimary,
  colorSecondary,
  colorAccent,
}: DonateClientProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const displayAmount = selectedAmount
    ? `$${selectedAmount.toLocaleString()}`
    : customAmount
    ? `$${customAmount}`
    : "";

  return (
    <div style={{ paddingBottom: "40px" }}>
      {/* ─── Header ─── */}
      <div
        style={{
          background: `linear-gradient(145deg, ${colorSecondary} 0%, #2C3E6D 100%)`,
          padding: "30px 24px 36px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute", top: "-30px", right: "-30px",
            width: "140px", height: "140px", borderRadius: "50%",
            background: `${colorAccent}18`,
          }}
        />
        <h1
          style={{
            fontSize: "26px", fontWeight: 800, color: "#fff",
            marginBottom: "8px", fontFamily: "var(--font-display)",
            position: "relative",
          }}
        >
          {headline}
        </h1>
        <p
          style={{
            fontSize: "15px", color: "rgba(255,255,255,0.7)",
            lineHeight: 1.5, position: "relative",
          }}
        >
          {subtitle}
        </p>
      </div>

      <div className="section-padding" style={{ paddingTop: "24px" }}>
        {/* ─── Amount Selector ─── */}
        <h2
          style={{
            fontSize: "16px", fontWeight: 700,
            color: "var(--fc-secondary)", marginBottom: "12px",
            fontFamily: "var(--font-display)",
          }}
        >
          Choose an Amount
        </h2>
        <div
          style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            gap: "10px", marginBottom: "20px",
          }}
        >
          {amounts.map((amt) => (
            <button
              key={amt}
              onClick={() => {
                setSelectedAmount(amt);
                setCustomAmount("");
              }}
              style={{
                background: selectedAmount === amt ? colorPrimary : "#fff",
                color: selectedAmount === amt ? "#fff" : "var(--fc-secondary)",
                border: `2px solid ${selectedAmount === amt ? colorPrimary : "var(--fc-border)"}`,
                padding: "14px 8px",
                borderRadius: "16px",
                fontSize: "18px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              ${amt.toLocaleString()}
            </button>
          ))}
        </div>

        {/* ─── Custom Amount ─── */}
        <div
          style={{
            background: "#fff",
            border: "2px solid var(--fc-border)",
            borderRadius: "16px",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              fontSize: "20px", fontWeight: 700,
              color: "var(--fc-text-muted)",
            }}
          >
            $
          </span>
          <input
            type="number"
            placeholder="Other amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
            }}
            style={{
              border: "none", outline: "none",
              fontSize: "18px", fontWeight: 600,
              color: "var(--fc-secondary)",
              width: "100%", background: "transparent",
              fontFamily: "var(--font-body)",
            }}
          />
        </div>

        {/* ─── Impact (from Airtable) ─── */}
        {impacts.length > 0 && (
          <div
            style={{
              background: "var(--fc-primary-light)",
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "24px",
            }}
          >
            <h3
              style={{
                fontSize: "15px", fontWeight: 700,
                color: "var(--fc-secondary)", marginBottom: "12px",
                fontFamily: "var(--font-display)",
              }}
            >
              Your Impact
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {impacts.map((item) => (
                <div
                  key={item.id}
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <span
                    style={{
                      fontWeight: 800, color: colorPrimary,
                      fontSize: "14px", minWidth: "50px",
                    }}
                  >
                    {item.amount}
                  </span>
                  <span style={{ fontSize: "13px", color: "var(--fc-text-muted)" }}>
                    {item.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Donate Button ─── */}
        <button
          style={{
            width: "100%",
            background: `linear-gradient(135deg, ${colorPrimary}, #D4533A)`,
            color: "#fff",
            border: "none",
            padding: "16px",
            borderRadius: "18px",
            fontSize: "17px",
            fontWeight: 800,
            fontFamily: "var(--font-display)",
            cursor: "pointer",
            boxShadow: `0 4px 20px ${colorPrimary}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          Donate{displayAmount ? ` ${displayAmount}` : ""} Now
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

        <p
          style={{
            fontSize: "12px", color: "var(--fc-text-muted)",
            textAlign: "center", marginTop: "12px",
          }}
        >
          Tax-deductible · Secure payment · Receipt emailed instantly
        </p>
      </div>
    </div>
  );
}
