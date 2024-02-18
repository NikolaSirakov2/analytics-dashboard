import { analytics } from "@/utils/analytics";

const Page = async () => {

    const pageview = await analytics.retriveDays("pageview", 2);

    return (
        <pre className="text-white">{JSON.stringify(pageview)}</pre>
    );
};

export default Page;
