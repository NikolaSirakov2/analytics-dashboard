"use client";

import { analytics } from "@/utils/analytics";
import { BarChart, Card } from "@tremor/react";

interface AnalyticsDashboardProps {
    avgPageViews: string;
    amtVisitorsToday: number;
    timeseriesPageViews: Awaited<ReturnType<typeof analytics.retriveDays>>;
}

const AnalyticsDashboard = ( { avgPageViews, amtVisitorsToday, timeseriesPageViews } : AnalyticsDashboardProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid w-full mx-auto grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-3xl text-dark-tremor-content font-semibold">
            {avgPageViews} 
             </p>
             <p className="text-tremor-default text-dark-tremor-content">
            Pageviews/day
          </p>
        </Card>
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-3xl text-dark-tremor-content font-semibold">
            {amtVisitorsToday}
          </p>
          <p className="text-tremor-default text-dark-tremor-content">
            Visitors today
          </p>
        </Card>
      </div>

      <Card>
        {timeseriesPageViews ? (
            <BarChart
                allowDecimals={false}
                showAnimation
                data={timeseriesPageViews.map((day) => ({
                    name: day.date,
                    Visitors: day.events.reduce((acc, cur) => {
                        return acc + Object.values(cur)[0]!;
                    }, 0),
                }))}
                categories={['Visitors']}
                index='name'
            />
            ) : null}
        </Card>
    </div>
  );
};

export default AnalyticsDashboard;
