import AnalyticsDashboard from "@/components/AnaliticsDashboard";
import { analytics } from "@/utils/analytics";

const Page = async () => {
    const TRACKING_DAYS = 7;

    const pageview = await analytics.retriveDays("pageview", 7);

    const totalPageViews = pageview.reduce((acc, cur) => {
        return (
            acc + cur.events.reduce((acc, cur) => {
                return acc + Object.values(cur)[0]!;
            }, 0)
        );
    }, 0);

    const avg = (totalPageViews / TRACKING_DAYS).toFixed(1);

    const amtVisitorsToday = pageview[pageview.length - 1].events.reduce(
        (acc, cur) => {
            return acc + Object.values(cur)[0]!;
        },
        0
    );

    return (
        <div className="min-h-screen w-full py-12 flex justify-center items-center">
            <div className="relative w-full max-w-6xl mx-auto text-white">
                <AnalyticsDashboard 
                avgPageViews={avg} 
                amtVisitorsToday={amtVisitorsToday}
                />
            </div>
        </div>
    );
};

export default Page;
