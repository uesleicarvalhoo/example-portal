interface BadgeProps {
  label: string;
  color: 'gray' | 'blue' | 'green' | 'red' | 'yellow';
}

const colorMap: Record<BadgeProps['color'], string> = {
  gray: 'bg-gray-200 text-gray-800',
  blue: 'bg-blue-200 text-blue-800',
  green: 'bg-green-200 text-green-800',
  red: 'bg-red-200 text-red-800',
  yellow: 'bg-yellow-200 text-yellow-800',
};

const Badge = ({ label, color }: BadgeProps) => {
  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full w-[120px] inline-block text-center ${colorMap[color]}`}
    >
      {label}
    </span>
  );
};

export default Badge;
