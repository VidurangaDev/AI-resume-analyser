
interface Suggestion {
    type: "good" | "improve";
    tip: string;
}

interface AtsProps {
    score: number;
    suggestion: Suggestion[];
}

const Ats = ({ score, suggestion }: AtsProps) => {
    let bgColor = "from-red-100";
    let mainIcon = "/icons/ats-bad.svg";
    let subtitle = "Needs significant improvement";
    let explanation = "Your resume is struggling to pass through ATS filters. Focus on standardizing your format and including relevant keywords.";

    if (score > 69) {
        bgColor = "from-green-100";
        mainIcon = "/icons/ats-good.svg";
        subtitle = "Excellent ATS Optimization";
        explanation = "Your resume is well-optimized for Applicant Tracking Systems. It has a clear structure and relevant keywords that machines can easily parse.";
    } else if (score > 49) {
        bgColor = "from-yellow-100";
        mainIcon = "/icons/ats-warning.svg";
        subtitle = "Good Start, but could be better";
        explanation = "Your resume is partially optimized. Some sections might be difficult for an ATS to read, or you might be missing some key industry terms.";
    }

    return (
        <div className={`p-6 rounded-2xl bg-gradient-to-br ${bgColor} to-white shadow-sm border border-gray-100`}>
            {/* Top Section */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm">
                    <img src={mainIcon} alt="ATS Icon" className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">ATS Score - {score}/100</h2>
            </div>

            {/* Description Section */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{subtitle}</h3>
                    <p className="text-gray-500 text-sm mt-1">{explanation}</p>
                </div>

                {/* Suggestions List */}
                <div className="space-y-3">
                    {suggestion.map((item, index) => (
                        <div key={index} className="flex gap-3 items-start">
                            <img 
                                src={item.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"} 
                                alt={item.type} 
                                className="w-5 h-5 mt-0.5"
                            />
                            <p className="text-sm text-gray-700">{item.tip}</p>
                        </div>
                    ))}
                </div>

                {/* Closing Line */}
                <p className="text-sm font-medium text-gray-600 pt-2">
                    Keep refining your resume to increase your chances of getting noticed!
                </p>
            </div>
        </div>
    );
};

export default Ats;