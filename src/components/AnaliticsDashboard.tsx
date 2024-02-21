"use client";

import { Card } from "@tremor/react";

interface AnalyticsDashboardProps {
    avgPageViews: string;
}

const AnalyticsDashboard = ( { avgPageViews } : AnalyticsDashboardProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid w-full mx-auto grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-tremor-default text-dark-tremor-content">
            Pageviews/day
          </p>
          <p className="text-3xl text-dark-tremor-content font-semibold">
            {avgPageViews}
             </p>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
