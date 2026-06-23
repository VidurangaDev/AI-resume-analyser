
interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  let badgeClass = "";
  let label = "";

  if (score > 70) {
    badgeClass = "bg-green-100 text-green-600 font-bold";
    label = "Strong";
  } else if (score > 49) {
    badgeClass = "bg-yellow-100 text-yellow-600";
    label = "Good start";
  } else {
    badgeClass = "bg-red-100 text-red-600";
    label = "Needs Work";
  }

  return (
    <div className={`px-2 py-1 rounded-full text-xs w-fit ${badgeClass}`}>
      <p>{label}</p>
    </div>
  );
};

export default ScoreBadge;
