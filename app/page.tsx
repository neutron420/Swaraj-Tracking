"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { format } from "date-fns";

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // Point this to your existing backend URL
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      
      const res = await fetch(`${API_URL}/api/complaints/track/${trackingId}`);
      const data = await res.json();

      if (res.ok) {
        setResult(data.complaint);
      } else {
        setError(data.error || "Complaint not found. Please check your ID.");
      }
    } catch (err) {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Swaraj Track
          </h1>
          <p className="mt-2 text-slate-600">
            Check the status of your complaint instantly
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
          <form onSubmit={handleTrack} className="flex gap-2">
            <input
              type="text"
              placeholder="TRK-XXXXXX"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none uppercase font-mono tracking-wider"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-50"
            >
              {loading ? <Clock className="animate-spin w-5 h-5" /> : "Track"}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        {/* Result Card */}
        {result && (
          <div className="bg-white rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Status Header */}
            <div className={`p-4 ${getStatusColor(result.status)} text-white flex justify-between items-center`}>
              <span className="font-mono font-bold opacity-90">{result.trackingId}</span>
              <span className="font-bold text-sm tracking-wide px-3 py-1 bg-white/20 rounded-full">
                {result.status.replace(/_/g, " ")}
              </span>
            </div>

            <div className="p-6 space-y-6">
              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500 flex items-center gap-1 mb-1">
                    <CheckCircle className="w-3 h-3" /> Category
                  </p>
                  <p className="font-semibold text-slate-900">{result.category.name}</p>
                </div>
                <div>
                  <p className="text-slate-500 flex items-center gap-1 mb-1">
                    <Calendar className="w-3 h-3" /> Date
                  </p>
                  <p className="font-semibold text-slate-900">
                    {format(new Date(result.submissionDate), "dd MMM yyyy")}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Location
                </p>
                <p className="text-slate-800">
                  {result.location.locality}, {result.location.city}
                </p>
                <p className="text-slate-500 text-sm">{result.location.district}</p>
              </div>

              {/* Description */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">
                  Description
                </p>
                <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg">
                  {result.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "REGISTERED": return "bg-blue-600";
    case "UNDER_PROCESSING": return "bg-amber-500";
    case "COMPLETED": return "bg-emerald-600";
    case "REJECTED": return "bg-red-600";
    default: return "bg-slate-600";
  }
}